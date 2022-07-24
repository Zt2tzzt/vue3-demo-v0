/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-02 16:38:44
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-02 17:58:34
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
          /* {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugin: [
                  require('autoprefixer')
                ]
              }
            }
          }, */
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
      // 将两项匹配写在一起
      /* {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }, */
      {},
    ]
  }
}
