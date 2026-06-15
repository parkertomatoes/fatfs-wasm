[fatfs-wasm](../README.md) / [Exports](../modules.md) / FatFsError

# Class: FatFsError

Exception thrown when a FatFs export returns a non-OK result

## Hierarchy

- `Error`

  ↳ **`FatFsError`**

## Table of contents

### Constructors

- [constructor](FatFsError.md#constructor)

### Properties

- [cause](FatFsError.md#cause)
- [message](FatFsError.md#message)
- [name](FatFsError.md#name)
- [result](FatFsError.md#result)
- [stack](FatFsError.md#stack)

## Constructors

### constructor

• **new FatFsError**(`action`, `errorCode`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | `string` |
| `errorCode` | [`FatFsResult`](../enums/FatFsResult.md) |

#### Overrides

Error.constructor

#### Defined in

[src/fatfs.ts:517](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L517)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:24

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1067

___

### result

• **result**: [`FatFsResult`](../enums/FatFsResult.md)

#### Defined in

[src/fatfs.ts:516](https://github.com/parkertomatoes/fatfs-wasm/blob/a167afd/src/fatfs.ts#L516)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1069
