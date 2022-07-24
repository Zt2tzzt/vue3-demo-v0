<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 10:33:25
 * @LastEditors: ZeTian
 * @LastEditTime: 2021-11-16 10:36:24
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>{{ name }}</h2>
    <h2>{{ counter }}</h2>

    <button @click="homeIncrement">home+1</button>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    const name = inject('name')
    const counter = inject('counter')

    const homeIncrement = () => counter.value++

    return {
      name, counter, homeIncrement
    }
  }
}
</script>

<style scoped>
</style>