<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-09 14:08:47
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-09 14:13:38
 * @LastEditContent: 
-->
<template>
  <div>
    Home Page
    <h2>{{ message }}</h2>
    <h2>{{ title }}</h2>
    <h2>当前计数：{{ counter }}</h2>
    <button @click="increament">+1</button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup() {
    let counter = 100;
    // 局部函数
    const increment = () => {
      counter++;
      console.log(counter);
    };

    return {
      title: "Hello Home",
      counter,
      increment,
    };
  },
};
</script>

<style scoped>
</style>