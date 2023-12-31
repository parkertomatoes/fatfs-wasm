fatfs-wasm / [Exports](modules.md)

# FatFs-Wasm
FatFs is a generic FAT/exFAT filesystem module for small embedded systems, authored by CHaN. FatFS-Wasm is a library which uses a WebAssembly build of FatFs to manipulate FAT image files from node or the browser.

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
FatFs can be used with typed arrays to partition and format disk images:
```typescript
const data = new Uint8Array(1 << 23);
const disk = FatFsDisk.create(data);
disk.fdisk(0, [100]); // Partition 100% to volume 0
disk.mkfs('', 0);     // Format default drive
disk.mount('');       // Mount workspace
```

Or open existing ones:
```typescript
const response = await fetch('disk.img');
const data = new Uint8Array(response.arrayBuffer());
const disk = FatFsDisk.create(data);
disk.mount('');       // Mount workspace
```

Once a workspace is mounted, the library provides APIs for manipulating files:
```typescript
const file = disk.open('file.txt', FatFsMode.READ);
const buffer = new Uint8Array(1024);
file.read(buffer);
file.close();
```

As well as iterating directories 
```typescript
const dir = disk.open('folder');
for (const file of dir) {
    // ...
}
dir.close();
```
