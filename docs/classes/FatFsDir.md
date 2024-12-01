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

[src/fatfs.ts:679](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L679)

## Properties

### #context

• `Private` **#context**: `FatFsMemoryContext`

#### Defined in

[src/fatfs.ts:677](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L677)

___

### #dirPtr

• `Private` **#dirPtr**: `number`

#### Defined in

[src/fatfs.ts:675](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L675)

___

### #exports

• `Private` **#exports**: `FatFsExports`

#### Defined in

[src/fatfs.ts:676](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L676)

## Accessors

### dp

• `get` **dp**(): `number`

#### Returns

`number`

#### Defined in

[src/fatfs.ts:685](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L685)

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<[`FatFsFileInfo`](FatFsFileInfo.md), `any`, `undefined`\>

#### Returns

`Iterator`<[`FatFsFileInfo`](FatFsFileInfo.md), `any`, `undefined`\>

#### Defined in

[src/fatfs.ts:741](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L741)

___

### close

▸ **close**(): `void`

Closes the open directory.

#### Returns

`void`

#### Defined in

[src/fatfs.ts:692](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L692)

___

### findNext

▸ **findNext**(): [`FatFsFileInfo`](FatFsFileInfo.md)

The f_findnext function searches for a next matched object

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

#### Defined in

[src/fatfs.ts:729](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L729)

___

### read

▸ **read**(): [`FatFsFileInfo`](FatFsFileInfo.md)

Reads an item of the directory.

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

Information about the next directory entry

#### Defined in

[src/fatfs.ts:704](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L704)

___

### rewind

▸ **rewind**(): `void`

Rewinds the directory

#### Returns

`void`

#### Defined in

[src/fatfs.ts:719](https://github.com/parkertomatoes/fatfs-wasm/blob/b3504de/src/fatfs.ts#L719)
