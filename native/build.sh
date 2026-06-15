mkdir -p obj

clang ./ff16/source/ff.c ./libc/string.c ./libc/walloc.c ./ff16/source/ffunicode.c \
  -DFF_FS_EXFAT=0       `# FAT-only build` \
  -DFF_LBA64=0          `# MBR/SFD only` \
  --target=wasm32       `# use webassembly` \
  -nostdlib             `# don't include libc` \
  -I./libc              `# allow code to find libc substitute` \
  -Wl,--no-entry        `# no "main" function` \
  -Wl,--export-all      `# export all functions into wasm` \
  -Wl,--import-memory   `# let JS define memory` \
  -Os                   `# optimize for size` \
  -o ../src/ff.wasm

clang ./ff16/source/ff.c ./libc/string.c ./libc/walloc.c ./ff16/source/ffunicode.c \
  -DFF_FS_EXFAT=1       `# exFAT-capable build` \
  -DFF_LBA64=1          `# GPT/64-bit LBA capable build` \
  -DFF_MIN_GPT=0x8000   `# make GPT testable with normal in-memory disks` \
  --target=wasm32       `# use webassembly` \
  -nostdlib             `# don't include libc` \
  -I./libc              `# allow code to find libc substitute` \
  -Wl,--no-entry        `# no "main" function` \
  -Wl,--export-all      `# export all functions into wasm` \
  -Wl,--import-memory   `# let JS define memory` \
  -Os                   `# optimize for size` \
  -o ../src/ff_exfat.wasm