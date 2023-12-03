[fatfs-wasm](../README.md) / [Exports](../modules.md) / FatFsFileInfo

# Class: FatFsFileInfo

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

src/fatfs.ts:333

## Properties

### attrib

• `Readonly` **attrib**: `number`

#### Defined in

src/fatfs.ts:330

___

### date

• `Readonly` **date**: `Date`

#### Defined in

src/fatfs.ts:329

___

### name

• `Readonly` **name**: `string`

#### Defined in

src/fatfs.ts:331

___

### size

• `Readonly` **size**: `number`

#### Defined in

src/fatfs.ts:328

## Accessors

### isArchive

• `get` **isArchive**(): `boolean`

#### Returns

`boolean`

#### Defined in

src/fatfs.ts:369

___

### isDirectory

• `get` **isDirectory**(): `boolean`

#### Returns

`boolean`

#### Defined in

src/fatfs.ts:367

___

### isHidden

• `get` **isHidden**(): `boolean`

#### Returns

`boolean`

#### Defined in

src/fatfs.ts:368

___

### isReadOnly

• `get` **isReadOnly**(): `boolean`

#### Returns

`boolean`

#### Defined in

src/fatfs.ts:366

___

### isSystem

• `get` **isSystem**(): `boolean`

#### Returns

`boolean`

#### Defined in

src/fatfs.ts:370

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

src/fatfs.ts:340
