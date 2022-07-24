/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-02 19:03:43
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-28 10:25:59
 * @LastEditContent: 
 */
/**
 * 下载了vuejs/core的zip文件，如何运行并调试：
 * 0.进入到项目目录
 * 1.全局安装pnpm：npm install pnpm -g
 * 2.执行pnpm install
 * 3.执行git init，初始化git仓库。
 * 4.执行git add. -> git commit -m 'XXX'
 * 5.提交完成后执行：pnpm dev，会将packages中的代码打包，放到vue/dist/vue.global.js，进程将处于等待状态，以便更新源码后随时打包。
 * 6.然后在vue/example中创建自己的目录，
 * 		引入vue.global.js
 * 		并使用debugger;做调试。
 * 7.在源代码中调试。
 * 		在package.json中script -> dev后面加上'--sourcemap'，
 * 		重新执行pnpm dev，
 */
