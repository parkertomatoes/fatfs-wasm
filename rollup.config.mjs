import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import { importMetaAssets } from "@web/rollup-plugin-import-meta-assets";

const rebaseDist = relPath => relPath.startsWith('../')
    ? relPath.substring(1)
    : relPath;

export default [{
    /* Library */
    input: './src/fatfs.ts',
    output: [{
        file: './dist/fatfs.min.js',
        format: 'umd',
        name: 'fatfs-wasm',
        sourcemap: true,
        sourcemapPathTransform: rebaseDist
    }, {
        file: './dist/fatfs.min.mjs',
        format: 'es',
        name: 'fatfs-wasm',
        sourcemap: true,
        sourcemapPathTransform: rebaseDist
    }],
    external: ['node:path', 'node:url', 'node:fs/promises'],
    plugins: [
        typescript({
            rootDir: './src'
        }),
        terser({
            sourceMap: true
        }),
        importMetaAssets(),
        copy({
            targets: [
                { src: './README.md', dest: 'dist' },
                { src: './package.dist.json', dest: 'dist', rename: 'package.json' },
                { src: './src/fatfs.ts', dest: 'dist/src' }
            ]
        })
    ]
}]
