<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-05 14:50:27
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-16 16:15:01
 * @LastEditContent: 
-->
<template>
  <div class="app">
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
    </div>
    <!-- type="transition" 意为已 transition 执行的时间为准, 也可以写 animation 等动画类型 -->
    <!-- :duration="1000", 意为动画持续时间1s, 也可写成对象形式 :duration={enter: 800, leave: 1000} -->
    <!-- mode="out-in", 意为两元素交替显示时, 第一个元素先消除, 第二个元素再插入 -->
    <!-- appear, 意为页面加载时, 即展示动画效果 -->
    <transition
      enter-active-class="animate__animated animate__backInUp"
      leave-active-class="animate__animated animate__backOutRight"
      mode="out-in"
      appear
    >
      <h2 class="title" v-if="isShow">Hello Frog</h2>
      <h2 class="title" v-else>你好啊,李银河</h2>
    </transition>

    <transition
      enter-active-class="animate__animated animate__backInUp"
      leave-active-class="animate__animated animate__backOutRight"
      mode="out-in"
      appear
    >
      <component :is="isShow ? 'home' : 'about'" />
    </transition>
  </div>
</template>

<script>
import Home from "./pages/Home.vue"
import About from "./pages/About.vue";
export default {
  name: "",
  data() {
    return {
      isShow: true
    };
  },
  components: { Home, About }
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
.animate__backOutRight {
  animation-direction: reverse;
}
</style>