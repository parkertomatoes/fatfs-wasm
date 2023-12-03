[fatfs-wasm](../README.md) / [Exports](../modules.md) / FatFsDir

# Class: FatFsDir

FatFs Directory Reference

## Table of contents

### Constructors

- [constructor](FatFsDir.md#constructor)

### Accessors

- [dp](FatFsDir.md#dp)

### Methods

- [[iterator]](FatFsDir.md#[iterator])
- [close](FatFsDir.md#close)
- [findNext](FatFsDir.md#findnext)
- [read](FatFsDir.md#read)
- [rewind](FatFsDir.md#rewind)

## Constructors

### constructor

• **new FatFsDir**(`dirPtr`, `exports`, `context`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirPtr` | `number` |
| `exports` | `FatFsExports` |
| `context` | `FatFsMemoryContext` |

#### Defined in

src/fatfs.ts:610

## Accessors

### dp

• `get` **dp**(): `number`

#### Returns

`number`

#### Defined in

src/fatfs.ts:616

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<[`FatFsFileInfo`](FatFsFileInfo.md), `any`, `undefined`\>

#### Returns

`Iterator`<[`FatFsFileInfo`](FatFsFileInfo.md), `any`, `undefined`\>

#### Defined in

src/fatfs.ts:672

___

### close

▸ **close**(): `void`

Closes the open directory.

#### Returns

`void`

#### Defined in

src/fatfs.ts:623

___

### findNext

▸ **findNext**(): [`FatFsFileInfo`](FatFsFileInfo.md)

The f_findnext function searches for a next matched object

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

#### Defined in

src/fatfs.ts:660

___

### read

▸ **read**(): [`FatFsFileInfo`](FatFsFileInfo.md)

Reads an item of the directory.

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

Information about the next directory entry

#### Defined in

src/fatfs.ts:635

___

### rewind

▸ **rewind**(): `void`

Rewinds the directory

#### Returns

`void`

#### Defined in

src/fatfs.ts:650
