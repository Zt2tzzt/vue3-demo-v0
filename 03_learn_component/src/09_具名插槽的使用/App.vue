<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-13 13:28:51
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-13 15:03:08
 * @LastEditContent: 
-->
<template>
  <div>
    <nav-bar :name="name">
      <template v-slot:left>
        <button>左边的按钮</button>
      </template>
      <template #center>
        <h2>我是标题</h2>
      </template>
      <template #right>
        <i>右边的元素i</i>
      </template>
      <template #[name]>
        <i>zzt内容</i>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      name: "zzt",
    };
  },
};
</script>

<style scoped>
</style>