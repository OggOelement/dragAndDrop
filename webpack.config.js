const path = require('path');

module.exports = {
    entry: { 
        index : './src/index.ts'
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
    },
    resolve: {
        alias: {
            spine: path.resolve(__dirname , 'node_modules/pixi-spine/bin/pixi-spine.js'),
        },
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist'
    }
};