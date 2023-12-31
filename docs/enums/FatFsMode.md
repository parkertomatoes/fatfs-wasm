[fatfs-wasm](../README.md) / [Exports](../modules.md) / FatFsMode

# Enumeration: FatFsMode

File modes

## Table of contents

### Enumeration Members

- [CREATE\_ALWAYS](FatFsMode.md#create_always)
- [CREATE\_NEW](FatFsMode.md#create_new)
- [OPEN\_ALWAYS](FatFsMode.md#open_always)
- [OPEN\_APPEND](FatFsMode.md#open_append)
- [OPEN\_EXISTING](FatFsMode.md#open_existing)
- [READ](FatFsMode.md#read)
- [WRITE](FatFsMode.md#write)

## Enumeration Members

### CREATE\_ALWAYS

• **CREATE\_ALWAYS** = ``8``

Creates a new file. If the file is existing, it will be truncated and 
overwritten.

#### Defined in

src/fatfs.ts:82

___

### CREATE\_NEW

• **CREATE\_NEW** = ``4``

Creates a new file. The function fails with FR_EXIST if the file is 
existing.

#### Defined in

src/fatfs.ts:77

___

### OPEN\_ALWAYS

• **OPEN\_ALWAYS** = ``16``

Opens the file if it is existing. If not, a new file will be created.

#### Defined in

src/fatfs.ts:86

___

### OPEN\_APPEND

• **OPEN\_APPEND** = ``48``

Same as FA_OPEN_ALWAYS except the read/write pointer is set end of the 
file.

#### Defined in

src/fatfs.ts:91

___

### OPEN\_EXISTING

• **OPEN\_EXISTING** = ``0``

Opens a file. The function fails if the file is not existing. (Default)

#### Defined in

src/fatfs.ts:72

___

### READ

• **READ** = ``1``

Specifies read access to the file. Data can be read from the file.

#### Defined in

src/fatfs.ts:63

___

### WRITE

• **WRITE** = ``2``

Specifies write access to the file. Data can be written to the file. 
Combine with FA_READ for read-write access.

#### Defined in

src/fatfs.ts:68
