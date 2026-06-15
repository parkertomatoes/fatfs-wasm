import { describe, expect, test, beforeEach } from 'vitest'
import { FatFsDisk, FatFsError, FatFsMode, FatFsAttrib, FatFsFormat, FatFsResult } from '../src/fatfs';
import { readFile } from 'fs/promises';
import path from 'path';

function expectFatFsResult(action: () => void, result: FatFsResult, messagePart?: string): void {
    try {
        action();
        throw new Error('Expected FatFsError');
    } catch (err) {
        expect(err).toBeInstanceOf(FatFsError);
        expect((err as FatFsError).result).toBe(result);
        if (messagePart)
            expect((err as Error).message).toContain(messagePart);
    }
}

async function createMountedFatDisk(size = 8 * 1024 * 1024): Promise<FatFsDisk> {
    const disk = await FatFsDisk.create(new Uint8Array(size));
    disk.mkfs({ fmt: FatFsFormat.FAT, path: '' });
    disk.mount('', 1);
    return disk;
}

describe('FatFs Disk Tests', () => {
    test('should partition without error', async () => {
        const data = new Uint8Array(16 * 1024 * 1024);
        const disk = await FatFsDisk.create(data);
        disk.fdisk([100]);
    });

    test('should format partition paths with default format options', async () => {
        const data = new Uint8Array(24 * 1024 * 1024);
        const disk = await FatFsDisk.create(data);
        disk.fdisk([50, 50]);
        disk.mkfs({ path: '0:' });
        disk.mkfs({ path: '1:' });
    });

    test('should format without error', async () => {
        const data = await readFile(path.join(__dirname, 'assets/emptyPartition.img'));
        const disk = await FatFsDisk.create(new Uint8Array(data));
        disk.mkfs();
    });

    test('should format using options without error', async () => {
        const data = await readFile(path.join(__dirname, 'assets/emptyPartition.img'));
        const disk = await FatFsDisk.create(new Uint8Array(data));
        disk.mkfs({
            fmt: FatFsFormat.FAT,
            nFat: 0, // default
            align: 0, // default
            nRoot: 0, // default
            auSize: 0, // default
            path: '' // default
        });
    });


    test('should mount a workspace without error', async () => {
        const data = await readFile(path.join(__dirname, 'assets/emptyFormattedVolume.img'));
        const disk = await FatFsDisk.create(new Uint8Array(data));
        const workspace = disk.mount('', 0);
        expect(workspace.ptr).not.toBe(0);
    });

    test('should create and iterate long UTF-8 filenames', async () => {
        const data = new Uint8Array(8 * 1024 * 1024);
        const disk = await FatFsDisk.create(data);
        disk.mkfs({ fmt: FatFsFormat.FAT, path: '' });
        disk.mount('', 1);

        const fileName = 'long filename with unicode-東京.txt';
        const renamed = 'renamed long filename-東京.txt';
        const content = new TextEncoder().encode('utf8-lfn-content');
        const file = disk.open(fileName, FatFsMode.WRITE | FatFsMode.CREATE_NEW);
        file.write(content);
        file.close();

        expect(disk.stat(fileName).name).toBe(fileName);
        expect(new TextDecoder().decode(disk.readFile(fileName))).toBe('utf8-lfn-content');

        disk.rename(fileName, renamed);
        expect(disk.stat(renamed).name).toBe(renamed);
        expect([...disk.openDir('')].map(entry => entry.name)).toContain(renamed);

        const found = [...disk.find('', 'renamed*')].map(entry => entry.name);
        expect(found).toContain(renamed);
    });

    test('should keep logical partitions isolated and reject uncreated drives', async () => {
        const data = new Uint8Array(24 * 1024 * 1024);
        const disk = await FatFsDisk.create(data);
        disk.fdisk([33, 33]);

        disk.mkfs({ fmt: FatFsFormat.FAT, path: '0:' });
        disk.mkfs({ fmt: FatFsFormat.FAT, path: '1:' });
        disk.mount('0:', 1);
        disk.mount('1:', 1);

        disk.writeFile('0:/same.txt', new TextEncoder().encode('partition-zero'));
        disk.writeFile('1:/same.txt', new TextEncoder().encode('partition-one'));

        expect(new TextDecoder().decode(disk.readFile('0:/same.txt'))).toBe('partition-zero');
        expect(new TextDecoder().decode(disk.readFile('1:/same.txt'))).toBe('partition-one');
        expectFatFsResult(
            () => disk.stat('3:/same.txt'),
            FatFsResult.NOT_ENABLED,
            'getting file information'
        );
    });

    test('should update stale logical partition mappings after repartitioning', async () => {
        const data = new Uint8Array(24 * 1024 * 1024);
        const disk = await FatFsDisk.create(data);
        disk.fdisk([25, 25, 25, 25]);
        disk.fdisk([50, 50]);

        disk.mkfs({ fmt: FatFsFormat.FAT, path: '0:' });
        disk.mkfs({ fmt: FatFsFormat.FAT, path: '1:' });
        disk.mount('0:', 1);
        disk.mount('1:', 1);

        disk.writeFile('0:/zero.txt', new TextEncoder().encode('zero'));
        disk.writeFile('1:/one.txt', new TextEncoder().encode('one'));

        expectFatFsResult(
            () => disk.mount('2:', 1),
            FatFsResult.NOT_READY,
            'mounting workspace'
        );
        expectFatFsResult(
            () => disk.open('2:/stale.txt', FatFsMode.READ),
            FatFsResult.NOT_READY,
            'opening file'
        );
    });

    test('should select the exFAT/GPT-capable build when requested', async () => {
        const data = new Uint8Array(64 * 1024 * 1024);
        const disk = await FatFsDisk.create(data, { exfat: true });
        disk.mkfs({ fmt: FatFsFormat.EXFAT, path: '' });
        disk.mount('', 1);

        const name = 'exfat long filename-東京.txt';
        disk.writeFile(name, new TextEncoder().encode('exfat-data'));
        expect(new TextDecoder().decode(disk.readFile(name))).toBe('exfat-data');
        disk.rename(name, 'renamed exfat long filename-東京.txt');
        expect(disk.stat('renamed exfat long filename-東京.txt').name).toBe('renamed exfat long filename-東京.txt');
    });

    test('should create and mount GPT partitions in the exFAT/GPT-capable build', async () => {
        const data = new Uint8Array(24 * 1024 * 1024);
        const disk = await FatFsDisk.create(data, { exfat: true });
        disk.fdisk([50, 50]);

        const protectiveMbrType = data[512 - 66 + 4];
        const gptSignature = new TextDecoder('ascii').decode(data.subarray(512, 520));
        expect(protectiveMbrType).toBe(0xEE);
        expect(gptSignature).toBe('EFI PART');

        disk.mkfs({ fmt: FatFsFormat.FAT, path: '0:' });
        disk.mount('0:', 1);
        disk.writeFile('0:/gpt.txt', new TextEncoder().encode('gpt-data'));
        expect(new TextDecoder().decode(disk.readFile('0:/gpt.txt'))).toBe('gpt-data');
    });

    test('should reject exFAT formatting in the FAT-only build', async () => {
        const data = new Uint8Array(64 * 1024 * 1024);
        const disk = await FatFsDisk.create(data);
        expect(() => disk.mkfs({ fmt: FatFsFormat.EXFAT, path: '' })).toThrow(FatFsError);
    });
});

