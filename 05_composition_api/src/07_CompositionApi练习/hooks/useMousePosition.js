/*
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 11:18:07
 * @LastEditors: ZeTian
 * @LastEditTime: 2021-11-16 11:20:00
 * @LastEditContent:
 */
import { ref } from 'vue'

export default function () {
  const mouseX = ref(0)
  const mouseY = ref(0)

  window.addEventListener('mousemove', event => {
    mouseX.value = event.pageX
    mouseY.value = event.pageY
  })

  return {
    mouseX, mouseY
  }

}