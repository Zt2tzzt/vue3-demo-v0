/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-02 16:38:44
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-07 16:54:27
 * @LastEditContent: 
 */
const path = require('path')

const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.comm.config')

module.exports = merge(commonConfig, {
  // 设置模式，开发，生产两个模式
  mode: 'production',
  // 设置source-map，建立JS映射文件，方便调试错误。
  devServer: {
    static: path.resolve(__dirname, '../public'),
    hot: true,
    // host: '0.0.0.0', // 修改服务器域名
    port: 7777,
    open: true, // 自动打开浏览器
    // 为解决开发阶段的跨域问题，使用prox进行配置
   /*  proxy: {
      "/api": {
        target: "http://localhost:8888",
        pathRewrite: {
          "^/api": ""
        },
        // 在非https的情况下，仍然代理
        secure: false,
        changeOrigin: true
      }
    }, */
    compress: true, // 是否开启gzip压缩
  },
})
