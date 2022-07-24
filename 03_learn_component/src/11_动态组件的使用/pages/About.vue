<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-15 13:54:45
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-15 14:44:49
 * @LastEditContent: 
-->
<template>
  <div>
    About组件
    <button @click="counter++">
      {{ counter }}
    </button>
  </div>
</template>

<script>
export default {
  // 每个组件中都有一个name属性，给组件名命
  name: "about",
  data() {
    return {
      counter: 0,
    };
  },
  // 生命周期函数
  created() {
    console.log("about created");
  },
  unmounted() {
    console.log("about unmounted");
  },
  activated() {
    console.log("about activated");
  },
  deactivated() {
    console.log("about deactivated");
  },
};
</script>

<style scoped>
</style>
