<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-15 13:54:57
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-15 13:54:57
 * @LastEditContent: 
-->
<template>
  <div>
    Category组件
    <button @click="counter++">{{ counter }}</button>
  </div>
</template>

<script>
export default {
  name: "category",
  data() {
    return {
      counter: 0,
    };
  },
};
</script>

<style scoped>
</style>