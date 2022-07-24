<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-12 15:50:15
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-12 16:14:14
 * @LastEditContent: 
-->
<template>
  <div id="app">
    <home />
    <button @click="clickButton">添加元素</button>
  </div>
</template>

<script>
import Home from "./Home.vue";
import { computed } from "vue";
export default {
  components: { Home },
  /* provide: {
    name: "zzt",
    age: 18,
  }, */
  // provide中, 如果使用data中的数据(使用this), 需要写成函数形式.
  provide() {
    return {
      name: "zzt",
      age: 18,
      length: computed(() => this.names.length),
    };
  },
  data() {
    return {
      names: ["abc", "cba", "nba"],
    };
  },
  methods: {
    clickButton() {
      this.names.push("zzt");
    },
  },
};
</script>

<style scoped>
</style>