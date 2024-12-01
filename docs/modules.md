[fatfs-wasm](README.md) / Exports

# fatfs-wasm

High-level interface for creating and accessing FAT images using the FatFS library by CHaN.

## Table of contents

### Enumerations

- [FatFsAttrib](enums/FatFsAttrib.md)
- [FatFsFormat](enums/FatFsFormat.md)
- [FatFsIoctl](enums/FatFsIoctl.md)
- [FatFsMode](enums/FatFsMode.md)
- [FatFsResult](enums/FatFsResult.md)

### Classes

- [FatFsDir](classes/FatFsDir.md)
- [FatFsDisk](classes/FatFsDisk.md)
- [FatFsDiskPartitionable](classes/FatFsDiskPartitionable.md)
- [FatFsError](classes/FatFsError.md)
- [FatFsFile](classes/FatFsFile.md)
- [FatFsFileInfo](classes/FatFsFileInfo.md)

### Type Aliases

- [FatFsDiskOptions](modules.md#fatfsdiskoptions)
- [FatFsMkfsOptions](modules.md#fatfsmkfsoptions)

## Type Aliases

### FatFsDiskOptions

Ƭ **FatFsDiskOptions**: `Object`

Options for creating a [FatFsDisk](classes/FatFsDisk.md).

#### Type declaration

| Name | Type |
| :------ | :------ |
| `multiPartition?` | `boolean` |
| `sectorSize?` | `number` |

#### Defined in

[src/fatfs.ts:738](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L738)

___

### FatFsMkfsOptions

Ƭ **FatFsMkfsOptions**: `Object`

Options provided to [mkfs](classes/FatFsDisk.md#mkfs)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `align?` | `number` |
| `auSize?` | `number` |
| `fmt?` | [`FatFsFormat`](enums/FatFsFormat.md) |
| `nFat?` | `number` |
| `nRoot?` | `number` |
| `path?` | `string` |

#### Defined in

[src/fatfs.ts:260](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L260)
