[fatfs-wasm](../README.md) / [Exports](../modules.md) / FatFsDir

# Class: FatFsDir

FatFs Directory Reference

## Table of contents

### Constructors

- [constructor](FatFsDir.md#constructor)

### Properties

- [#context](FatFsDir.md##context)
- [#dirPtr](FatFsDir.md##dirptr)
- [#exports](FatFsDir.md##exports)

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

[src/fatfs.ts:665](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L665)

## Properties

### #context

• `Private` **#context**: `FatFsMemoryContext`

#### Defined in

[src/fatfs.ts:663](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L663)

___

### #dirPtr

• `Private` **#dirPtr**: `number`

#### Defined in

[src/fatfs.ts:661](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L661)

___

### #exports

• `Private` **#exports**: `FatFsExports`

#### Defined in

[src/fatfs.ts:662](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L662)

## Accessors

### dp

• `get` **dp**(): `number`

#### Returns

`number`

#### Defined in

[src/fatfs.ts:671](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L671)

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<[`FatFsFileInfo`](FatFsFileInfo.md), `any`, `undefined`\>

#### Returns

`Iterator`<[`FatFsFileInfo`](FatFsFileInfo.md), `any`, `undefined`\>

#### Defined in

[src/fatfs.ts:727](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L727)

___

### close

▸ **close**(): `void`

Closes the open directory.

#### Returns

`void`

#### Defined in

[src/fatfs.ts:678](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L678)

___

### findNext

▸ **findNext**(): [`FatFsFileInfo`](FatFsFileInfo.md)

The f_findnext function searches for a next matched object

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

#### Defined in

[src/fatfs.ts:715](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L715)

___

### read

▸ **read**(): [`FatFsFileInfo`](FatFsFileInfo.md)

Reads an item of the directory.

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

Information about the next directory entry

#### Defined in

[src/fatfs.ts:690](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L690)

___

### rewind

▸ **rewind**(): `void`

Rewinds the directory

#### Returns

`void`

#### Defined in

[src/fatfs.ts:705](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L705)
