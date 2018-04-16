const path = require('path')
const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.conf')


module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: utils.entries(),
    output: {
        path: utils.resolve('dist'),
        filename: 'static/js/[name].js?v=[hash:4]',
        chunkFilename: 'static/js/[name].js?v=[hash:4]'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': utils.resolve('src'),
            'components': utils.resolve('components'),
            'assets': utils.resolve('src/assets'),
            'static': utils.resolve('static'),
            'filter': utils.resolve('src/filter'),
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: utils.resolve('static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
    ].concat(utils.htmlPlugin()),
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [utils.resolve('src'), utils.resolve('test'), utils.resolve('node_modules/webpack-dev-server/client'), utils.resolve('node_modules/vue-echarts-v3/src')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: utils.assetsPath('static/img/[name].[ext]?v=[hash:4]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: utils.assetsPath('static/media/[name].[ext]?v=[hash:4]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: utils.assetsPath('static/fonts/[name].[ext]?v=[hash:4]')
                }
            },
        ]
    },
    externals: {
        AMap: 'window.AMap'
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}