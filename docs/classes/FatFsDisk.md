[fatfs-wasm](../README.md) / [Exports](../modules.md) / FatFsDisk

# Class: FatFsDisk

## Table of contents

### Constructors

- [constructor](FatFsDisk.md#constructor)

### Methods

- [chdir](FatFsDisk.md#chdir)
- [chdrive](FatFsDisk.md#chdrive)
- [chmod](FatFsDisk.md#chmod)
- [fdisk](FatFsDisk.md#fdisk)
- [find](FatFsDisk.md#find)
- [findFirst](FatFsDisk.md#findfirst)
- [getFree](FatFsDisk.md#getfree)
- [getLabel](FatFsDisk.md#getlabel)
- [getcwd](FatFsDisk.md#getcwd)
- [mkdir](FatFsDisk.md#mkdir)
- [mkfs](FatFsDisk.md#mkfs)
- [mount](FatFsDisk.md#mount)
- [open](FatFsDisk.md#open)
- [openDir](FatFsDisk.md#opendir)
- [rename](FatFsDisk.md#rename)
- [setCP](FatFsDisk.md#setcp)
- [setLabel](FatFsDisk.md#setlabel)
- [stat](FatFsDisk.md#stat)
- [unlink](FatFsDisk.md#unlink)
- [unmount](FatFsDisk.md#unmount)
- [utime](FatFsDisk.md#utime)
- [create](FatFsDisk.md#create)

## Constructors

### constructor

• **new FatFsDisk**(`context`, `exports`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `FatFsMemoryContext` |
| `exports` | `FatFsExports` |

#### Defined in

src/fatfs.ts:700

## Methods

### chdir

▸ **chdir**(`path`): `void`

The f_chdir function changes the current directory of the logical drive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Pointer to the null-terminated string that specifies the directory to be set as current directory. |

#### Returns

`void`

#### Defined in

src/fatfs.ts:1016

___

### chdrive

▸ **chdrive**(`path`): `void`

The f_chdrive function changes the current drive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Specifies the logical drive number to be set as the current drive. |

#### Returns

`void`

#### Defined in

src/fatfs.ts:1031

___

### chmod

▸ **chmod**(`path`, `attr`, `mask`): `void`

The f_chmod function changes the attribute of a file or sub-directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Pointer to the null-terminated string that specifies an object to be changed |
| `attr` | `number` | Attribute flags to be set in one or more combination. The specified flags are set and others are cleared. |
| `mask` | `number` | Attribute mask that specifies which attribute is changed. The specified attributes are set or cleared and others are left unchanged. |

#### Returns

`void`

OK or error code

#### Defined in

src/fatfs.ts:951

___

### fdisk

▸ **fdisk**(`pdrv`, `ptbl`): `void`

The f_fdisk function divides a physical drive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pdrv` | `number` | Specifies the physical drive to be divided. This is not the logical drive number but the drive identifier passed to the low level disk functions. |
| `ptbl` | `number`[] | List of partition size to create on the drive. |

#### Returns

`void`

#### Defined in

src/fatfs.ts:715

___

### find

▸ **find**(`path`, `pattern`): `IterableIterator`<[`FatFsFileInfo`](FatFsFileInfo.md)\>

Searches a directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The directory name to be opened. |
| `pattern` | `string` | The pattern to search for |

#### Returns

`IterableIterator`<[`FatFsFileInfo`](FatFsFileInfo.md)\>

An iterator to the search results

#### Defined in

src/fatfs.ts:873

___

### findFirst

▸ **findFirst**(`path`, `pattern`): [[`FatFsDir`](FatFsDir.md), [`FatFsFileInfo`](FatFsFileInfo.md)]

Searches a directory for an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The directory name to be opened. |
| `pattern` | `string` | The pattern to search for |

#### Returns

[[`FatFsDir`](FatFsDir.md), [`FatFsFileInfo`](FatFsFileInfo.md)]

The directory, and the first matching entry

#### Defined in

src/fatfs.ts:848

___

### getFree

▸ **getFree**(`path`): [`number`, `FatFsObject`]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | ``null`` \| `string` | Pointer to the null-terminated string that specifies the logical drive. A null-string means the default drive. |

#### Returns

[`number`, `FatFsObject`]

tuple with the number of free clusters, and a FATFS 
    object containing number of sectors per cluster.

#### Defined in

src/fatfs.ts:1064

___

### getLabel

▸ **getLabel**(`path`): [`string`, `number`]

The f_getlabel function returns volume label and volume serial number 
of a volume.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Pointer to the null-terminated string that specifies the logical drive. Null-string specifies the default drive. |

#### Returns

[`string`, `number`]

tuple containing the result, the volume label, and the volume 
    serial number

#### Defined in

src/fatfs.ts:1088

___

### getcwd

▸ **getcwd**(): `string`

The f_getcwd function retrieves the current directory of the current 
drive.

#### Returns

`string`

The current directory.

#### Defined in

src/fatfs.ts:1046

___

### mkdir

▸ **mkdir**(`path`): `void`

The f_mkdir function creates a new directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Pointer to the null-terminated string that specifies the directory name to create. |

#### Returns

`void`

#### Defined in

src/fatfs.ts:1000

___

### mkfs

▸ **mkfs**(`path`, `opt?`): `void`

The f_mkfs function creates an FAT/exFAT volume on the logical drive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Logical drive number |
| `opt?` | ``null`` \| `FatFsMkfsOptions` | Format options |

#### Returns

`void`

OK or error code

#### Defined in

src/fatfs.ts:734

___

### mount

▸ **mount**(`path`, `opt`): `FatFsObject`

The f_mount function gives work area to the FatFs module.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Pointer to the null-terminated string that specifies the logical drive. The string without drive number means the default drive. |
| `opt` | `number` | Mounting option. 0: Do not mount now (to be mounted on the first access to the volume), 1: Force mounted the volume to check if it is ready to work. |

#### Returns

`FatFsObject`

reference to the mounted work area

#### Defined in

src/fatfs.ts:764

___

### open

▸ **open**(`path`, `mode`): [`FatFsFile`](FatFsFile.md)

The f_open function opens a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Pointer to the null-terminated string that specifies the file name to open or create. |
| `mode` | [`FatFsMode`](../enums/FatFsMode.md) | Mode flags that specifies the type of access and open method for the file. It is specified by a combination of following flags. |

#### Returns

[`FatFsFile`](FatFsFile.md)

File object

#### Defined in

src/fatfs.ts:810

___

### openDir

▸ **openDir**(`path`): [`FatFsDir`](FatFsDir.md)

The f_opendir function opens a directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Pointer to the null-terminated string that specifies the directory name to be opened. |

#### Returns

[`FatFsDir`](FatFsDir.md)

Directory object

#### Defined in

src/fatfs.ts:829

___

### rename

▸ **rename**(`oldName`, `newName`): `void`

The f_rename function renames and/or moves a file or sub-directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `oldName` | `string` | Pointer to a null-terminated string that specifies the existing file or sub-directory to be renamed. |
| `newName` | `string` | Pointer to a null-terminated string that specifies the new object name. A drive number may be specified in this string but it is ignored and assumed as the same drive of the old_name. Any object with this path name except old_name must not be exist, or the function fails with FR_EXIST. |

#### Returns

`void`

OK or error code

#### Defined in

src/fatfs.ts:929

___

### setCP

▸ **setCP**(`cp`): `void`

The f_setcp function sets the active code page.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cp` | `number` | OEM code page to be used for the path name. |

#### Returns

`void`

#### Defined in

src/fatfs.ts:1124

___

### setLabel

▸ **setLabel**(`label`): `void`

The f_setlabel function sets/removes the label of a volume.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | Pointer to the null-terminated string that specifies the volume label to be set. |

#### Returns

`void`

#### Defined in

src/fatfs.ts:1110

___

### stat

▸ **stat**(`path`): [`FatFsFileInfo`](FatFsFileInfo.md)

The f_stat function checks the existence of a file or sub-directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Pointer to the null-terminated string that specifies the object to get its information. The object must not be the root direcotry. |

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

OK or error code

#### Defined in

src/fatfs.ts:890

___

### unlink

▸ **unlink**(`path`): `void`

The f_unlink function removes a file or sub-directory from the volume.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Pointer to a null-terminated string that specifies the file or sub-directory to be removed. |

#### Returns

`void`

#### Defined in

src/fatfs.ts:908

___

### unmount

▸ **unmount**(`path`): `void`

Unregisters the filesystem object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Pointer to the null-terminated string that specifies the logical drive. The string without drive number means the default drive. |

#### Returns

`void`

#### Defined in

src/fatfs.ts:786

___

### utime

▸ **utime**(`path`, `time`): `void`

The f_utime function changes the timestamp of a file or sub-directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Pointer to the null-terminated string that specifies an object to be changed. |
| `time` | `Date` | Pointer to the file information structure that has a timestamp to be set in member fdate and ftime. Do not care any other members. |

#### Returns

`void`

OK or error code

#### Defined in

src/fatfs.ts:970

___

### create

▸ `Static` **create**(`disk`, `sectorSize?`): `Promise`<[`FatFsDisk`](FatFsDisk.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `disk` | `Uint8Array` |
| `sectorSize?` | `number` |

#### Returns

`Promise`<[`FatFsDisk`](FatFsDisk.md)\>

#### Defined in

src/fatfs.ts:684
