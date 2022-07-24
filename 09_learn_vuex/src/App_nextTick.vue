<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-03-01 22:39:27
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-03 13:22:19
 * @LastEditContent: 
-->
<template>
  <div>
    <h2 class="title" ref="titleRef">{{message}}</h2>
    <button @click="addMessageContent">添加内容</button>
  </div>
</template>
<script>
  import { ref, nextTick } from "vue";
  export default {
    setup() {
      const message = ref("")
      const titleRef = ref(null)
      const addMessageContent = () => {
        message.value += "哈哈哈哈哈哈哈哈哈哈"
        // 更新DOM
        nextTick(() => {
          console.log(titleRef.value.offsetHeight)
        })
      }
      const increment = () => {
        for (let i = 0; i < 100; i++) {
          counter.value++
        }
      }
      return { message, titleRef, addMessageContent }
    }
  }
</script>
<style scoped>
  .title {
    width: 120px;
  }
</style>