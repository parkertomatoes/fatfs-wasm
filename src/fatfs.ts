import fatfsWasm from './ff.wasm';

/* CONSTANTS */

/** Disk I/O control commands (for disk_ioctl) */
export enum FatFsIoctl {
    CTRL_SYNC = 0,
    GET_SECTOR_COUNT = 1,
    GET_SECTOR_SIZE = 2,
    GET_BLOCK_SIZE = 3,
    CTRL_TRIM = 4
}

/** Format options (2nd argument of f_mkfs) */
export enum FatFsFormat {
    FAT = 1,
    FAT32 = 2,
    EXFAT = 4,
    ANY = 7,
    SFD = 8
}

/* File function return code (FRESULT) */
export enum FatFsResult {
    OK = 0,                    /** (0) Succeeded */
    DISK_ERR = 1,              /** (1) A hard error occurred in the low level disk I/O layer */
    INT_ERR = 2,               /** (2) Assertion failed */
    NOT_READY = 3,             /** (3) The physical drive cannot work */
    NO_FILE = 4,               /** (4) Could not find the file */
    NO_PATH = 5,               /** (5) Could not find the path */
    INVALID_NAME = 6,          /** (6) The path name format is invalid */
    DENIED = 7,                /** (7) Access denied due to prohibited access or directory full */
    EXIST = 8,                 /** (8) Access denied due to prohibited access */
    INVALID_OBJECT = 9,        /** (9) The file/directory object is invalid */
    WRITE_PROTECTED = 10,      /** (10) The physical drive is write protected */
    INVALID_DRIVE = 11,        /** (11) The logical drive number is invalid */
    NOT_ENABLED = 12,          /** (12) The volumeF has no work area */
    NO_FILESYSTEM = 13,        /** (13) There is no valid FAT volume */
    MKFS_ABORTED = 14,         /** (14) The f_mkfs() aborted due to any problem */
    TIMEOUT = 15,              /** (15) Could not get a grant to access the volume within defined period */
    LOCKED = 16,               /** (16) The operation is rejected according to the file sharing policy */
    NOT_ENOUGH_CORE = 17,      /** (17) LFN working buffer could not be allocated */
    TOO_MANY_OPEN_FILES = 18,  /** (18) Number of open files > FF_FS_LOCK */
    INVALID_PARAMETER = 19     /** (19) Given parameter is invalid */
}

/** File attribute bits for directory entry (FILINFO.fattrib) */
export enum FatFsAttrib {
    RDO = 0x01,
    HID = 0x02,
    SYS = 0x04,
    DIR = 0x10,
    ARC = 0x20
}

/** File modes */
export enum FatFsMode {
    /** 
     * Specifies read access to the file. Data can be read from the file. 
     */
    READ = 0x1,
    /**
     * Specifies write access to the file. Data can be written to the file. 
     * Combine with FA_READ for read-write access.
     */
    WRITE = 0x2,
    /**
     * Opens a file. The function fails if the file is not existing. (Default)
     */
    OPEN_EXISTING = 0x0,
    /**
     * Creates a new file. The function fails with FR_EXIST if the file is 
     * existing.
     */
    CREATE_NEW = 0x4,
    /**
     * Creates a new file. If the file is existing, it will be truncated and 
     * overwritten.
     */
    CREATE_ALWAYS = 0x8,
    /**
     * Opens the file if it is existing. If not, a new file will be created.
     */
    OPEN_ALWAYS = 0x10,
    /**
     * Same as FA_OPEN_ALWAYS except the read/write pointer is set end of the 
     * file.
     */
    OPEN_APPEND = 0x30
}


const FF_MAX_SS = 512;           /** Max sector size (must match ffconf.h) */
const DEFAULT_SECTOR_SIZE = 512; /** Default sector size */
const SIZE_FILINFO = 24;
const SIZE_FATFS_OBJ = 560;
const SIZE_FIL = 576;
const SIZE_DIR = 64
const OFFSET_FATFS_CSIZE = 10;

/* HELPER FUNCTIONS */


function throwIfError(actionName: string, action: () => FatFsResult, onError?: () => void) {
    const result = action();
    if (result !== FatFsResult.OK) {
        onError?.();
        throw new FatFsError(actionName, result);
    }
}

