/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-20 20:52:50
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-21 00:40:23
 * @LastEditContent: 
 */
import dayjs from 'dayjs'
export default function (app) {
	app.directive('convert-time', {
		created(el, bindings) {
			bindings.formatString = bindings.value || 'YYYY-MM-DD HH:mm:ss'
		},
		mounted(el, bindings) {
			const textContent = el.textContent
			const timestamp = parseInt(textContent)
			const timestamp_ms = textContent.length === 10 ? timestamp * 1000 : timestamp
			el.textContent = dayjs(timestamp_ms).format(bindings.formatString)
		}
	})
}