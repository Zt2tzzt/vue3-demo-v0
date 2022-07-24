/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-02 16:38:44
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-07 16:30:58
 * @LastEditContent: 
 */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 无需安装
const { DefinePlugin } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
  // 项目部署在那个环境下，web | node
  target: "web",
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: 'js/bundle.js'
  },
  resolve: {
    // 导入文件时，自动匹配扩展名
    extensions: [".js", ".json", ".mjs", ".vue", ".ts"],
    alias: {
      "js": path.resolve(__dirname, "../src/js")
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则表达式
        // loader: 'css-loader', // 一种语法糖
        use: [
          // { loader: 'css-loader' } // 完整写法
          'style-loader',
          'css-loader', // 省略写法
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // webpack5之后不推荐
      /* {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            // outputPath: 'img',
            name: 'img/[name]_[hash:6].[ext]'
          }
        }
      }, */
      // webpack5之后不推荐
      /* {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            // outputPath: 'img',
            name: 'img/[name]_[hash:6].[ext]',
            limit: 100 * 1024
          }b
        }
      }, */
      // webpack5之后，用 asset module type 来打包资源
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: 'asset',
        generator: {
          filename: "img/[name]_[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      },
      /* {
        test: /\.(eot|ttf|woff2?)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'font/[name]_[hash:6].[ext]'
          }
        }
      } */
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name]_[hash:6][ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
        // use: [
        //   loader: 'babel-loader',
        //   options: {
        //     /* plugins: [
        //       '@babel/plugin-transform-arrow-functions',
        //       '@babel/plugin-transform-block-scoping'
        //     ] */
        //     presets: [
        //       '@babel/preset-env'
        //     ]
        //   }
        // ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  plugins: [
    // 一个个的插件对象
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: '哈哈哈'
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false

    }),
    // 使用webpack-dev-server直接在内存中访问静态资源后，下方代码可注释
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: 'public',
    //       to: './',
    //       globOptions: {
    //         ignore: [
    //           '**/index.html'
    //         ]
    //       }
    //     }
    //   ]
    // }),
    new VueLoaderPlugin()
  ]
}
