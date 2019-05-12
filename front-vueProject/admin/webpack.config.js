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

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/vue/",
    filename: "build.js" // .[hash:8] 指定后 webpack-dev-server 就跑不起来了
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // 用来分析less用的。
            less: "vue-style-loader!css-loader!less-loader"
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "ant-design-vue", // module 的路劲
                libraryDirectory: "es", // 引用那个版本有 lib es
                style: "css" // 是引用 .css文件呢 还是 （true）.less 这里引less会报错，不知道原因
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          },
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }, // 处理 CSS 文件的 loader
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }, // 处理 less 文件的 loader
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]" // 图片的取名规则 名字后面加hash
        }
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./index.html"), // 指定模板文件路径
      filename: "index.html", // 设置生成的内存页面的名称
      favicon: "./favicon.ico",
      minify: {
        // 配置Html压缩
        removeAttributeQuotes: true, // 删除html中的双引号
        collapseWhitespace: true // 变成一行去除space
      },
      hash: true //引用时加上hash挫
    })
  ],
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false, // 控制要不要显示信息到控制台
    port: 3000, // 指定服务运行的端口号
    progress: true, // 打开进度条
    contentBase: "./dist", // 指定启动时参照的目录
    compress: true // 指定进行压缩
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}