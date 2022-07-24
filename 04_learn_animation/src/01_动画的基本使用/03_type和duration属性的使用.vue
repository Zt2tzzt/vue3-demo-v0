<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-05 14:50:27
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-05 16:16:57
 * @LastEditContent: 
-->
<template>
  <div class="app">
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
    </div>
    <!-- type="transition" 意为已 transition 执行的时间为准, 也可以写 animation 等动画类型 -->
    <!-- :duration="1000", 意为动画持续时间1s, 也可写成对象形式 :duration={enter: 800, leave: 1000} -->
    <transition name="zzt" type="animation" :duration="1000">
      <h2 class="title" v-if="isShow">Hello Frog</h2>
    </transition>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isShow: true
    }
  },
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
.zzt-enter-from,
.zzt-leave-to {
  opacity: 0;
}
.zzt-enter-active,
.zzt-leave-active {
  transition: opacity 1s ease;
}
.zzt-enter-active {
  animation: bounce 1s ease;
}
.zzt-leave-active {
  animation: bounce 1s ease reverse;
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>