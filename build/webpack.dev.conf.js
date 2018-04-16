'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const chalk = require('chalk')
const ip = require('ip');

const HOST = ip.address()
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: true, usePostCSS: true})
    },
    devtool: "eval-source-map",
    mode: 'development',
    devServer: {
        contentBase: './dist',
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: HOST,
        port: PORT || 8080,
        open: false,
        overlay: {warnings: false, errors: true},
        publicPath: '/',
        proxy: {},
        quiet: true,
        watchOptions: {
            poll: false,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'development'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || 8080
    console.log('> Starting dev server...');
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            process.env.PORT = port
            devWebpackConfig.devServer.port = port
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [
                        chalk.gray('------------------------------------'),
                        '   Running: ' + chalk.magenta(`http://${HOST}:${port}`),
                        chalk.gray('------------------------------------')
                    ]
                },
                onErrors: utils.createNotifierCallback()
            }))

            resolve(devWebpackConfig)
        }
    })
})
