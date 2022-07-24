<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-12 15:50:15
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-12 16:32:07
 * @LastEditContent: 
-->
<template>
  <div id="app">
    <home />
    <about />
  </div>
</template>

<script>
import About from "./About.vue";
import Home from "./Home.vue";
export default {
  components: { Home, About },
};
</script>

<style scoped>
</style>