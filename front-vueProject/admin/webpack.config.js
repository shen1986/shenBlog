/*
 * @Description: webpack主要配置文件
 * @Author: shenxf
 * @Date: 2018-03-24 23:04:44
 */
var path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require("ts-import-plugin"); // 按需加载antd用
// 抽离css样式
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 用来压缩分离出来的css样式
let OptimizeCss =  require('optimize-css-assets-webpack-plugin');
// 用来压缩js
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 依赖关系可视化
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    optimization: {
        // 优化项
        minimizer: [
            new OptimizeCss(),
            new UglifyJsPlugin({
                cache: true, // 是否用缓存
                parallel: true, // 并发打包
                sourceMap: false, // es6 -> es5 转换时会用到
            }),
        ],
        //打包 公共文件
        splitChunks: {
            cacheGroups: {
                vendor:{//node_modules内的依赖库
                    chunks:"all",
                    test: /[\\/]node_modules[\\/]/,
                    name:"vendor",
                    minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority:100,
                    // enforce: true?
                },
                common: {// ‘src/js’ 下的js文件
                    chunks:"all",
                    test:/[\\/]src[\\/]js[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
                    name: "common", //生成文件名，依据output规则
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority:1
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/vue2/',
        filename: 'js/[name].js', // .[hash:8] 指定后 webpack-dev-server 就跑不起来了
        chunkFilename: "js/[name].chunk.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // 用来分析less用的。
                        less: 'vue-style-loader!css-loader!less-loader',
                    },
                    // other vue-loader options go here
                },
            },
            {
                test: /\.html$/, // 用来解析在html中的图片
                use: 'html-withimg-loader',
            },
            {
                test: /\.(png|jpg|gif)$/, // 用来解析图片
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1, // 200k大小限制
                        outputPath: '/img/', // 输出的路径
                    },
                },
            },
            {
                test: /\.(jsx|tsx|js|ts)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryName: 'ant-design-vue', // module 的路劲
                                libraryDirectory: 'es', // 引用那个版本有 lib es
                                style: 'css', // 是引用 .css文件呢 还是 （true）.less 这里引less会报错，不知道原因
                            }),
                        ],
                    }),
                    compilerOptions: {
                        module: 'es2015',
                    },
                    appendTsSuffixTo: [/\.vue$/],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 创建link标签
                    'css-loader',
                ],
            }, // 处理 CSS 文件的 loader
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader, // 创建link标签
                    'css-loader',
                    'less-loader',
                ],
            }, // 处理 less 文件的 loader
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]', // 图片的取名规则 名字后面加hash
                },
            },
        ],
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'), // 指定模板文件路径
            filename: 'index.html', // 设置生成的内存页面的名称
            favicon: './favicon.ico',
            minify: {
                // 配置Html压缩
                removeAttributeQuotes: true, // 删除html中的双引号
                collapseWhitespace: true, // 变成一行去除space
            },
            hash: true, //引用时加上hash挫
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css', // 抽离出来样式的名字
        }),
        new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        },
    },
    devServer: {
        historyApiFallback: true,
        noInfo: false, // 控制要不要显示信息到控制台
        port: 3000, // 指定服务运行的端口号
        progress: true, // 打开进度条
        contentBase: './dist', // 指定启动时参照的目录
        compress: true, // 指定进行压缩
    },
    performance: {
        hints: false,
    },
    // devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
    // module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            },
            cache: true, // 是否用缓存
            parallel: true, // 并发打包
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    ])
}