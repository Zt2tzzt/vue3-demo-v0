<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-12 09:47:50
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-12 10:22:43
 * @LastEditContent: 
-->
<template>
  <div id="app">
    <tab-bar :titles="titles" @toggleContent="toggleContent" />
    <h2>{{ contents[currentIndex] }}</h2>
  </div>
</template>

<script>
import TabBar from "./TabBar.vue";
export default {
  components: { TabBar },
  data() {
    return {
      titles: ["衣服", "裤子", "鞋子"],
      contents: ["衣服页面", "裤子页面", "鞋子页面"],
      currentIndex: 0,
    };
  },
  methods: {
    toggleContent(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
</style>