/*
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 11:08:50
 * @LastEditors: ZeTian
 * @LastEditTime: 2021-11-16 11:11:03
 * @LastEditContent:
 */
import { ref, computed } from 'vue'

export default function () {
  const counter = ref(0)
  const doubleCounter = computed(() => counter.value * 2)

  const increment = () => counter.value++
  const decrement = () => counter.value--

  return { counter, doubleCounter, increment, decrement }
}
