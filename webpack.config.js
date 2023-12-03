const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/fatfs.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'fatfs.js',
        library: {
            name: 'fatfs-wasm',
            type: 'umd'
        },
        globalObject: 'this',
        publicPath: ''
    },
    module: {
        rules: [{
            test: /\.wasm$/i,
            type: 'asset/resource'
        }, {
            test: /\.ts$/i,
            use: { loader: 'ts-loader?configFile=webpack.tsconfig.json' }
        }]
    },
    optimization: {
        minimize: true
    },
    externalsType: 'commonjs',
    externals: {
        'fs/promises': 'fs/promises',
        'path': 'path'
    },
    resolve: {
        fallback: {
          fs: false,
          path: false,
        },
    },
    plugins: [],
    node: {
        __dirname: false
    }
}