<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-12 16:29:01
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-19 18:21:55
 * @LastEditContent: 
-->
<template>
  <div>
    <button @click="increment">{{ counter }}</button>
  </div>
</template>

<script>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'
export default {
  setup() {
    const counter = ref(0)
    const increment = () => counter.value++

    onMounted(() => {
      console.log('App Mounted1')
    })
    onMounted(() => {
      console.log('App Mounted2')
    })
    onUpdated(() => {
      console.log('App onUpdated')
    })
    onUnmounted(() => {
      console.log('App onUnmounted')
    })
    return {
      counter, increment
    }
  }
}
</script>

<style scoped>
</style>