function createImportObject(
    memory: WebAssembly.Memory,
    heap: Uint8Array,
    view: DataView,
    disk: Uint8Array,
    sectorSize?: number
): WebAssembly.Imports {
    const ss = (sectorSize ?? DEFAULT_SECTOR_SIZE) | 0;
    const sectorCount = (heap.byteLength / ss) | 0;

    return {
        env: {
            memory: memory,
            disk_initialize: (pdrv: number) => {
                return FatFsResult.OK;
            },
            disk_status: (pdrv: number) => {
                return FatFsResult.OK;
            },
            disk_read: (pdrv: number, buff: number, sector: number, count: number) => {
                const src = disk.subarray(sector * ss, (sector + count) * ss);
                heap.set(src, buff);
                return FatFsResult.OK;
            },
            disk_write: (pdrv: number, buff: number, sector: number, count: number) => {
                const src = heap.subarray(buff, buff + (count * ss));
                disk.set(src, sector * ss);
                return FatFsResult.OK;
            },
            disk_ioctl: (pdrv: number, cmd: number, buff: number) => {
                switch (cmd) {
                    case FatFsIoctl.CTRL_SYNC:
                        // Nothing to do for this command if each write operation 
                        // to the medium is completed in the disk_write function
                        break; 
                    case FatFsIoctl.GET_SECTOR_SIZE:
                        view.setUint16(buff, ss, true);
                        break;
                    case FatFsIoctl.GET_SECTOR_COUNT:
                        view.setUint32(buff, sectorCount, true); 
                        break; 
                    case FatFsIoctl.GET_BLOCK_SIZE:
                        return 1; // unknown/non-flash media
                    case FatFsIoctl.CTRL_TRIM:
                        // Nothing to do for this command if this funcion is not 
                        // supported or not a flash memory device
                        break;
                    default:
                        break;
                }
                return FatFsResult.OK;
            },
            get_fattime: () => {
                const date = new Date();
                const year = (date.getFullYear() - 1980) % 128;
                const month = date.getMonth() + 1;
                const day = date.getDay();
                const hour = date.getHours();
                const minute = date.getMinutes();
                const second = date.getSeconds() >> 1;
                return (
                    (year << 25) | 
                    (month << 21) |
                    (day << 16) |
                    (hour << 11) |
                    (minute << 5) |
                    second);
            }
        }
    }
}


/* STRUCTURES */


type FatFsExports = {
    malloc: (size: number) => number;
    free: (ptr: number) => void;
    f_fdisk: (pdrv: number, ptbl: number, work: number) => number;
    f_mkfs: (path: number, opt: number, work: number, len: number) => number;
    f_mount: (fs: number, path: number, opt: number) => number;
    f_open: (fp: number, path: number, mode: number) => number;
    f_read: (fp: number, buff: number, btr: number, br: number) => number;
    f_write: (fp: number, buff: number, btw: number, bw: number) => number;
    f_close: (fp: number) => number;
    f_sync: (fp: number) => number;
    f_lseek: (fp: number, ofs: number) => number;
    f_truncate: (fp: number) => number;
    f_expand: (fp: number, fsz: number, opt: number) => number;
    f_gets: (buff: number, len: number, fp: number) => number;
    f_putc: (chr: number, fp: number) => number;
    f_puts: (str: number, fp: number) => number;
    f_tell: (fp: number) => number;
    f_eof: (fp: number) => number;
    f_size: (fp: number) => number;
    f_error: (fp: number) => number;
    f_opendir: (dp: number, path: number) => number;
    f_closedir: (dp: number) => number;
    f_readdir: (dp: number, fno: number) => number;
    f_findfirst: (dp: number, fno: number, path: number, pattern: number) => number;
    f_findnext: (dp: number, fno: number) => number;
    f_stat: (path: number, fno: number) => number;
    f_unlink: (path: number) => number;
    f_rename: (oldName: number, newName: number) => number;
    f_chmod: (path: number, attr: number, mask: number) => number;
    f_utime: (path: number, fno: number) => number;
    f_mkdir: (path: number) => number;
    f_chdir: (path: number) => number;
    f_chdrive: (path: number) => number;
    f_getcwd: (buff: number, len: number) => number;
    f_getfree: (path: number, nclst: number, fatfs: number) => number;
    f_getlabel: (path: number, label: number, vsn: number) => number;
    f_setlabel: (label: number) => number;
    f_setcp: (cp: number) => number;
}

type HeapScope = {
    alloc: (size: number) => number;
    allocString: (text: string | null) => number;
};

type FatFsMkfsOptions = {
	fmt: FatFsFormat;	/* Format option (FM_FAT, FM_FAT32, FM_EXFAT and FM_SFD) */
	nFat: number;		/* Number of FATs */
	align: number;		/* Data area alignment (sector) */
	nRoot: number;		/* Number of root directory entries */
	auSize: number;	       /* Cluster size (byte) */
}

