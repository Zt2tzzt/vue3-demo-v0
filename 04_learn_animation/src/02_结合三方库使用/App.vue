<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-07 16:36:32
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-17 18:29:17
 * @LastEditContent: 
-->
<template>
  <div class="app">
    <input type="number" step="100" v-model="counter" />
    <h2>当前计数： {{ showCounter }}</h2>
  </div>
</template>

<script>
import gsap from 'gsap'//
export default {
  name: "",
  data() {
    return {
      counter: 0,
      Number: 0
    };
  },
  computed: {
    showCounter() {
      return this.Number.toFixed(0)
    }
  },
  watch: {
    counter(newValue) {
      gsap.to(this, {
        duration: 1,
        Number: newValue // 给showNumber赋值
      })
    }
  }
}
</script>

<style scoped>
.div {
  background-color: #fff;
}
</style>