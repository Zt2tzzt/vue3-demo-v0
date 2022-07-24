/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-02 16:38:44
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-04 15:23:17
 * @LastEditContent: 
 */
const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: 'bundle.js'
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
      }
    ]
  }
}
