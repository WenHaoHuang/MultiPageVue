const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PAGE_PATH = path.resolve(__dirname, '../src/pages')

exports.resolve = (dir) => {
    return path.join(__dirname, '../', dir)
}
exports.assetsPath = function (_path) {
    const assetsSubDirectory = ''

    return path.posix.join(assetsSubDirectory, _path)
}
exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: true,
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        sass: generateLoaders('sass', {indentedSyntax: true}),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}
// 多入口配置
exports.entries = () => {

    const entryFiles = glob.sync(PAGE_PATH + '/!(_**)/main.js')
    const map = {}
    entryFiles.forEach((filePath) => {
        const pathArr = filePath.split('\/')
        const pathName = pathArr[pathArr.length - 2]
        map[pathName] = filePath
    })
    return map;
}
// 多页面输出配置
exports.htmlPlugin = () => {
    const entryFiles = glob.sync(PAGE_PATH + '/!(_**)/main.js')
    const arr = []
    entryFiles.forEach((filePath) => {
        const pathArr = filePath.split('\/')
        const pathName = pathArr[pathArr.length - 2]
        let conf = {
            template: './src/index.template.html',
            filename: pathName + '.html',
            chunks: ['commons', pathName],
            inject: true,
            publicPath: '/' + pathName + '/',
            path: path.resolve(__dirname, '../dist'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr;
}
