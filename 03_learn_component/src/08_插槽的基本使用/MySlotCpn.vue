<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-13 11:30:40
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-13 11:33:09
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>组件开始</h2>
    <slot>
      <i>我是默认的I元素</i>
    </slot>
    <slot>
      <i>我是默认的I元素</i>
    </slot>
    <slot>
      <i>我是默认的I元素</i>
    </slot>
    <h2>组件结束</h2>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>