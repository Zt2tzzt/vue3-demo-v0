<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-12 15:50:44
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-15 11:43:15
 * @LastEditContent: 
-->
<template>
  <div></div>
</template>

<script>
import emitter from "./utils/eventBus";

export default {
  created() {
    // 组件被创建后，监听事件
    emitter.on("zzt", (info) => {
      console.log("zzt:", info);
    });
    // 还可以监听多个事件
    emitter.on("Lingard", (info) => {
      console.log("Lingard", info);
    });
    // 监听全部事件
    emitter.on("*", (type, info) => {
      console.log("* listenr: ", type, info);
    });
  },
};
</script>

<style scoped>
</style>
