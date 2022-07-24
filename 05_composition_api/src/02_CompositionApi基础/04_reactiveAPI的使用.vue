<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-09 14:08:47
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-09 14:15:47
 * @LastEditContent: 
-->
<template>
  <div>
    Home Page
    <h2>{{ message }}</h2>
    <h2>{{ title }}</h2>
    <h2>当前计数：{{ state.counter }}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup() {
    // let counter = 100;
    const state = reactive({ counter: 100 });
    // 局部函数
    const increment = () => {
      state.counter++;
      console.log(state.counter);
    };

    return {
      title: "Hello Home",
      state,
      increment,
    };
  },
};
</script>

<style scoped>
</style>