# Overview
fatfs-wasm is a Javascript/Typescript FAT filesystem driver for in-memory images. It provides an intuitive API for reading and writing files and data in FAT images. Under the hood, it is powered by the popular FatFS C library by CHaN, compiled to WebAssembly.

Features:
 * Javascript-friendly abstractions over FatFS's API
 * Read, write, rename, stat, chmod, and delete files
 * Create, iterate, rename, and delete directories
 * Supports FAT12, FAT16, FAT32, exFAT, and LFN with Unicode
 * Small size: just 20kB gzipped for both JS and WebAssembly

Limitations:
 * Async drivers not supported
 * FAT volumes limited by the size of a Javascript ArrayBuffer, which is much less than exFAT limits.
 * Does not include FatFS's code page conversion capabilities

## Getting Started
fatfs-wasm can be used from Node.js or the browser.

In the browser, include `fatfs.min.js`, which makes `fatfs-wasm` available in the window namespace:
```html
<script src="fatfs.min.js"></script>
<script>
    const { FatFsDisk } = window['fatfs-wasm']
    // ...
</script>
```

Using npm
```
npm install --save fatfs-wasm
```
Then in Javascript
```typescript
const { FatFsDisk, FatFsFormat, FatFsMode } = require('fatfs-wasm')
```

## Using
FatFs can be used with typed arrays to create disk images:
```typescript
const data = new Uint8Array(1 << 23);
const disk = await FatFsDisk.create(data);
disk.mkfs();   // Format filesystem
disk.mount();  // Mount workspace
```

Create partitions on one in-memory physical disk:
```typescript
const data = new Uint8Array(24 * 1024 * 1024);
const disk = await FatFsDisk.create(data);
disk.fdisk([50, 50]);
disk.mkfs({ path: '0:' });
disk.mkfs({ path: '1:' });
```

Use the exFAT/GPT-capable WASM build when needed:
```typescript
const { FatFsDisk, FatFsFormat } = require('fatfs-wasm');

const disk = await FatFsDisk.create(data, { exfat: true });
disk.mkfs({ fmt: FatFsFormat.EXFAT });
```

Or open existing ones:
```typescript
const response = await fetch('disk.img');
const data = new Uint8Array(await response.arrayBuffer());
const disk = await FatFsDisk.create(data);
disk.mount();  // Mount workspace
```

Once a workspace is mounted, the library provides APIs for manipulating files:
```typescript
const file = disk.open('file.txt', FatFsMode.READ);
const buffer = new Uint8Array(1024);
file.read(buffer);
file.close();

// Or, for convenience:
const contents = disk.readFile('file.txt');
```

As well as iterating directories 
```typescript
const dir = disk.openDir('folder');
for (const file of dir) {
    // ...
}
dir.close();
```

See the API documentation for details

## API Documentation

[API Documentation](./docs/modules.md)

## Modifying FatFs C Code
FatFS has many feature gates defined using the preprocessor. See `native/ff16/source/ffconf.h` to make adjustments. Please note that any changes to the C code must be reflected in the `src/fatfs.ts` wrapper, which is not automatically generated. Make changes at your own risk.

To build, open a terminal in MacOS, Linux, or WSL with clang installed and run the build script:
```
cd native
./build.sh
```
This will build `ff.wasm` and `ff_exfat.wasm` and copy them to the `src` directory.


## Running Tests
```
npx vitest
```
