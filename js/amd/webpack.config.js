const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');


function getExtractTextPlugin(mode) {
    if (mode === 'development') {
        return new ExtractTextPlugin({
            filename: "index.css"
        });
    } else {
        return new ExtractTextPlugin({
            filename: "../dist/index.css"
        });
    }
}

module.exports = (env, options) => {
    const mode = env && env.mode || options.mode;
    const extractTextPlugin = getExtractTextPlugin(mode);

    let devServer, plugins = [];
    if (mode === 'development') {
        devServer = {
            contentBase: path.resolve(__dirname, 'dist'),
            port: 8000,
            historyApiFallback: true,
            hot: true
        }
        plugins.push(new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            inject: true
        }));
        plugins.push(new webpack.NamedModulesPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    return {
        mode: mode,
        devtool: 'cheap-module-source-map',
        entry: {
            'r': [
                __dirname + '/r.js',
            ]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loaders: ['babel-loader'],
                    exclude: /node_modules/
                }
            ]
        },
        devServer: devServer,
        plugins: [
            new CleanWebpackPlugin(['dist']),
            extractTextPlugin
        ].concat(plugins),
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'initial',
                        name: 'vendor',
                        test: 'vendor',
                        enforce: true
                    },
                }
            },
            // runtimeChunk: true
        },
        output: {
            path: path.resolve('dist'),
            filename: '[name].js',
        }
    }
}