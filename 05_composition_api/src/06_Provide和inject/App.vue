<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 10:29:23
 * @LastEditors: ZeTian
 * @LastEditTime: 2021-11-16 10:37:09
 * @LastEditContent: 
-->
<template>
  <div>
    <Home />
    <h2>App Counter: {{ counter }}</h2>
    <button @click="increment">App中的+1</button>
  </div>
</template>

<script>import { ref, provide, readonly } from "@vue/runtime-core"
import Home from "./Home.vue"

export default {
  components: {
    Home
  },
  setup() {
    const name = ref('zzt')
    let counter = ref(100)

    provide('name', readonly(name))
    provide('counter', readonly(counter))

    const increment = () => counter.value++

    return {
      increment,
      counter
    }
  }
}
</script>

<style scoped>
</style>