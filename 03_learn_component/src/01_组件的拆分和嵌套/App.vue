<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-09 16:46:14
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-13 13:32:46
 * @LastEditContent: 
-->
<template>
  <div id="app">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Main from "./Main.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    Header,
    Main,
    Footer,
  },
};
</script>

<style scoped>
</style>