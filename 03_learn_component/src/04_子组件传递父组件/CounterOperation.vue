<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-11 15:31:36
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-12 09:32:09
 * @LastEditContent: 
-->
<template>
  <div>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>

    <input type="text" v-model.number="num" />
    <button @click="incrementN">+{{ num }}</button>
  </div>
</template>

<script>
export default {
  // emits: ["add", "sub", "addN"],
  // 对象写法的目的是进行参数验证
  emits: {
    add: null,
    sub: null,
    addN: (num, name, age) => {
      console.log(num, name, age);
      if (num > 18) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    increment() {
      console.log("+1");
      this.$emit("add");
    },
    decrement() {
      console.log("-1");
      this.$emit("sub");
    },
    incrementN() {
      this.$emit("addN", this.num, "zzt", 19);
    },
  },
};
</script>

<style scoped>
</style>