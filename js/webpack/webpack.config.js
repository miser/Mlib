const webpack = require('webpack');
const path = require('path');
var TestPlugin1 = require('./test-plugin1');
var TestPlugin2 = require('./test-plugin2');

module.exports = {
    mode: 'production',
    entry: {
        // 'test': [
        //     __dirname + '/test1.js',
        //     __dirname + '/test2.js',
        // ],
        // 'test1': [
        //     __dirname + '/test1.js',
        // ],
        'test2': [
            __dirname + '/test2.js',
        ],
    },
    module: {
        // rules: [{
        //     test: /\.js$/,
        //     loader: path.resolve(__dirname, 'test-loader.js'),
        // }],
    },
    plugins: [
        new TestPlugin1('test plugins')
        // new webpack.BannerPlugin('test info')
    ],
    output: {
        path: __dirname + '/lib',
        filename: '[name].bundle.js',
    }
}