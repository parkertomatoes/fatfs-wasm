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

[src/fatfs.ts:450](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L450)

## Properties

### attrib

• `Readonly` **attrib**: `number`

File attribute flags (see is* methods to get specific flags)

#### Defined in

[src/fatfs.ts:446](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L446)

___

### date

• `Readonly` **date**: `Date`

The last modified date of the file or directory

#### Defined in

[src/fatfs.ts:444](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L444)

___

### name

• `Readonly` **name**: `string`

The name of the file or directory

#### Defined in

[src/fatfs.ts:448](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L448)

___

### size

• `Readonly` **size**: `number`

The size of the file or directory

#### Defined in

[src/fatfs.ts:442](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L442)

## Accessors

### isArchive

• `get` **isArchive**(): `boolean`

Whether or not the file or directory is archived

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:506](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L506)

___

### isDirectory

• `get` **isDirectory**(): `boolean`

Whether or not the filesystem object is a directory or not

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:496](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L496)

___

### isHidden

• `get` **isHidden**(): `boolean`

Whether or not the file or directory is hidden

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:501](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L501)

___

### isReadOnly

• `get` **isReadOnly**(): `boolean`

Whether or not the file or directory is read-only

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:491](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L491)

___

### isSystem

• `get` **isSystem**(): `boolean`

Whether or not the file or directory is a system file or directory

#### Returns

`boolean`

#### Defined in

[src/fatfs.ts:511](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L511)

## Methods

### fromFilInfo

▸ `Static` **fromFilInfo**(`data`, `layout`): [`FatFsFileInfo`](FatFsFileInfo.md)

Creates a [FatFsFileInfo](FatFsFileInfo.md) from a packed FILINFO data structure returned from a FatFS function

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `layout` | `NativeLayout` |

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

**`Data`**

Packed FILINFO structure bytes

#### Defined in

[src/fatfs.ts:461](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L461)