class FatFsObject {
    #fatFsPtr: number;
    #context: FatFsMemoryContext;
    constructor(fatFsPtr: number, context: FatFsMemoryContext) {
        this.#fatFsPtr = fatFsPtr;
        this.#context = context;
    }

    get ptr(): number {
        return this.#fatFsPtr;
    }

    /**
     * Sectors per cluster
     */
    get cSize(): number {
        return this.#context.view.getUint16(this.#fatFsPtr + OFFSET_FATFS_CSIZE, true);
    }
}

class FatFsMemoryContext {
    readonly heap: Uint8Array;
    readonly view: DataView;
    #exports: FatFsExports;

    constructor(memory: WebAssembly.Memory, exports: FatFsExports) {
        this.heap = new Uint8Array(memory.buffer);
        this.view = new DataView(memory.buffer);
        this.#exports = exports;
    }

    allocString(text: string | null): number {
        if (typeof text === 'undefined' || text === null)
            return 0;
        const textBytes = new TextEncoder().encode(text);
        const textPtr = this.alloc(textBytes.length + 1);
        const textArray = this.heap.subarray(textPtr, textPtr + textBytes.length + 1);
        textArray.set(textBytes);
        textArray[textArray.length - 1] = 0;
        return textPtr;
    }

    alloc(size: number): number {
        return this.#exports.malloc(size);
    }

    free(ptr: number): void {
        this.#exports.free(ptr);
    }

    decodeString(buffer: number, size: number): string {
        const ptrArray = this.heap.subarray(buffer, buffer + size);
        const zeroIndex = ptrArray.indexOf(0);
        const ptrTrimmed = zeroIndex >= 0
            ? ptrArray.subarray(0, zeroIndex)
            : ptrArray;
        return new TextDecoder().decode(ptrTrimmed);
    }

    enterScope<T>(callback: (scope: HeapScope) => T) {
        const resources: number[] = [];
        const scope = {
            alloc: (size: number) => {
                const ptr = this.alloc(size);
                resources.unshift(ptr);
                return ptr;
            },
            allocString: (text: string | null) => {
                const ptr = this.allocString(text);
                resources.unshift(ptr);
                return ptr;
            }
        };
        try {
            return callback(scope);
        } finally {
            for (const ptr of resources) {
                this.free(ptr);
            }
        }
    }
}

export class FatFsFileInfo {
    readonly size: number;
    readonly date: Date;
    readonly attrib: number;
    readonly name: string;

    constructor(size: number, date: Date, attrib: number, name: string) {
        this.size = size;
        this.date = date;
        this.attrib = attrib;
        this.name = name;
    }

    static fromFilInfo(data: Uint8Array) {
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        const size = view.getUint32(0, true);

        const encodedDate = view.getUint16(4, true);
        const year = 1980 + ((encodedDate & 0xFE00) >> 9);
        const month = ((encodedDate & 0x01E0) >> 5) - 1;
        const day = encodedDate & 0x001F;
        const encodedTime = view.getUint16(6, true);
        const hour = (encodedTime & 0xF800) >> 11;
        const minute = (encodedTime & 0x07E0) >> 5;
        const second = (encodedTime & 0x001F) * 2;
        const date = new Date(year, month, day, hour, minute, second);
        
        const attrib = data[8];

        const nameArray = data.subarray(9, 22);
        const zeroIndex = nameArray.indexOf(0);
        const nameTrimmed = zeroIndex >= 0
            ? nameArray.subarray(0, zeroIndex)
            : nameArray;
        const name = new TextDecoder().decode(nameTrimmed);

        return new FatFsFileInfo(size, date, attrib, name);
    }

    get isReadOnly(): boolean { return !!(this.attrib & FatFsAttrib.RDO); }
    get isDirectory(): boolean { return !!(this.attrib & FatFsAttrib.DIR); }
    get isHidden(): boolean { return !!(this.attrib & FatFsAttrib.HID); }
    get isArchive(): boolean { return !!(this.attrib & FatFsAttrib.ARC); }
    get isSystem(): boolean { return !!(this.attrib & FatFsAttrib.SYS); }
}

/** Exception thrown when a FatFs export returns a non-OK result */
export class FatFsError extends Error {
    result: FatFsResult;
    constructor(action: string, errorCode: FatFsResult) {
        const message = `Error ${action}: ${FatFsResult[errorCode]} (${errorCode})`;
        super(message);
        Object.setPrototypeOf(this, FatFsError.prototype);
        this.result = errorCode;
    }
}

/**
 * FatFs file object
 */
