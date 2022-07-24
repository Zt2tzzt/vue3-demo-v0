/*
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 11:11:54
 * @LastEditors: ZeTian
 * @LastEditTime: 2021-11-16 13:27:57
 * @LastEditContent:
 */
import { ref, watch } from 'vue'

export default function (key, value) {
  const data = ref(value)

  if (value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    data.value = JSON.parse(window.localStorage.getItem(key))
  }

  watch(data, (newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue))
  })

  return data
}

// 一个参数：取值
// const data = useLocalStorage('name')

// 二个参数：保存值
// const data = useLocalStorage('name', 'zzt')

// data.value = 'Lingard'