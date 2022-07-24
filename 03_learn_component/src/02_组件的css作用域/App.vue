<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-11 13:57:11
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-11 14:04:40
 * @LastEditContent: 
-->
<template>
  <div id="app">
    <h2>App</h2>
    <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorld from "./HelloWorld.vue";
export default {
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
h2 {
  color: red;
}
</style>
