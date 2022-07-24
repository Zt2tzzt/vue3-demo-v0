/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-03-02 21:14:51
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-02 21:18:18
 * @LastEditContent: 
 */
module.exports = {
	// 最终会与脚手架中的配置合并
	configureWebpack: {
		devServer: {
			// 本身不需要配置，默认为true，在刷新时，会自动返回index.html的内容
			historyApiFallback: true
		}
	}
}