export class FatFsFile {
    #filePtr: number;
    #exports: FatFsExports;
    #context: FatFsMemoryContext;

    constructor(
        filePtr: number,
        exports: FatFsExports,
        context: FatFsMemoryContext
    ) {
        this.#filePtr = filePtr;
        this.#exports = exports;
        this.#context = context;
    }

    get fp() {
        return this.#filePtr;
    }

    /**
     * The f_read function reads data from a file.
     * @param buff Pointer to the buffer to store the read data.
     * @param btr Number of bytes to read in range of UINT type. If the file needs to be read fast, it should be read in large chunk as possible.
     * @returns number of bytes read
     */
    read(buff: Uint8Array, btr?: number): number {
        const f_read = this.#exports.f_read;
        const filePtr = this.#filePtr;
        const bytesToRead = btr ?? buff.length;
        return this.#context.enterScope((scope) => {
            const buffPtr = scope.alloc(bytesToRead);
            const brPtr = scope.alloc(4);
            throwIfError(
                "reading file",
                () => f_read(filePtr, buffPtr, bytesToRead, brPtr)
            );
            const bytesRead = this.#context.view.getUint32(brPtr, true);
            buff.set(this.#context.heap.subarray(buffPtr, buffPtr + bytesRead));
            return bytesRead;
        });
    }

    /**
     * The f_write writes data to a file.
     * @param buff Pointer to the data to be written.
     * @param btw Specifies number of bytes to write in range of UINT type. If 
     *     the data needs to be written fast, it should be written in large 
     *     chunk as possible.
     * @returns number of bytes written
     */
    write(buff: Uint8Array, btw?: number): number {
        return this.#context.enterScope(scope => {
            const bytesToWrite = btw ?? buff.length;
            const buffPtr = scope.alloc(bytesToWrite);
            const bwPtr = scope.alloc(4);
            throwIfError(
                "writing file",
                () => this.#exports.f_write(this.#filePtr, buffPtr, bytesToWrite, bwPtr)
            );
            const bytesWritten = this.#context.view.getUint32(bwPtr, true);
            buff.set(this.#context.heap.subarray(buffPtr, buffPtr + bytesWritten));
            return bytesWritten;
        });
    }

    /**
     * The f_close function closes an open file and destroys the file object.
     */
    close(): void {
        try {
            throwIfError(
                "closing file",
                () => this.#exports.f_close(this.#filePtr)
            );
        } finally {
            this.#exports.free(this.#filePtr);
        }
    }
    
    /**
     * The f_sync function flushes the cached information of a writing file.
     */
    sync(): void {
        throwIfError(
            "syncing disk",
            () => this.#exports.f_sync(this.#filePtr)
        );
    } 
    
    /**
     * The f_lseek function moves the file read/write pointer of an open file 
     * object. It can also be used to expand the file size 
     * (cluster pre-allocation).
     * @param ofs Byte offset from top of the file to set read/write pointer. 
     *     The data type FSIZE_t is an alias of either DWORD(32-bit) or 
     *     QWORD(64-bit) depends on the configuration option FF_FS_EXFAT.
     */
    lseek(ofs: number): void {
        throwIfError(
            "seeking",
            () => this.#exports.f_lseek(this.#filePtr, ofs)
        );
    }

    rewind(): void {
        this.lseek(0);
    }

    /**
     * The f_truncate function truncates the file size to the current file 
     * read/write pointer.
     */
    truncate(): void {
        throwIfError(
            "truncating file",
            () => this.#exports.f_truncate(this.#filePtr)
        );
    }

    /**
     * The f_expand function prepares or allocates a contiguous data area to 
     * the file.
     * @param fsz Number of bytes in size to prepare or allocate for the file. 
     *     The data type FSIZE_t is an alias of either DWORD(32-bit) or 
     *     QWORD(64-bit) depends on the configuration option FF_FS_EXFAT.
     * @param opt Allocation mode. Prepare to allocate (0) or Allocate now (1).
     */
    expand(fsz: number, opt: number): void {
        throwIfError(
            "expanding file",
            () => this.#exports.f_expand(this.#filePtr, fsz, opt)
        );
    }

    /**
     * The f_gets reads a string from the file.
     * @returns the string
     */
    gets(maxSize: number): string {
        return this.#context.enterScope(scope => {
            const buffPtr = scope.alloc(maxSize + 1);
            throwIfError(
                "reading string from file",
                () => this.#exports.f_gets(buffPtr, maxSize, this.#filePtr)
            );
            return this.#context.decodeString(buffPtr, maxSize + 1);
        });
    }

    /**
     * The f_putc function puts a character to the file.
     * @param chr A code unit to write.
     * @returns When the character was written successfuly, it returns number 
     *     of character encoding units written to the file. When the function 
     *     failed due to disk full or any error, a negative value will be returned.
     */
    putc(chr: number): number {
        const chrCode = chr % 256;
        return this.#exports.f_putc(chrCode, this.#filePtr);
    }

    /**
     * The f_puts function writes a string to the file.
     * @param str Pointer to the null terminated string to be written. The 
     *     terminator character will not be written.
     * @returns When the string was written successfuly, it returns number 
     *     of character encoding units written to the file. When the function 
     *     failed due to disk full or any error, a negative value will be 
     *     returned.
     */
    puts(str: string): number {
        const f_puts = this.#exports.f_puts as (str: number, fp: number) => number;
        return this.#context.enterScope(scope => {
            const strPtr = scope.allocString(str);
            return f_puts(strPtr, this.#filePtr);
        });
    }

    /**
     * The f_tell function gets the current read/write pointer of a file.
     * @returns Returns current read/write pointer of the file.
     */
    tell(): number {
        return this.#exports.f_tell(this.#filePtr);
    }

    /**
     * The f_eof function tests for end-of-file on a file.
     * @returns The f_eof function returns a non-zero value 
     *     if the read/write pointer has reached end of the file; otherwise it
     *     returns a zero.
     */
    eof(fp: FatFsFile): number {
        return this.#exports.f_eof(this.#filePtr);
    }

    /**
     * The f_size function gets the size of a file.
     * @returns Returns the size of the file in unit of byte.
     */
    size(): number {
        return this.#exports.f_size(this.#filePtr);
    }

    /**
     * The f_error tests for an error on a file.
     * @returns Returns a non-zero value if a hard error has occured; 
     *     otherwise it returns a zero.
     */
    error(fp: FatFsFile): number {
        return this.#exports.f_error(this.#filePtr);
    }

}

