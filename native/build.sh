mkdir -p obj
clang ./ff15/source/ff.c ./libc/string.c ./libc/walloc.c \
  -DFF_MULTI_PARTITION=1 `# build with multi-partition option` \
  --target=wasm32        `# use webassembly` \
  -nostdlib              `# don't include libc` \
  -I./libc               `# allow code to find libc substitute` \
  -Wl,--no-entry         `# no "main" function` \
  -Wl,--export-all       `# export all functions into wasm` \
  -Wl,--import-memory    `# let JS define memory` \
  -Os                    `# optimize for size` \
  -o ../src/ff_multi.wasm
clang ./ff15/source/ff.c ./libc/string.c ./libc/walloc.c \
  -DFF_MULTI_PARTITION=0 `# build without multi-partition option` \
  --target=wasm32        `# use webassembly` \
  -nostdlib              `# don't include libc` \
  -I./libc               `# allow code to find libc substitute` \
  -Wl,--no-entry         `# no "main" function` \
  -Wl,--export-all       `# export all functions into wasm` \
  -Wl,--import-memory    `# let JS define memory` \
  -Os                    `# optimize for size` \
  -o ../src/ff_single.wasm
