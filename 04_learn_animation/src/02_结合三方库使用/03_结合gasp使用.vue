<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-05 14:50:27
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-07 20:10:45
 * @LastEditContent: 
-->
<template>
  <div class="app">
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
    </div>

    <!-- :css="false", 意为不检测添加的css代码 -->
    <transition @enter="enter" @leave="leave" :css="false">
      <h2 class="title" v-if="isShow">Hello Frog</h2>
    </transition>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  name: "",
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    enter(ele, done) {
      console.log('enter')
      // gsap.to(target, {})
      gsap.from(ele, {
        scale: 0,
        x: 200,
        onComplete: done
      })
    },
    leave(ele, done) {
      console.log('leave')
      gsap.to(ele, {
        scale: 0,
        x: 200,
        onComplete: done
      })
    }
  }
}
</script>

<style scoped>
.app {
  width: 200px;
  margin: 0 auto;
}

.title {
  display: inline-block;
}
</style>