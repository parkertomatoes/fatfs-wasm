# FatFs-Wasm
FatFs is a generic FAT/exFAT filesystem module for small embedded systems, authored by CHaN. FatFs-Wasm is a library which uses a WebAssembly build of FatFs to manipulate FAT image files from node or the browser.

Features:
 * Read, write, rename, stat, chmod, and delete files
 * Create, iterate, rename, and delete directories
 * Supports FAT12, FAT16, and FAT32

 Limitations:
 * ExFat is not enabled in this build
 * LFN is not enabled in this build
 * Async drivers not supported

## Getting Started
FatFs-Wasm can be used from Node.js or the browser
, 
In the browser, include `fatfs-wasm.js`, which makes `fatfs-wasm` available in the window namespace:
```html
<script src="fatfs-wasm.js"></script>
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
const { FatFsDisk } = require('fatfs-wasm')
```

## Using
FatFs can be used with typed arrays to create disk images:
```typescript
const data = new Uint8Array(1 << 23);
const disk = FatFsDisk.create(data);
disk.mkfs();   // Format filesystem
disk.mount();  // Mount workspace
```

Or open existing ones:
```typescript
const response = await fetch('disk.img');
const data = new Uint8Array(response.arrayBuffer());
const disk = FatFsDisk.create(data);
disk.mount();  // Mount workspace
```

Once a workspace is mounted, the library provides APIs for manipulating files:
```typescript
const file = disk.open('file.txt', FatFsMode.READ);
const buffer = new Uint8Array(1024);
file.read(buffer);
file.close();

// Or, for convenience:
const file = disk.readFile('file.txt');
```

As well as iterating directories 
```typescript
const dir = disk.open('folder');
for (const file of dir) {
    // ...
}
dir.close();
```

See the API documentation for details

## API Documentation

[API Documentation](./docs/modules.md)

## Modifying FatFs C Code
FatFs has many feature gates defined using the preprocessor. See `native/ff15/source/ffconf.h` to make adjustments. Please note that any changes to the C code must be reflected in the `src/fatfs.ts`` wrapper, which is not automatically generated. Make changes at your own risk!

To build, open a terminal in MacOS, Linux, or WSL with clang installed and run the build script:
```
cd native
./build.sh
```
This will build `ff_single.wasm` and `ff_multi.wasm` (multi-partition support) and copy it to the `src` directory.


## Running Tests
```
npx vitest
```