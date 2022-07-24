<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-10 16:29:38
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-10 16:57:34
 * @LastEditContent: 
-->
<template>
  <div>
    <input type="text" v-model="message" />
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
import debounceRef from "./hook/useDebounceRef";
export default {
  setup() {
    const message = debounceRef("Hello World");
    return {
      message,
    };
  },
};
</script>

<style>
</style>