describe('FatFs Additional API Coverage', () => {
    test('should cover file positioning, sync, truncate, eof, and error helpers', async () => {
        const disk = await createMountedFatDisk();
        const file = disk.open('api.txt', FatFsMode.WRITE | FatFsMode.READ | FatFsMode.CREATE_ALWAYS);
        const content = new TextEncoder().encode('line one\nline two!');

        expect(file.write(content)).toBe(18);
        expect(file.tell()).toBe(18);
        expect(file.size()).toBe(18);
        expect(file.eof(file)).not.toBe(0);
        expect(file.error(file)).toBe(0);

        file.sync();
        file.lseek(5);
        expect(file.tell()).toBe(5);
        file.truncate();
        expect(file.size()).toBe(5);

        file.rewind();
        const readBuffer = new Uint8Array(5);
        expect(file.read(readBuffer)).toBe(5);
        expect(new TextDecoder().decode(readBuffer)).toBe('line ');
        expect(file.tell()).toBe(5);
        file.close();

        const expanded = disk.open('expanded.bin', FatFsMode.WRITE | FatFsMode.READ | FatFsMode.CREATE_ALWAYS);
        expanded.expand(4096, 1);
        expect(expanded.size()).toBe(4096);
        expanded.close();
    });

    test('should cover disk session, unmount, cwd, free space, label, and timestamp APIs', async () => {
        const disk = await createMountedFatDisk();

        disk.mkdir('folder');
        disk.chdir('folder');
        expect(disk.getcwd()).toBe('0:/folder');
        disk.chdir('/');
        disk.chdrive('0:');
        expect(disk.getcwd()).toBe('0:/');

        disk.setLabel('FATFSAPI');
        const [label, serial] = disk.getLabel();
        expect(label).toBe('FATFSAPI');
        expect(serial).toBeTypeOf('number');

        const [freeClusters, fs] = disk.getFree();
        expect(freeClusters).toBeGreaterThan(0);
        expect(fs.ptr).not.toBe(0);
        expect(fs.cSize).toBeGreaterThan(0);

        disk.writeFile('dated.txt', new TextEncoder().encode('date'));
        const timestamp = new Date(2024, 0, 1, 12, 34, 56);
        disk.utime('dated.txt', timestamp);
        expect(disk.stat('dated.txt').date).toStrictEqual(timestamp);

        const sessionResult = disk.session(() => {
            disk.writeFile('session.txt', new TextEncoder().encode('session-data'));
            return new TextDecoder().decode(disk.readFile('session.txt'));
        });
        expect(sessionResult).toBe('session-data');
        expectFatFsResult(
            () => disk.stat('session.txt'),
            FatFsResult.NOT_ENABLED,
            'getting file information'
        );

        disk.mount('', 1);
        expect(new TextDecoder().decode(disk.readFile('session.txt'))).toBe('session-data');
        disk.unmount();
        expectFatFsResult(
            () => disk.stat('session.txt'),
            FatFsResult.NOT_ENABLED,
            'getting file information'
        );
    });

    test('should cover directory rewind and close', async () => {
        const disk = await createMountedFatDisk();
        disk.mkdir('folder');
        disk.writeFile('folder/a.txt', new TextEncoder().encode('a'));
        disk.writeFile('folder/b.txt', new TextEncoder().encode('b'));

        const dir = disk.openDir('folder');
        expect(dir.dp).not.toBe(0);
        expect(dir.read().name).toBe('a.txt');
        expect(dir.read().name).toBe('b.txt');
        dir.rewind();
        expect(dir.read().name).toBe('a.txt');
        dir.close();
    });

    test('should expose all file attribute helpers', async () => {
        const disk = await createMountedFatDisk();
        disk.writeFile('attrs.txt', new TextEncoder().encode('attrs'));
        disk.chmod(
            'attrs.txt',
            FatFsAttrib.RDO | FatFsAttrib.HID | FatFsAttrib.SYS,
            FatFsAttrib.RDO | FatFsAttrib.HID | FatFsAttrib.SYS
        );

        const fileInfo = disk.stat('attrs.txt');
        expect(fileInfo.isReadOnly).toBe(true);
        expect(fileInfo.isHidden).toBe(true);
        expect(fileInfo.isSystem).toBe(true);
        expect(fileInfo.isArchive).toBe(true);
        expect(fileInfo.isDirectory).toBe(false);

        disk.mkdir('attrdir');
        const dirInfo = disk.stat('attrdir');
        expect(dirInfo.isDirectory).toBe(true);
        expect(dirInfo.isArchive).toBe(false);
    });

    test('should cover explicit null mkfs options and default FatFsDisk.create overload', async () => {
        const disk = await FatFsDisk.create(new Uint8Array(8 * 1024 * 1024));
        disk.mkfs(null);
        const fs = disk.mount();
        expect(fs.ptr).not.toBe(0);
        disk.writeFile('default.txt', new TextEncoder().encode('default-create'));
        expect(new TextDecoder().decode(disk.readFile('default.txt'))).toBe('default-create');
    });
});

