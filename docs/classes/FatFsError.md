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
- [prepareStackTrace](FatFsError.md#preparestacktrace)
- [stackTraceLimit](FatFsError.md#stacktracelimit)

### Methods

- [captureStackTrace](FatFsError.md#capturestacktrace)

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

[src/fatfs.ts:429](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L429)

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

[src/fatfs.ts:428](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L428)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1069

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
