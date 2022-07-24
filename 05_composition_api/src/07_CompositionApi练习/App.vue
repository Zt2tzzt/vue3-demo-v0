<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 11:06:19
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-19 18:51:11
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>当前计数：{{ counter }}</h2>
    <h2>计数*2：{{ doubleCounter }}</h2>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>

    <h2>{{ data }}</h2>
    <button @click="changeData">修改data</button>

    <p class="content"></p>

    <div class="scroll">
      <div class="scroll-x">scrollX: {{ scrollX }}</div>
      <div class="scroll-y">scrollY: {{ scrollY }}</div>
    </div>
    <div class="mouse">
      <div class="mouse-x">mouseX:{{ mouseX }}</div>
      <div class="mouse-Y">mouseY:{{ mouseY }}</div>
    </div>
  </div>
</template>

<script>
import { } from 'vue'

import {
  useCounter,
  useTitle,
  useScrollPosition,
  useMousePosition,
  useLocalStorage
} from './hooks'

export default {
  setup() {
    // counter
    const { counter, doubleCounter, increment, decrement } = useCounter()
    // title
    const titleRef = useTitle('zzt')
    setTimeout(() => {
      titleRef.value = 'Lingard'
    }, 3000);

    // 滚动位置
    const { scrollX, scrollY } = useScrollPosition()

    // 鼠标位置
    const { mouseX, mouseY } = useMousePosition()

    const data = useLocalStorage('info')
    const changeData = () => data.value = '呵呵呵呵'

    return {
      counter,
      doubleCounter,
      increment,
      decrement,
      scrollX,
      scrollY,
      mouseX,
      mouseY,
      data,
      changeData
    }
  }
}
</script>

<style scoped>
.content {
  width: 3000px;
  height: 5000px;
}
.scroll {
  position: fixed;
  right: 30px;
  bottom: 30px;
}
.mouse {
  position: fixed;
  right: 30px;
  bottom: 80px;
}
</style>