/**
 * FatFs Directory Reference
 */
export class FatFsDir {
    #dirPtr: number;
    #exports: FatFsExports;
    #context: FatFsMemoryContext;

    constructor(dirPtr: number, exports: FatFsExports, context: FatFsMemoryContext) {
        this.#dirPtr = dirPtr;
        this.#exports = exports;
        this.#context = context;
    }

    get dp() {
        return this.#dirPtr;
    }

    /**
     * Closes the open directory.
     */
    close(): void {
        throwIfError(
            "closing directory",
            () => this.#exports.f_closedir(this.#dirPtr)
        );
        this.#context.free(this.#dirPtr);
    }

    /**
     * Reads an item of the directory.
     * @returns Information about the next directory entry
     */
    read(): FatFsFileInfo {
        return this.#context.enterScope(scope => {
            const fno = scope.alloc(SIZE_FILINFO);
            throwIfError(
                "reading directory",
                () => this.#exports.f_readdir(this.#dirPtr, fno)
            );
            const fnoData = this.#context.heap.subarray(fno, fno + SIZE_FILINFO);
            return FatFsFileInfo.fromFilInfo(fnoData);
        });
    }

    /**
     * Rewinds the directory
     */
    rewind(): void {
        throwIfError(
            "rewinding directory",
            () => this.#exports.f_readdir(this.#dirPtr, 0)
        );
    }

    /**
     * The f_findnext function searches for a next matched object
     */
    findNext(): FatFsFileInfo {
        return this.#context.enterScope(scope => {
            const fno = scope.alloc(SIZE_FILINFO);
            throwIfError(
                "searching directory for next match",
                () => this.#exports.f_findnext(this.#dirPtr, fno)
            );
            const fnoData = this.#context.heap.subarray(fno, fno + SIZE_FILINFO);
            return FatFsFileInfo.fromFilInfo(fnoData);
        });
    }

    *[Symbol.iterator](): Iterator<FatFsFileInfo> {
        let fileInfo: FatFsFileInfo;
        this.rewind();
        while ((fileInfo = this.read()).name !== '')
            yield fileInfo;
    }
}

export class FatFsDisk {
    #context: FatFsMemoryContext
    #exports: FatFsExports;

