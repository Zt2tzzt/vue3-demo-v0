<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-11 15:25:22
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-12 09:26:25
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>当前计数：{{ counter }}</h2>
    <counter-operation @add="addOne" @sub="subOne" @addN="addNum" />
  </div>
</template>

<script>
import CounterOperation from "./CounterOperation.vue";
export default {
  components: { CounterOperation },
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    addOne() {
      this.counter++;
    },
    subOne() {
      this.counter--;
    },
    addNum(num, name, age) {
      console.log(name, age);
      this.counter += num;
    },
  },
};
</script>

<style scoped>
</style>