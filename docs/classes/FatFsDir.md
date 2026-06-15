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

[src/fatfs.ts:713](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L713)

## Properties

### #context

• `Private` **#context**: `FatFsMemoryContext`

#### Defined in

[src/fatfs.ts:711](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L711)

___

### #dirPtr

• `Private` **#dirPtr**: `number`

#### Defined in

[src/fatfs.ts:709](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L709)

___

### #exports

• `Private` **#exports**: `FatFsExports`

#### Defined in

[src/fatfs.ts:710](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L710)

## Accessors

### dp

• `get` **dp**(): `number`

#### Returns

`number`

#### Defined in

[src/fatfs.ts:719](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L719)

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`\<[`FatFsFileInfo`](FatFsFileInfo.md), `any`, `undefined`\>

#### Returns

`Iterator`\<[`FatFsFileInfo`](FatFsFileInfo.md), `any`, `undefined`\>

#### Defined in

[src/fatfs.ts:775](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L775)

___

### close

▸ **close**(): `void`

Closes the open directory.

#### Returns

`void`

#### Defined in

[src/fatfs.ts:726](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L726)

___

### findNext

▸ **findNext**(): [`FatFsFileInfo`](FatFsFileInfo.md)

The f_findnext function searches for a next matched object

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

#### Defined in

[src/fatfs.ts:763](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L763)

___

### read

▸ **read**(): [`FatFsFileInfo`](FatFsFileInfo.md)

Reads an item of the directory.

#### Returns

[`FatFsFileInfo`](FatFsFileInfo.md)

Information about the next directory entry

#### Defined in

[src/fatfs.ts:738](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L738)

___

### rewind

▸ **rewind**(): `void`

Rewinds the directory

#### Returns

`void`

#### Defined in

[src/fatfs.ts:753](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L753)
