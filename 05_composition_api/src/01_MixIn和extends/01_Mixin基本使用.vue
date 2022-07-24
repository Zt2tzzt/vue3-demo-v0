<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-08 10:24:23
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-08 11:18:56
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>{{ message }}</h2>
    <button @click="foo">按钮</button>
  </div>
</template>

<script>
import { demoMixin } from "./mixins/demoMixin";
export default {
  mixins: [demoMixin],
  name: "",
  data() {
    return {
      title: "Hello Frog",
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>