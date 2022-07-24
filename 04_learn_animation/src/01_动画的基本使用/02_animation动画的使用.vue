<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-05 14:50:27
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-16 14:35:49
 * @LastEditContent: 
-->
<template>
  <div class="app">
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
    </div>
    <transition name="zzt">
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
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>