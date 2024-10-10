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
        typescript(),
        terser({
            sourceMap: {
                includeSources: true, 
                url: 'inline'
            }
        }),
        copy({
            targets: [
                { src: './src/ff.wasm', dest: 'dist' },
                { src: './package.dist.json', dest: 'dist', rename: 'package.json' }
            ]
        })

    ]
}]
