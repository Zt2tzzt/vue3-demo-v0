<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-12 15:50:44
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-12 16:15:17
 * @LastEditContent: 
-->
<template>
  <div>HomeContent: {{ name }} - {{ age }} - {{ length }}</div>
</template>

<script>
export default {
  inject: ["name", "age", "length"],
};
</script>

<style scoped>
</style>
