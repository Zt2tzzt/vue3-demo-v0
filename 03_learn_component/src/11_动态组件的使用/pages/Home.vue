<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-15 13:55:10
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-15 14:39:58
 * @LastEditContent: 
-->
<template>
  <div @click="divClick">Home组件：{{ name }} - {{ age }}</div>
</template>

<script>
export default {
  name: "home",
  props: {
    name: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: 0,
    },
  },
  emits: ["pageClick"],
  methods: {
    divClick() {
      this.$emit("pageClick");
    },
  },
};
</script>

<style scoped>
</style>