describe('FatFs File File Tests', () => {
    let disk: FatFsDisk;
    let data: Buffer;

    beforeEach(async () => {
        data = await readFile(path.join(__dirname, 'assets/withFile.img'));
        disk = await FatFsDisk.create(new Uint8Array(data));
        disk.mount('', 0);
    });

    test('should open a new file without error', async() => {
        const file = disk.open('example.txt', FatFsMode.WRITE | FatFsMode.CREATE_NEW);
        expect(file.fp).not.toBe(0);
    });

    test('should fail to open a non-existing file for read', async() => {
        expect(() => disk.open('no_exist.txt', FatFsMode.READ)).toThrow();
    });

    test('should read an existing file', async () => {
        const file = disk.open('test.txt', FatFsMode.READ);

        const buffer = new Uint8Array(256);
        const bytesRead = file.read(buffer, 256);
        expect(bytesRead).toBe(11);
        
        const textArray = buffer.subarray(0, bytesRead);
        const text = new TextDecoder().decode(textArray);
        expect(text).toBe('hello world');
    });

    test('should write an existing file', async() => {
        const file = disk.open('data.txt', FatFsMode.CREATE_NEW | FatFsMode.WRITE);
        const buffer = new TextEncoder().encode('text-to-test');
        const bytesWritten = file.write(buffer, buffer.length);
        expect(bytesWritten).toBe(12);
        file.close();

        // check that the read matches written content
        const readFile = disk.open('data.txt', FatFsMode.READ);
        const readBuffer = new Uint8Array(12);
        readFile.read(readBuffer, 12);
        expect(new TextDecoder().decode(readBuffer)).toStrictEqual('text-to-test');
    })

    test('should stat a file', () => {
        const fileInfo = disk.stat('test.txt');
        expect(fileInfo.name).toBe('TEST.TXT');
        expect(fileInfo.size).toBe(11);
        expect(fileInfo.date).toStrictEqual(new Date(2023, 6, 4, 0, 0, 44));
        expect(fileInfo.attrib).toBe(FatFsAttrib.ARC);
    });

    test('should rename a file', () => {
        disk.rename('test.txt', 'nottest.txt');
        
        // check that it was actually renamed
        expect(() => disk.stat('test.txt')).toThrow();
        const fileInfo = disk.stat('nottest.txt');
        expect(fileInfo.name).toBe('nottest.txt');
    });

    test('should be able to change file permissions', () => {
        disk.chmod('test.txt', FatFsAttrib.RDO, FatFsAttrib.RDO);

        // check that it took effect
        const fileInfo = disk.stat('test.txt');
        expect(fileInfo.isReadOnly).toBe(true);
    })

    test('should delete a file', () => {
        disk.unlink('test.txt');
        expect(() => disk.stat('test.txt')).toThrow();
    });

    test('should create a directory without error', () => {
        const mkdirResult = disk.mkdir('folder');

        const fileInfo = disk.stat('folder');
        expect(fileInfo.isDirectory).toBe(true);
    });
});

