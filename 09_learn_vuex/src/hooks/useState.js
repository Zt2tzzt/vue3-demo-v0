/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-28 21:02:13
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-01 22:11:12
 * @LastEditContent: 
 */
import useMapper from './useMapper'
import { mapState, createNamespacedHelpers } from 'vuex'

export default function(mapper, moduleName) {
	let mapperFn = mapState
	if (typeof moduleName === 'string' && moduleName.length > 0) {
		mapperFn = createNamespacedHelpers(moduleName).mapState
	}

	return useMapper(mapper, mapperFn)
}

