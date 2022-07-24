<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-05 14:50:27
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-16 14:00:27
 * @LastEditContent: 
-->
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition name="zzt">
      <h2 v-if="isShow">Hello Frog</h2>
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
.zzt-enter-to,
.zzt-leave-from {
  opacity: 1;
}
.zzt-enter-from,
.zzt-leave-to {
  opacity: 0;
}
.zzt-enter-active,
.zzt-leave-active {
  transition: opacity 2s ease;
}
</style>