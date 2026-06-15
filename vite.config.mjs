// vite.config.ts
import { defineConfig } from 'vite'
import { copyFile, mkdir } from 'node:fs/promises'

const rebaseDist = (relPath) =>
  relPath.startsWith('../')
    ? relPath.substring(1)
    : relPath

const copyDistFiles = () => ({
  name: 'copy-dist-files',
  async writeBundle() {
    await mkdir('dist/src', { recursive: true })

    await Promise.all([
      copyFile('README.md', 'dist/README.md'),
      copyFile('package.dist.json', 'dist/package.json'),
      copyFile('src/fatfs.ts', 'dist/src/fatfs.ts'),
    ])
  },
})

export default defineConfig({
  base: './',

  plugins: [
    copyDistFiles(),
  ],

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'oxc',
    assetsInlineLimit: 0,

    rolldownOptions: {
      input: './src/fatfs.ts',
      preserveEntrySignatures: 'strict',
      checks: {
        emptyImportMeta: false,
      },

      external: [
        'node:path',
        'node:url',
        'node:fs/promises',
        'node:process',
      ],

      output: [
        {
          dir: './dist',
          entryFileNames: 'fatfs.min.mjs',
          assetFileNames: '[name][extname]',
          format: 'es',
          sourcemapPathTransform: rebaseDist,
        },
        {
          dir: './dist',
          entryFileNames: 'fatfs.min.js',
          assetFileNames: '[name][extname]',
          format: 'umd',
          name: 'fatfs-wasm',
          sourcemapPathTransform: rebaseDist,
        },
      ],
    },
  },
})
