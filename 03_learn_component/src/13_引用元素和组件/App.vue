<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-15 17:18:29
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-05 11:29:45
 * @LastEditContent: 
-->
<template>
  <div>
    <!-- 绑定到一个元素上 -->
    <h2 ref="title">哈哈哈</h2>

    <!-- 绑定到一个组件上 -->
    <nav-bar ref="navBar" />

    <button @click="btnClick">获取元素</button>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      names: ["abc", "cba"],
    };
  },
  methods: {
    btnClick() {
      console.log(this.$refs.title);

      console.log(this.$refs.navBar.message);
      this.$refs.navBar.sayHello();

      // $el
      console.log(this.$refs.navBar.$el);
    },
  },
};
</script>

<style scoped>
h2 {
  color: aqua;
}
</style>