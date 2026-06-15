[fatfs-wasm](../README.md) / [Exports](../modules.md) / FatFsDisk

# Class: FatFsDisk

Represents a FAT filesystem over an array of bytes

## Table of contents

### Constructors

- [constructor](FatFsDisk.md#constructor)

### Properties

- [#context](FatFsDisk.md##context)
- [#exports](FatFsDisk.md##exports)

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
- [readFile](FatFsDisk.md#readfile)
- [rename](FatFsDisk.md#rename)
- [session](FatFsDisk.md#session)
- [setLabel](FatFsDisk.md#setlabel)
- [stat](FatFsDisk.md#stat)
- [unlink](FatFsDisk.md#unlink)
- [unmount](FatFsDisk.md#unmount)
- [utime](FatFsDisk.md#utime)
- [writeFile](FatFsDisk.md#writefile)
- [create](FatFsDisk.md#create)

## Constructors

### constructor

• **new FatFsDisk**(`context`, `exports`)

Private constructor. Use [create](FatFsDisk.md#create) to create a [FatFsDisk](FatFsDisk.md) object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `FatFsMemoryContext` |
| `exports` | `FatFsExports` |

#### Defined in

[src/fatfs.ts:845](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L845)

## Properties

### #context

• `Private` **#context**: `FatFsMemoryContext`

#### Defined in

[src/fatfs.ts:802](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L802)

___

### #exports

• `Private` **#exports**: `FatFsExports`

#### Defined in

[src/fatfs.ts:803](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L803)

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

[src/fatfs.ts:1193](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1193)

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

[src/fatfs.ts:1208](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1208)

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

[src/fatfs.ts:1128](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1128)

___

### fdisk

▸ **fdisk**(`ptbl`): `void`

The f_fdisk function divides the in-memory physical drive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ptbl` | `number`[] | List of partition size to create on the drive. |

#### Returns

`void`

#### Defined in

[src/fatfs.ts:1301](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1301)

___

### find

▸ **find**(`path`, `pattern`): `IterableIterator`\<[`FatFsFileInfo`](FatFsFileInfo.md)\>

Searches a directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The directory name to be opened. |
| `pattern` | `string` | The pattern to search for |

#### Returns

`IterableIterator`\<[`FatFsFileInfo`](FatFsFileInfo.md)\>

An iterator to the search results

#### Defined in

[src/fatfs.ts:1050](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1050)

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

[src/fatfs.ts:1025](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1025)

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

#### Defined in

[src/fatfs.ts:1241](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1241)

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

#### Defined in

[src/fatfs.ts:1265](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1265)

___

### getcwd

▸ **getcwd**(): `string`

The f_getcwd function retrieves the current directory of the current 
drive.

#### Returns

`string`

The current directory.

#### Defined in

[src/fatfs.ts:1223](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1223)

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

[src/fatfs.ts:1177](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1177)

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

#### Defined in

[src/fatfs.ts:858](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L858)

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

#### Defined in

[src/fatfs.ts:895](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L895)

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

[src/fatfs.ts:941](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L941)

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

[src/fatfs.ts:1006](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1006)

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

#### Defined in

[src/fatfs.ts:974](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L974)

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

[src/fatfs.ts:1106](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1106)

___

### session

▸ **session**\<`T`\>(`action`, `path?`): `ReturnType`\<`T`\>

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

`ReturnType`\<`T`\>

#### Defined in

[src/fatfs.ts:960](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L960)

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

[src/fatfs.ts:1287](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1287)

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

[src/fatfs.ts:1067](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1067)

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

[src/fatfs.ts:1085](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1085)

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

#### Defined in

[src/fatfs.ts:917](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L917)

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

[src/fatfs.ts:1147](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L1147)

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

#### Defined in

[src/fatfs.ts:991](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L991)

___

### create

▸ `Static` **create**(`disk`, `options`): `Promise`\<[`FatFsDisk`](FatFsDisk.md)\>

Create a new [FatFsDisk](FatFsDisk.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `disk` | `Uint8Array` | Array of bytes containing a FAT image (or anything if you would like to format) |
| `options` | [`FatFsDiskOptions`](../modules.md#fatfsdiskoptions) | Additional options. See [FatFsDiskOptions](../modules.md#fatfsdiskoptions) for more information. |

#### Returns

`Promise`\<[`FatFsDisk`](FatFsDisk.md)\>

#### Defined in

[src/fatfs.ts:811](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L811)

▸ `Static` **create**(`disk`): `Promise`\<[`FatFsDisk`](FatFsDisk.md)\>

Create a new [FatFsDisk](FatFsDisk.md) with defaults

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `disk` | `Uint8Array` | Array of bytes containing a FAT image (or anything if you would like to format) |

#### Returns

`Promise`\<[`FatFsDisk`](FatFsDisk.md)\>

#### Defined in

[src/fatfs.ts:818](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L818)
