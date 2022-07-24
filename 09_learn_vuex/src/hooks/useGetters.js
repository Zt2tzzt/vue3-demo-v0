/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-28 23:13:54
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-28 23:13:54
 * @LastEditContent: 
 */
import useMapper from './useMapper'
import { mapGetters } from 'vuex'

export default function(mapper) {

	return useMapper(mapper, mapGetters)
}
