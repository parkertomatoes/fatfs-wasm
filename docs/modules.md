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

| Name | Type | Description |
| :------ | :------ | :------ |
| `multiPartition?` | `boolean` | Whether or not to enable multi-partition disks, which enables [fdisk](classes/FatFsDiskPartitionable.md#fdisk) |
| `sectorSize?` | `number` | The size of the filesystem disk sectors, in bytes. Uses 512 if not provided. |

#### Defined in

[src/fatfs.ts:752](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L752)

___

### FatFsMkfsOptions

Ƭ **FatFsMkfsOptions**: `Object`

Options provided to [mkfs](classes/FatFsDisk.md#mkfs)

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `align?` | `number` | Data area alignment (sector) |
| `auSize?` | `number` | Cluster size (byte) |
| `fmt?` | [`FatFsFormat`](enums/FatFsFormat.md) | Format option (FM_FAT, FM_FAT32, FM_EXFAT and FM_SFD) |
| `nFat?` | `number` | Number of FATs |
| `nRoot?` | `number` | Number of root directory entries |
| `path?` | `string` | Drive number to format. Empty string uses default drive |

#### Defined in

[src/fatfs.ts:260](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L260)