    static async create(disk: Uint8Array, sectorSize?: number): Promise<FatFsDisk> {
        const memory = new WebAssembly.Memory({ initial: 8 });
        const heap = new Uint8Array(memory.buffer);
        const view = new DataView(memory.buffer);
        const importObject = createImportObject(memory, heap, view, disk, sectorSize);
        const source = (typeof window !== 'undefined')
            ? await WebAssembly.instantiateStreaming(fetch(fatfsWasm), importObject)
            : await WebAssembly.instantiate(
                await require('fs/promises').readFile(
                    require('path').join(__dirname, fatfsWasm)), 
                importObject);
        const exports = source.instance.exports as FatFsExports;
        const context = new FatFsMemoryContext(memory, exports);
        return new FatFsDisk(context, exports);
    }

    constructor(
        context: FatFsMemoryContext,
        exports: FatFsExports,
    ) {
        this.#context = context;
        this.#exports = exports;
    }

    /**
     * The f_fdisk function divides a physical drive.
     * @param pdrv Specifies the physical drive to be divided. This is not the 
     *     logical drive number but the drive identifier passed to the low 
     *     level disk functions.
     * @param ptbl List of partition size to create on the drive.
     */
    fdisk(pdrv: number, ptbl: number[]): void {
        this.#context.enterScope(scope => {
            const workAreaPtr = scope.alloc(FF_MAX_SS);
            const ptblPtr = scope.alloc(ptbl.length * 4);
            for (let i = 0; i < ptbl.length; i++)
                this.#context.view.setUint32(ptblPtr + (i * 4), ptbl[i]);
            throwIfError(
                "partitioning disk",
                () => this.#exports.f_fdisk(pdrv, ptblPtr, workAreaPtr)
            );
        });
    }

    /**
     * The f_mkfs function creates an FAT/exFAT volume on the logical drive.
     * @param path Logical drive number
     * @param opt Format options
     * @returns OK or error code
     */
    mkfs(path: string, opt?: FatFsMkfsOptions | null): void {
        this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            let optPtr = 0;
            if (typeof opt !== 'undefined' && opt !== null) {
                optPtr = scope.alloc(16);
                const view = this.#context.view;
                view.setUint8(optPtr + 1, opt.nFat);
                view.setUint32(optPtr + 4, opt.align, true);
                view.setUint32(optPtr + 8, opt.nRoot, true);
                view.setUint32(optPtr + 12, opt.auSize, true);
            }
            const workAreaPtr = scope.alloc(4096);
            throwIfError(
                "formatting disk",
                () => this.#exports.f_mkfs(pathPtr, optPtr, workAreaPtr, 4096)
            ) 
        });
    }

    /**
     * The f_mount function gives work area to the FatFs module.
     * @param path Pointer to the null-terminated string that specifies 
     *     the logical drive. The string without drive number means the 
     *     default drive.
     * @param opt Mounting option. 0: Do not mount now (to be mounted 
     *     on the first access to the volume), 1: Force mounted the 
     *     volume to check if it is ready to work.
     * @returns reference to the mounted work area
     */
    mount(path: string, opt: number): FatFsObject {
        const malloc = (size: number) => this.#context.alloc(size);
        return this.#context.enterScope(scope => {
            const fsPtr = malloc(SIZE_FATFS_OBJ);
            for (let i = 0; i < SIZE_FATFS_OBJ; i++)
                this.#context.heap[fsPtr + i] = 0;
            const pathPtr = scope.allocString(path);
            throwIfError(
                "mounting workspace",
                () => this.#exports.f_mount(fsPtr, pathPtr, opt),
                () => this.#context.free(fsPtr)
            );
            return new FatFsObject(fsPtr, this.#context);
        });
    }

    /**
     * Unregisters the filesystem object
     * @param path Pointer to the null-terminated string that specifies 
     *     the logical drive. The string without drive number means the 
     *     default drive.
     */
    unmount(path: string): void {
        return this.#context.enterScope(scope => {
            const [, fs] = this.getFree(path);
            try {
                const pathPtr = scope.allocString(path);
                throwIfError(
                    "unmounting workspace",
                    () => this.#exports.f_mount(0, pathPtr, 0)
                );
            } finally {
                this.#context.free(fs.ptr);
            }
        });
    }

    /**
     * The f_open function opens a file.
     * @param path Pointer to the null-terminated string that specifies the 
     *     file name to open or create.
     * @param mode Mode flags that specifies the type of access and open 
     *     method for the file. It is specified by a combination of following 
     *     flags.
     * @returns File object
     */
    open(path: string, mode: FatFsMode): FatFsFile {
        return this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            const fpPtr = this.#context.alloc(576);
            throwIfError(
                "opening file",
                () => this.#exports.f_open(fpPtr, pathPtr, mode),
                () => this.#context.free(fpPtr)
            );
            return new FatFsFile(fpPtr, this.#exports, this.#context);
        });
    }

    /**
     * The f_opendir function opens a directory.
     * @param path Pointer to the null-terminated string that specifies the 
     *     directory name to be opened.
     * @returns Directory object
     */
    openDir(path: string): FatFsDir {
        return this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            const dpPtr = this.#context.alloc(SIZE_DIR);
            throwIfError(
                "opening directory",
                () => this.#exports.f_opendir(dpPtr, pathPtr),
                () => this.#context.free(dpPtr)
            );
            return new FatFsDir(dpPtr, this.#exports, this.#context);
        });
    }
    
    /**
     * Searches a directory for an item.
     * @param path The directory name to be opened.
     * @param pattern The pattern to search for 
     * @returns The directory, and the first matching entry
     */
    findFirst(path: string, pattern: string): [FatFsDir, FatFsFileInfo] {
        return this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            const patternPtr = scope.allocString(pattern);
            const fno = scope.alloc(SIZE_FILINFO);
            const dpPtr = this.#context.alloc(SIZE_DIR);
            throwIfError(
                "searching directory",
                () => this.#exports.f_findfirst(dpPtr, fno, pathPtr, patternPtr),
            );
            const fnoData = this.#context.heap.subarray(fno, fno + SIZE_FILINFO);
            return [
                new FatFsDir(dpPtr, this.#exports, this.#context),
                FatFsFileInfo.fromFilInfo(fnoData)
            ];
        });
    }

    /**
     * Searches a directory
     * 
     * @param path The directory name to be opened.
     * @param pattern The pattern to search for 
     * @returns An iterator to the search results
     */
    *find(path: string, pattern: string): IterableIterator<FatFsFileInfo> {
        let dir: FatFsDir;
        let fileInfo: FatFsFileInfo;
        [dir, fileInfo] = this.findFirst(path, pattern);
        while (fileInfo.name !== '') {
            yield fileInfo;
            fileInfo = dir.findNext();
        }
    }

    /**
     * The f_stat function checks the existence of a file or sub-directory.
     * @param path Pointer to the null-terminated string that specifies the 
     *     object to get its information. The object must not be the root 
     *     direcotry.
     * @returns OK or error code
     */
    stat(path: string): FatFsFileInfo {
        return this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            const fno = scope.alloc(SIZE_FILINFO);
            throwIfError(
                "getting file information",
                () => this.#exports.f_stat(pathPtr, fno)
            );
            const fnoData = this.#context.heap.subarray(fno, fno + SIZE_FILINFO);
            return FatFsFileInfo.fromFilInfo(fnoData);
        });
    }

    /**
     * The f_unlink function removes a file or sub-directory from the volume.
     * @param path Pointer to a null-terminated string that specifies the file 
     *     or sub-directory to be removed.
     */
    unlink(path: string): void {
        this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            throwIfError(
                "deleting file or directory",
                () => this.#exports.f_unlink(pathPtr)
            );
        });
    }

    /**
     * The f_rename function renames and/or moves a file or sub-directory.
     * @param oldName Pointer to a null-terminated string that specifies the 
     *     existing file or sub-directory to be renamed.
     * @param newName Pointer to a null-terminated string that specifies the 
     *     new object name. A drive number may be specified in this string but 
     *     it is ignored and assumed as the same drive of the old_name. Any 
     *     object with this path name except old_name must not be exist, or the 
     *     function fails with FR_EXIST.
     * @returns OK or error code
     */
    rename(oldName: string, newName: string): void {
        this.#context.enterScope(scope => {
            const oldNamePtr = scope.allocString(oldName);
            const newNamePtr = scope.allocString(newName);
            throwIfError(
                "renaming file or directory",
                () => this.#exports.f_rename(oldNamePtr, newNamePtr)
            );
        });
    }

    /**
     * The f_chmod function changes the attribute of a file or sub-directory.
     * @param path Pointer to the null-terminated string that specifies an 
     *     object to be changed
     * @param attr Attribute flags to be set in one or more combination. The 
     *     specified flags are set and others are cleared.
     * @param mask Attribute mask that specifies which attribute is changed. 
     *     The specified attributes are set or cleared and others are left 
     *     unchanged.
     * @returns OK or error code
     */
    chmod(path: string, attr: number, mask: number): void {
        this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            throwIfError(
                "changing file or directory permissions",
                () => this.#exports.f_chmod(pathPtr, attr, mask)
            );
        });
    }

    /**
     * The f_utime function changes the timestamp of a file or sub-directory.
     * @param path Pointer to the null-terminated string that specifies an 
     *     object to be changed.
     * @param time Pointer to the file information structure that has a 
     *     timestamp to be set in member fdate and ftime. Do not care any 
     *     other members.
     * @returns OK or error code
     */
    utime(path: string, time: Date): void {
        this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            const fno = scope.alloc(24);

            // set date and time only, doesn't care about other entries
            const year = (time.getFullYear() - 1980) & 0x7F;
            const month = time.getMonth() + 1;
            const day = time.getDay();
            const encodedDate = (year << 9) | (month << 5) | day;
            this.#context.view.setUint16(fno + 4, encodedDate, true);
    
            const hour = time.getHours()
            const minute = time.getMinutes();
            const seconds = time.getSeconds() >>> 1;
            const encodedTime = (hour << 11) | (minute << 5) | seconds;
            this.#context.view.setUint16(fno + 6, encodedTime, true);
        
            throwIfError(
                "changing timestamp of file or directory",
                () => this.#exports.f_utime(pathPtr, fno)
            );
        });
    }

    /**
     * The f_mkdir function creates a new directory.
     * @param path Pointer to the null-terminated string that specifies the 
     *     directory name to create.
     */
    mkdir(path: string): void {
        const f_mkdir = this.#exports.f_mkdir as (path: number) => number;
        this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            throwIfError(
                "creating directory",
                () => this.#exports.f_mkdir(pathPtr)
            );
        });
    }

    /**
     * The f_chdir function changes the current directory of the logical drive.
     * @param path Pointer to the null-terminated string that specifies the 
     *     directory to be set as current directory.
     */
    chdir(path: string): void {
        this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            throwIfError(
                "changing current directory",
                () => this.#exports.f_chdir(pathPtr)
            );
        });
    }

    /**
     * The f_chdrive function changes the current drive.
     * @param path Specifies the logical drive number to be set as the current 
     *     drive.
     */
    chdrive(path: string): void {
        this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            throwIfError(
                "changing current drive",
                () => this.#exports.f_chdrive(pathPtr)
            );
        });
    }

    /**
     * The f_getcwd function retrieves the current directory of the current 
     * drive.
     * @returns The current directory.
     */
    getcwd(): string {
        return this.#context.enterScope(scope => {
            const buffer = scope.alloc(260);
            throwIfError(
                "getting current directory",
                () => this.#exports.f_getcwd(buffer, 260)
            );
            return this.#context.decodeString(buffer, 260);
        });
    }

    /**
     * 
     * @param path Pointer to the null-terminated string that specifies the 
     *     logical drive. A null-string means the default drive.
     * @returns tuple with the number of free clusters, and a FATFS 
     *     object containing number of sectors per cluster.
     */
    getFree(path: string | null): [number, FatFsObject] {
        return this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            const nclst = scope.alloc(4);
            const fatfsPtr = scope.alloc(4);
            throwIfError(
                "getting free space on drive",
                () => this.#exports.f_getfree(pathPtr, nclst, fatfsPtr),
            );
            return [
                this.#context.view.getUint32(nclst, true), 
                new FatFsObject(fatfsPtr, this.#context)
            ];
        });
    }

    /**
     * The f_getlabel function returns volume label and volume serial number 
     * of a volume.
     * @param path Pointer to the null-terminated string that specifies the 
     *     logical drive. Null-string specifies the default drive.
     * @returns tuple containing the result, the volume label, and the volume 
     *     serial number
     */
    getLabel(path: string): [string, number] {
        return this.#context.enterScope(scope => {
            const pathPtr = scope.allocString(path);
            const label = scope.alloc(13);
            this.#context.heap[label + 12] = 0;
            const vsn = scope.alloc(4);
            throwIfError(
                "getting volume label",
                () => this.#exports.f_getlabel(pathPtr, label, vsn)
            );
            return [
                this.#context.decodeString(label, 13),
                this.#context.view.getUint32(vsn, true)
            ];
        });
    }

    /**
     * The f_setlabel function sets/removes the label of a volume.
     * @param label Pointer to the null-terminated string that specifies the 
     *     volume label to be set.
     */
    setLabel(label: string): void {
        this.#context.enterScope(scope => {
            const labelPtr = scope.allocString(label);
            throwIfError(
                "setting volume label",
                () => this.#exports.f_setlabel(labelPtr)
            );
        });
    }

    /**
     * The f_setcp function sets the active code page.
     * @param cp OEM code page to be used for the path name.
     */
    setCP(cp: number): void {
        const f_setcp = this.#exports.f_setcp as (cp: number) => number;
        throwIfError(
            "setting active code page",
            () => f_setcp(cp)
        );
    }
}
