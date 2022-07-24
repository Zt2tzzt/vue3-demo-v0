/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-28 23:09:06
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-28 23:14:54
 * @LastEditContent: 
 */
import { computed } from 'vue'
import { useStore } from 'vuex'

/**
 * @param {Array} mapper state名称字符串数组
 * @param {Fuction} mapFn 要使用的map函数。
 * @return {Array} state名称对应的 ref Object 数组
 */
export default function (mapper, mapFn) {
	const objFns = mapFn(mapper)
	const store = useStore()
	const res = []
	Reflect.ownKeys(objFns).forEach(fnKey => {
		const fn = objFns[fnKey].bind({ $store: store })
		res[fnKey] = computed(fn)
	})

	return res
}