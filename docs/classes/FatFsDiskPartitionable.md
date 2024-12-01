[fatfs-wasm](../README.md) / [Exports](../modules.md) / FatFsDiskPartitionable

# Class: FatFsDiskPartitionable

Extension of [FatFsDisk](FatFsDisk.md) with extensions for partitioning a FAT drive with up to 4 partitions.

If multi-partition support is enabled, accessing some types of FAT disks (e.g. floppes) may not work correctly.

## Hierarchy

- [`FatFsDisk`](FatFsDisk.md)

  ↳ **`FatFsDiskPartitionable`**

## Table of contents

### Constructors

- [constructor](FatFsDiskPartitionable.md#constructor)

### Properties

- [#context](FatFsDiskPartitionable.md##context)
- [#context](FatFsDiskPartitionable.md##context-1)
- [#exports](FatFsDiskPartitionable.md##exports)
- [#exports](FatFsDiskPartitionable.md##exports-1)

### Methods

- [chdir](FatFsDiskPartitionable.md#chdir)
- [chdrive](FatFsDiskPartitionable.md#chdrive)
- [chmod](FatFsDiskPartitionable.md#chmod)
- [fdisk](FatFsDiskPartitionable.md#fdisk)
- [find](FatFsDiskPartitionable.md#find)
- [findFirst](FatFsDiskPartitionable.md#findfirst)
- [getFree](FatFsDiskPartitionable.md#getfree)
- [getLabel](FatFsDiskPartitionable.md#getlabel)
- [getcwd](FatFsDiskPartitionable.md#getcwd)
- [mkdir](FatFsDiskPartitionable.md#mkdir)
- [mkfs](FatFsDiskPartitionable.md#mkfs)
- [mount](FatFsDiskPartitionable.md#mount)
- [open](FatFsDiskPartitionable.md#open)
- [openDir](FatFsDiskPartitionable.md#opendir)
- [readFile](FatFsDiskPartitionable.md#readfile)
- [rename](FatFsDiskPartitionable.md#rename)
- [session](FatFsDiskPartitionable.md#session)
- [setCP](FatFsDiskPartitionable.md#setcp)
- [setLabel](FatFsDiskPartitionable.md#setlabel)
- [stat](FatFsDiskPartitionable.md#stat)
- [unlink](FatFsDiskPartitionable.md#unlink)
- [unmount](FatFsDiskPartitionable.md#unmount)
- [utime](FatFsDiskPartitionable.md#utime)
- [writeFile](FatFsDiskPartitionable.md#writefile)
- [create](FatFsDiskPartitionable.md#create)

## Constructors

### constructor

• **new FatFsDiskPartitionable**(`context`, `exports`)

Private constructor. Use [create](FatFsDisk.md#create) with the `multiPartition` option set to true to create a [FatFsDiskPartitionable](FatFsDiskPartitionable.md).

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `FatFsMemoryContext` |
| `exports` | `FatFsExports` |

#### Overrides

[FatFsDisk](FatFsDisk.md).[constructor](FatFsDisk.md#constructor)

#### Defined in

[src/fatfs.ts:1279](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1279)

## Properties

### #context

• `Private` **#context**: `FatFsMemoryContext`

#### Inherited from

[FatFsDisk](FatFsDisk.md).[#context](FatFsDisk.md##context)

#### Defined in

[src/fatfs.ts:1273](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1273)

___

### #context

• `Private` **#context**: `FatFsMemoryContext`

#### Inherited from

FatFsDisk.#context

#### Defined in

[src/fatfs.ts:768](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L768)

___

### #exports

• `Private` **#exports**: `FatFsExports`

#### Inherited from

[FatFsDisk](FatFsDisk.md).[#exports](FatFsDisk.md##exports)

#### Defined in

[src/fatfs.ts:1274](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1274)

___

### #exports

• `Private` **#exports**: `FatFsExports`

#### Inherited from

FatFsDisk.#exports

#### Defined in

[src/fatfs.ts:769](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L769)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[chdir](FatFsDisk.md#chdir)

#### Defined in

[src/fatfs.ts:1150](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1150)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[chdrive](FatFsDisk.md#chdrive)

#### Defined in

[src/fatfs.ts:1165](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1165)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[chmod](FatFsDisk.md#chmod)

#### Defined in

[src/fatfs.ts:1085](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1085)

___

### fdisk

▸ **fdisk**(`ptbl`, `pdrv?`): `void`

The f_fdisk function divides a physical drive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ptbl` | `number`[] | List of partition size to create on the drive. |
| `pdrv?` | `number` | Specifies the physical drive to be divided. This is not the logical drive number but the drive identifier passed to the low level disk functions. |

#### Returns

`void`

#### Defined in

[src/fatfs.ts:1295](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1295)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[find](FatFsDisk.md#find)

#### Defined in

[src/fatfs.ts:1007](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1007)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[findFirst](FatFsDisk.md#findfirst)

#### Defined in

[src/fatfs.ts:982](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L982)

___

### getFree

▸ **getFree**(`path?`): [`number`, `FatFsObject`]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path?` | ``null`` \| `string` | Pointer to the null-terminated string that specifies the logical drive. A null-string means the default drive. |

#### Returns

[`number`, `FatFsObject`]

tuple with the number of free clusters, and a FATFS 
    object containing number of sectors per cluster.

#### Inherited from

[FatFsDisk](FatFsDisk.md).[getFree](FatFsDisk.md#getfree)

#### Defined in

[src/fatfs.ts:1198](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1198)

___

### getLabel

▸ **getLabel**(`path?`): [`string`, `number`]

The f_getlabel function returns volume label and volume serial number 
of a volume.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path?` | `string` | Pointer to the null-terminated string that specifies the logical drive. Null-string specifies the default drive. |

#### Returns

[`string`, `number`]

tuple containing the result, the volume label, and the volume 
    serial number

#### Inherited from

[FatFsDisk](FatFsDisk.md).[getLabel](FatFsDisk.md#getlabel)

#### Defined in

[src/fatfs.ts:1222](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1222)

___

### getcwd

▸ **getcwd**(): `string`

The f_getcwd function retrieves the current directory of the current 
drive.

#### Returns

`string`

The current directory.

#### Inherited from

[FatFsDisk](FatFsDisk.md).[getcwd](FatFsDisk.md#getcwd)

#### Defined in

[src/fatfs.ts:1180](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1180)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[mkdir](FatFsDisk.md#mkdir)

#### Defined in

[src/fatfs.ts:1134](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1134)

___

### mkfs

▸ **mkfs**(`opt?`): `void`

The f_mkfs function creates an FAT/exFAT volume on the logical drive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opt?` | ``null`` \| [`FatFsMkfsOptions`](../modules.md#fatfsmkfsoptions) | Format options |

#### Returns

`void`

OK or error code

#### Inherited from

[FatFsDisk](FatFsDisk.md).[mkfs](FatFsDisk.md#mkfs)

#### Defined in

[src/fatfs.ts:821](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L821)

___

### mount

▸ **mount**(`path?`, `opt?`): `FatFsObject`

The f_mount function gives work area to the FatFs module.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path?` | `string` | Pointer to the null-terminated string that specifies the logical drive. The string without drive number means the default drive. |
| `opt?` | `number` | Mounting option. 0: Do not mount now (to be mounted on the first access to the volume), 1: Force mounted the volume to check if it is ready to work. |

#### Returns

`FatFsObject`

reference to the mounted work area

#### Inherited from

[FatFsDisk](FatFsDisk.md).[mount](FatFsDisk.md#mount)

#### Defined in

[src/fatfs.ts:852](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L852)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[open](FatFsDisk.md#open)

#### Defined in

[src/fatfs.ts:898](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L898)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[openDir](FatFsDisk.md#opendir)

#### Defined in

[src/fatfs.ts:963](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L963)

___

### readFile

▸ **readFile**(`path`): `Uint8Array`

Read an entire file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the file to read |

#### Returns

`Uint8Array`

The contents of the file

#### Inherited from

[FatFsDisk](FatFsDisk.md).[readFile](FatFsDisk.md#readfile)

#### Defined in

[src/fatfs.ts:931](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L931)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[rename](FatFsDisk.md#rename)

#### Defined in

[src/fatfs.ts:1063](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1063)

___

### session

▸ **session**<`T`\>(`action`, `path?`): `ReturnType`<`T`\>

Mounts the filesystem, executes a user function, and unmounts

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends () => `any` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `action` | `T` | `undefined` | The action to perform |
| `path` | `string` | `''` | The logical drive. An empty string without drive number means the default drive. |

#### Returns

`ReturnType`<`T`\>

#### Inherited from

[FatFsDisk](FatFsDisk.md).[session](FatFsDisk.md#session)

#### Defined in

[src/fatfs.ts:917](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L917)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[setCP](FatFsDisk.md#setcp)

#### Defined in

[src/fatfs.ts:1258](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1258)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[setLabel](FatFsDisk.md#setlabel)

#### Defined in

[src/fatfs.ts:1244](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1244)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[stat](FatFsDisk.md#stat)

#### Defined in

[src/fatfs.ts:1024](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1024)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[unlink](FatFsDisk.md#unlink)

#### Defined in

[src/fatfs.ts:1042](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1042)

___

### unmount

▸ **unmount**(`path?`): `void`

Unregisters the filesystem object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path?` | `string` | Pointer to the null-terminated string that specifies the logical drive. The string without drive number means the default drive. |

#### Returns

`void`

#### Inherited from

[FatFsDisk](FatFsDisk.md).[unmount](FatFsDisk.md#unmount)

#### Defined in

[src/fatfs.ts:874](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L874)

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

#### Inherited from

[FatFsDisk](FatFsDisk.md).[utime](FatFsDisk.md#utime)

#### Defined in

[src/fatfs.ts:1104](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L1104)

___

### writeFile

▸ **writeFile**(`path`, `contents`): `void`

Write an entire file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the file to write |
| `contents` | `Uint8Array` | Contents to write to the file |

#### Returns

`void`

#### Inherited from

[FatFsDisk](FatFsDisk.md).[writeFile](FatFsDisk.md#writefile)

#### Defined in

[src/fatfs.ts:948](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L948)

___

### create

▸ `Static` **create**(`disk`, `options`): `Promise`<[`FatFsDiskPartitionable`](FatFsDiskPartitionable.md)\>

Create a new [FatFsDisk](FatFsDisk.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `disk` | `Uint8Array` | Array of bytes containing a FAT image (or anything if you would like to format) |
| `options` | [`FatFsDiskOptions`](../modules.md#fatfsdiskoptions) & { `multiPartition`: ``true``  } | Additional options. See [FatFsDiskOptions](../modules.md#fatfsdiskoptions) for more information. Will return a [FatFsDiskPartitionable](FatFsDiskPartitionable.md) if the `multiPartition` option is true. |

#### Returns

`Promise`<[`FatFsDiskPartitionable`](FatFsDiskPartitionable.md)\>

#### Inherited from

[FatFsDisk](FatFsDisk.md).[create](FatFsDisk.md#create)

#### Defined in

[src/fatfs.ts:777](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L777)

▸ `Static` **create**(`disk`, `options`): `Promise`<[`FatFsDisk`](FatFsDisk.md)\>

Create a new [FatFsDisk](FatFsDisk.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `disk` | `Uint8Array` | Array of bytes containing a FAT image (or anything if you would like to format) |
| `options` | [`FatFsDiskOptions`](../modules.md#fatfsdiskoptions) | Additional options. See [FatFsDiskOptions](../modules.md#fatfsdiskoptions) for more information. Will return a [FatFsDiskPartitionable](FatFsDiskPartitionable.md) if the `multiPartition` option is true. |

#### Returns

`Promise`<[`FatFsDisk`](FatFsDisk.md)\>

#### Inherited from

[FatFsDisk](FatFsDisk.md).[create](FatFsDisk.md#create)

#### Defined in

[src/fatfs.ts:785](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L785)

▸ `Static` **create**(`disk`): `Promise`<[`FatFsDisk`](FatFsDisk.md)\>

Create a new [FatFsDisk](FatFsDisk.md) with defaults

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `disk` | `Uint8Array` | Array of bytes containing a FAT image (or anything if you would like to format) |

#### Returns

`Promise`<[`FatFsDisk`](FatFsDisk.md)\>

#### Inherited from

[FatFsDisk](FatFsDisk.md).[create](FatFsDisk.md#create)

#### Defined in

[src/fatfs.ts:792](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L792)
