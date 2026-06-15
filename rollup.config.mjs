import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const rebaseDist = relPath => relPath.startsWith('../')
    ? relPath.substring(1)
    : relPath;

const cleanDist = () => ({
    name: 'clean-dist',
    buildStart() {
        rmSync('./dist', { recursive: true, force: true });
    }
});

const copyDistFiles = () => ({
    name: 'copy-dist-files',
    writeBundle() {
        mkdirSync('./dist/src', { recursive: true });
        cpSync('./README.md', './dist/README.md');
        cpSync('./package.dist.json', './dist/package.json');
        cpSync('./src/fatfs.ts', './dist/src/fatfs.ts');
        cpSync('./src/ff.wasm', './dist/ff.wasm');
        cpSync('./src/ff_exfat.wasm', './dist/ff_exfat.wasm');
    }
});

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
        cleanDist(),
        typescript({
            rootDir: './src'
        }),
        terser({
            sourceMap: true
        }),
        copyDistFiles()
    ]
}]
