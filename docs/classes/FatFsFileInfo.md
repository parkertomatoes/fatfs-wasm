[fatfs-wasm](../README.md) / [Exports](../modules.md) / FatFsFileInfo

# Class: FatFsFileInfo

Represents file or directory information returned from [stat](FatFsDisk.md#stat) and iteration functions.

## Table of contents

### Constructors

- [constructor](FatFsFileInfo.md#constructor)

### Properties

- [attrib](FatFsFileInfo.md#attrib)
- [date](FatFsFileInfo.md#date)
- [name](FatFsFileInfo.md#name)
- [size](FatFsFileInfo.md#size)

### Accessors

- [isArchive](FatFsFileInfo.md#isarchive)
- [isDirectory](FatFsFileInfo.md#isdirectory)
- [isHidden](FatFsFileInfo.md#ishidden)
- [isReadOnly](FatFsFileInfo.md#isreadonly)
- [isSystem](FatFsFileInfo.md#issystem)

### Methods

- [fromFilInfo](FatFsFileInfo.md#fromfilinfo)

## Constructors

### constructor

• **new FatFsFileInfo**(`size`, `date`, `attrib`, `name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `date` | `Date` |
| `attrib` | `number` |
| `name` | `string` |

#### Defined in

[src/fatfs.ts:377](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L377)

## Properties

### attrib

• `Readonly` **attrib**: `number`

File attribute flags (see is* methods to get specific flags)

#### Defined in

[src/fatfs.ts:373](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L373)

___

### date

• `Readonly` **date**: `Date`

The last modified date of the file or directory

#### Defined in

[src/fatfs.ts:371](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L371)

___

### name

• `Readonly` **name**: `string`

The name of the file or directory

#### Defined in

[src/fatfs.ts:375](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L375)

___

### size

• `Readonly` **size**: `number`

The size of the file or directory

#### Defined in

[src/fatfs.ts:369](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L369)

## Accessors

### isArchive

• `get` **isArchive**(): `boolean`

Whether or not the file or directory is archived

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:432](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L432)

___

### isDirectory

• `get` **isDirectory**(): `boolean`

Whether or not the filesystem object is a directory or not

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:422](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L422)

___

### isHidden

• `get` **isHidden**(): `boolean`

Whether or not the file or directory is hidden

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:427](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L427)

___

### isReadOnly

• `get` **isReadOnly**(): `boolean`

Whether or not the file or directory is read-only

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:417](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L417)

___

### isSystem

• `get` **isSystem**(): `boolean`

Whether or not the file or directory is a system file or directory

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:437](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L437)

## Methods

### fromFilInfo

▸ `Static` **fromFilInfo**(`data`): [`FatFsFileInfo`](FatFsFileInfo.md)

Creates a [FatFsFileInfo](FatFsFileInfo.md) from a packed FILINFO data structure returned from a FatFS function

**`Data`**

Packed FILINFO structure bytes

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

#### Defined in

[src/fatfs.ts:388](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L388)
