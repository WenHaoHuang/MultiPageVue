const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: "source-map",
    module: {
        rules: utils.styleLoaders({
            sourceMap: true,
            extract: true,
            usePostCSS: true
        })
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: 'commons'
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        },
        occurrenceOrder: true,
        runtimeChunk: {
            name: "manifest"
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: utils.resolve('')
        }),
        new webpack.DefinePlugin({
            'process.env': "'production'"
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {safe: true, map: {inline: false}}
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
})


module.exports = webpackConfig