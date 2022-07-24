/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-10 16:51:35
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-10 16:51:35
 * @LastEditContent:
 */
import { customRef } from 'vue'

// 自定义ref
export default function (value, delay = 300) {
  let timer = null
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger()
        }, delay);
      }
    }
  })
}
