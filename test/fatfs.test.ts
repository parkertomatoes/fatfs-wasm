import { describe, expect, test } from '@jest/globals'
import { FatFsDisk, FatFsMode, FatFsAttrib, FatFsFileInfo } from '../src/fatfs';
import { readFile } from 'fs/promises';
import path from 'path';

describe('FatFs Disk Tests', () => {
    test('should partition without error', async () => {
        const data = new Uint8Array(1<<16); // 8MB
        const disk = await FatFsDisk.create(data);
        disk.fdisk(0, [100]);
    });

    test('should format without error', async () => {
        const data = await readFile(path.join(__dirname, 'assets/emptyPartition.img'));
        const disk = await FatFsDisk.create(data);
        disk.mkfs('');
    });

    test('should mount a workspace without error', async () => {
        const data = await readFile(path.join(__dirname, 'assets/emptyFormattedVolume.img'));
        const disk = await FatFsDisk.create(data);
        const workspace = disk.mount('', 0);
        expect(workspace.ptr).not.toBe(0);
    });
});

describe('FatFs File File Tests', () => {
    let disk: FatFsDisk;
    let data: Buffer;

    beforeEach(async () => {
        data = await readFile(path.join(__dirname, 'assets/withFile.img'));
        disk = await FatFsDisk.create(data);
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
        expect(readBuffer).toStrictEqual(buffer);
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
        expect(fileInfo.name).toBe('NOTTEST.TXT');
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
        disk = await FatFsDisk.create(data);
        disk.mount('', 0);
    });

    test('should create a file inside a directory', () => {
        const file = disk.open("folder/inside2.txt", FatFsMode.CREATE_NEW | FatFsMode.WRITE);
        
        const content = new TextEncoder().encode('file-contents');
        const bytesWritten = file.write(content, content.length);
        expect(bytesWritten).toBe(13);

        file.close();

        const fileInfo = disk.stat('folder\\inside2.txt');
        expect(fileInfo.name).toBe('INSIDE2.TXT');
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
        disk = await FatFsDisk.create(data);
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
