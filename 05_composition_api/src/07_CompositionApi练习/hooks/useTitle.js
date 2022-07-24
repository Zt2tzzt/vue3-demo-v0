/*
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 11:25:09
 * @LastEditors: ZeTian
 * @LastEditTime: 2021-11-16 11:28:25
 * @LastEditContent:
 */
import { ref, watch } from 'vue'

export default function (title = '默认的title') {
  const titleRef = ref(title)

  watch(titleRef, (newValue) => {
    document.title = newValue
  }, { immediate: true })

  return titleRef
}
