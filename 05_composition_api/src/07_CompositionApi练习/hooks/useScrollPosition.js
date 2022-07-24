/*
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 11:23:00
 * @LastEditors: ZeTian
 * @LastEditTime: 2021-11-16 13:29:46
 * @LastEditContent:
 */
import { ref } from 'vue'

export default function () {
  const scrollX = ref(0)
  const scrollY = ref(0)

  document.addEventListener('scroll', () => {
    scrollX.value = window.scrollX
    scrollY.value = window.scrollY
  })

  return {
    scrollX, scrollY
  }
}