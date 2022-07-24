/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-02 16:38:44
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-02 16:41:37
 * @LastEditContent: 
 */
const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, "./bulid"),
    filename: 'bundle.js'
  }
}
