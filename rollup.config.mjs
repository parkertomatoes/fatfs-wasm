import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
export default [{
    /* Library */
    input: './src/fatfs.ts',
    output: [{
        file: './dist/fatfs.min.js',
        format: 'umd',
        name: 'fatfs-wasm',
        sourcemap: true
    }, {
        file: './dist/fatfs.min.mjs',
        format: 'es',
        name: 'fatfs-wasm',
        sourcemap: true
    }],
    external: ['node:path', 'node:url', 'node:fs/promises'],
    plugins: [
        typescript({
            rootDir: './src'
        }),
        terser({
            sourceMap: {
                includeSources: true, 
                url: 'inline'
            }
        }),
        copy({
            targets: [
                { src: './README.md', dest: 'dist' },
                { src: './src/ff_multi.wasm', dest: 'dist' },
                { src: './src/ff_single.wasm', dest: 'dist' },
                { src: './package.dist.json', dest: 'dist', rename: 'package.json' }
            ]
        })

    ]
}]
