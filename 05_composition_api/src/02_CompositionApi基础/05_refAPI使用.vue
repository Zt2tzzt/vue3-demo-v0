<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-09 14:08:47
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-09 14:23:03
 * @LastEditContent: 
-->
<template>
  <div>
    Home Page
    <h2>{{ message }}</h2>
    <!-- 当我们在template模板中使用 ref 对象， 它会自动进行解包 -->
    <h2>当前计数：{{ counter }}</h2>
    <button @click="increment">+1</button>

    <!-- ref 对象自动解包， 可用于子组件传参 -->
    <!-- <show-message :message="counter" /> -->
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup() {
    // counter 变成一个 ref 的可响应式的引用
    // counter = 100;
    let counter = ref(100);
    // 局部函数
    const increment = () => {
      counter.value++;
      console.log(counter.value);
    };

    return {
      counter,
      increment,
    };
  },
};
</script>

<style scoped>
</style>