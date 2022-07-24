<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-12 16:31:42
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-12 16:42:08
 * @LastEditContent: 
-->
<template>
  <div>
    <button @click="btnClick">按钮点击</button>
  </div>
</template>

<script>
import emitter from "./utils/eventBus";
export default {
  methods: {
    btnClick() {
      console.log("about按钮的点击");
      emitter.emit("zzt", { name: "zzt", age: 19 });
    },
  },
};
</script>

<style scoped>
</style>