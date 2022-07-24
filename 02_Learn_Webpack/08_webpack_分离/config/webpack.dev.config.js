/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-02 16:38:44
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-07 16:55:21
 * @LastEditContent: 
 */
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.comm.config')

module.exports = merge(commonConfig, {
  // 设置模式，开发，生产两个模式
  mode: 'development',
  // 设置source-map，建立JS映射文件，方便调试错误。
  devtool: 'source-map',
  
})
