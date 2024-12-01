[fatfs-wasm](../README.md) / [Exports](../modules.md) / FatFsFile

# Class: FatFsFile

FatFs file object

## Table of contents

### Constructors

- [constructor](FatFsFile.md#constructor)

### Properties

- [#context](FatFsFile.md##context)
- [#exports](FatFsFile.md##exports)
- [#filePtr](FatFsFile.md##fileptr)

### Accessors

- [fp](FatFsFile.md#fp)

### Methods

- [close](FatFsFile.md#close)
- [eof](FatFsFile.md#eof)
- [error](FatFsFile.md#error)
- [expand](FatFsFile.md#expand)
- [gets](FatFsFile.md#gets)
- [lseek](FatFsFile.md#lseek)
- [putc](FatFsFile.md#putc)
- [puts](FatFsFile.md#puts)
- [read](FatFsFile.md#read)
- [rewind](FatFsFile.md#rewind)
- [size](FatFsFile.md#size)
- [sync](FatFsFile.md#sync)
- [tell](FatFsFile.md#tell)
- [truncate](FatFsFile.md#truncate)
- [write](FatFsFile.md#write)

## Constructors

### constructor

• **new FatFsFile**(`filePtr`, `exports`, `context`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePtr` | `number` |
| `exports` | `FatFsExports` |
| `context` | `FatFsMemoryContext` |

#### Defined in

[src/fatfs.ts:445](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L445)

## Properties

### #context

• `Private` **#context**: `FatFsMemoryContext`

#### Defined in

[src/fatfs.ts:443](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L443)

___

### #exports

• `Private` **#exports**: `FatFsExports`

#### Defined in

[src/fatfs.ts:442](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L442)

___

### #filePtr

• `Private` **#filePtr**: `number`

#### Defined in

[src/fatfs.ts:441](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L441)

## Accessors

### fp

• `get` **fp**(): `number`

Low level pointer to the file descriptor

#### Returns

`number`

#### Defined in

[src/fatfs.ts:458](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L458)

## Methods

### close

▸ **close**(): `void`

The f_close function closes an open file and destroys the file object.

#### Returns

`void`

#### Defined in

[src/fatfs.ts:510](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L510)

___

### eof

▸ **eof**(`fp`): `number`

The f_eof function tests for end-of-file on a file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fp` | [`FatFsFile`](FatFsFile.md) |

#### Returns

`number`

The f_eof function returns a non-zero value 
    if the read/write pointer has reached end of the file; otherwise it
    returns a zero.

#### Defined in

[src/fatfs.ts:634](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L634)

___

### error

▸ **error**(`fp`): `number`

The f_error tests for an error on a file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fp` | [`FatFsFile`](FatFsFile.md) |

#### Returns

`number`

Returns a non-zero value if a hard error has occured; 
    otherwise it returns a zero.

#### Defined in

[src/fatfs.ts:651](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L651)

___

### expand

▸ **expand**(`fsz`, `opt`): `void`

The f_expand function prepares or allocates a contiguous data area to 
the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fsz` | `number` | Number of bytes in size to prepare or allocate for the file. The data type FSIZE_t is an alias of either DWORD(32-bit) or QWORD(64-bit) depends on the configuration option FF_FS_EXFAT. |
| `opt` | `number` | Allocation mode. Prepare to allocate (0) or Allocate now (1). |

#### Returns

`void`

#### Defined in

[src/fatfs.ts:569](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L569)

___

### gets

▸ **gets**(`maxSize`): `string`

The f_gets reads a string from the file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxSize` | `number` |

#### Returns

`string`

the string

#### Defined in

[src/fatfs.ts:580](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L580)

___

### lseek

▸ **lseek**(`ofs`): `void`

The f_lseek function moves the file read/write pointer of an open file 
object. It can also be used to expand the file size 
(cluster pre-allocation).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ofs` | `number` | Byte offset from top of the file to set read/write pointer. The data type FSIZE_t is an alias of either DWORD(32-bit) or QWORD(64-bit) depends on the configuration option FF_FS_EXFAT. |

#### Returns

`void`

#### Defined in

[src/fatfs.ts:539](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L539)

___

### putc

▸ **putc**(`chr`): `number`

The f_putc function puts a character to the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chr` | `number` | A code unit to write. |

#### Returns

`number`

When the character was written successfuly, it returns number 
    of character encoding units written to the file. When the function 
    failed due to disk full or any error, a negative value will be returned.

#### Defined in

[src/fatfs.ts:598](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L598)

___

### puts

▸ **puts**(`str`): `number`

The f_puts function writes a string to the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | Pointer to the null terminated string to be written. The terminator character will not be written. |

#### Returns

`number`

When the string was written successfuly, it returns number 
    of character encoding units written to the file. When the function 
    failed due to disk full or any error, a negative value will be 
    returned.

#### Defined in

[src/fatfs.ts:612](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L612)

___

### read

▸ **read**(`buff`, `btr?`): `number`

The f_read function reads data from a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buff` | `Uint8Array` | Pointer to the buffer to store the read data. |
| `btr?` | `number` | Number of bytes to read in range of UINT type. If the file needs to be read fast, it should be read in large chunk as possible. |

#### Returns

`number`

number of bytes read

#### Defined in

[src/fatfs.ts:468](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L468)

___

### rewind

▸ **rewind**(): `void`

#### Returns

`void`

#### Defined in

[src/fatfs.ts:546](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L546)

___

### size

▸ **size**(): `number`

The f_size function gets the size of a file.

#### Returns

`number`

Returns the size of the file in unit of byte.

#### Defined in

[src/fatfs.ts:642](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L642)

___

### sync

▸ **sync**(): `void`

The f_sync function flushes the cached information of a writing file.

#### Returns

`void`

#### Defined in

[src/fatfs.ts:524](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L524)

___

### tell

▸ **tell**(): `number`

The f_tell function gets the current read/write pointer of a file.

#### Returns

`number`

Returns current read/write pointer of the file.

#### Defined in

[src/fatfs.ts:624](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L624)

___

### truncate

▸ **truncate**(): `void`

The f_truncate function truncates the file size to the current file 
read/write pointer.

#### Returns

`void`

#### Defined in

[src/fatfs.ts:554](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L554)

___

### write

▸ **write**(`buff`, `btw?`): `number`

The f_write writes data to a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buff` | `Uint8Array` | Pointer to the data to be written. |
| `btw?` | `number` | Specifies number of bytes to write in range of UINT type. If the data needs to be written fast, it should be written in large chunk as possible. |

#### Returns

`number`

number of bytes written

#### Defined in

[src/fatfs.ts:493](https://github.com/parkertomatoes/fatfs-wasm/blob/fa8ebf7/src/fatfs.ts#L493)