describe('FatFs Empty Directory Tests', () => {
    let disk: FatFsDisk;
    let data: Buffer;

    beforeEach(async () => {
        data = await readFile(path.join(__dirname, 'assets/withEmptyDirectory.img'));
        disk = await FatFsDisk.create(new Uint8Array(data));
        disk.mount('', 0);
    });

    test('should create a file inside a directory', () => {
        const file = disk.open("folder/inside2.txt", FatFsMode.CREATE_NEW | FatFsMode.WRITE);
        
        const content = new TextEncoder().encode('file-contents');
        const bytesWritten = file.write(content, content.length);
        expect(bytesWritten).toBe(13);

        file.close();

        const fileInfo = disk.stat('folder\\inside2.txt');
        expect(fileInfo.name).toBe('inside2.txt');
        expect(fileInfo.size).toBe(13);
    });

    test('should iterate an empty directory using read()', () => {
        const dir = disk.openDir('folder');
        const fileInfo = dir.read();
        expect(fileInfo.name).toBe('');
    });

    test('should iterate an empty directory using iterators', () => {
        const dir = disk.openDir('folder');
        const it = dir[Symbol.iterator]();
        const result = it.next();
        expect(result.value).toBe(undefined);
        expect(result.done).toBe(true);
    });
});

describe('FatFs Directory Tests', () => {
    let disk: FatFsDisk;
    let data: Buffer;

    beforeEach(async () => {
        data = await readFile(path.join(__dirname, 'assets/withDirectory.img'));
        disk = await FatFsDisk.create(new Uint8Array(data));
        disk.mount('', 0);
    });

    test('should iterate a directory using read()', () => {
        const dir = disk.openDir('folder');
        
        let fileInfo;
        fileInfo = dir.read();
        expect(fileInfo.name).toBe('INSIDE.TXT');
        
        fileInfo = dir.read();
        expect(fileInfo.name).toBe('INSIDE2.TXT');

        fileInfo = dir.read();
        expect(fileInfo.name).toBe('');
    });

    test('should iterate a directory with iterators', () => {
        const dir = disk.openDir('folder');

        const it = dir[Symbol.iterator]();

        const first = it.next();
        expect(first.value.name).toBe('INSIDE.TXT');
        expect(first.done).toBe(false);

        const second = it.next();
        expect(second.value.name).toBe('INSIDE2.TXT');
        expect(second.done).toBe(false);

        const third = it.next();
        expect(third.value).toBe(undefined);
        expect(third.done).toBe(true);
    })

    test('should search a directory using findFirst/findNext', () => {
        let [dir, fileInfo] = disk.findFirst('folder', '*2.TXT');
        expect(dir.dp).not.toBe(0);
        expect(fileInfo.name).toBe('INSIDE2.TXT');

        fileInfo = dir.findNext();
        expect(fileInfo.name).toBe('');
    })

    test('should search a directory using iterators', () => {
        const it = disk.find('folder', '*2.TXT');
        const first = it.next();
        expect(first.done).toBe(false);
        expect(first.value.name).toBe('INSIDE2.TXT');

        const second = it.next();
        expect(second.done).toBe(true);
        expect(second.value).toBe(undefined);
    });
});
