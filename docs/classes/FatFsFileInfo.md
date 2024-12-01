[fatfs-wasm](../README.md) / [Exports](../modules.md) / FatFsFileInfo

# Class: FatFsFileInfo

Represents file information returned from [stat](FatFsDisk.md#stat) and iteration functions.

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

[src/fatfs.ts:367](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L367)

## Properties

### attrib

• `Readonly` **attrib**: `number`

#### Defined in

[src/fatfs.ts:364](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L364)

___

### date

• `Readonly` **date**: `Date`

#### Defined in

[src/fatfs.ts:363](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L363)

___

### name

• `Readonly` **name**: `string`

#### Defined in

[src/fatfs.ts:365](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L365)

___

### size

• `Readonly` **size**: `number`

#### Defined in

[src/fatfs.ts:362](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L362)

## Accessors

### isArchive

• `get` **isArchive**(): `boolean`

Whether or not the file or directory is archived

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:418](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L418)

___

### isDirectory

• `get` **isDirectory**(): `boolean`

Whether or not the filesystem object is a directory or not

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:408](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L408)

___

### isHidden

• `get` **isHidden**(): `boolean`

Whether or not the file or directory is hidden

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:413](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L413)

___

### isReadOnly

• `get` **isReadOnly**(): `boolean`

Whether or not the file or directory is read-only

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:403](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L403)

___

### isSystem

• `get` **isSystem**(): `boolean`

Whether or not the file or directory is a system file or directory

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:423](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L423)

## Methods

### fromFilInfo

▸ `Static` **fromFilInfo**(`data`): [`FatFsFileInfo`](FatFsFileInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

#### Defined in

[src/fatfs.ts:374](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L374)
