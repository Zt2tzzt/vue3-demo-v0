<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-13 13:29:28
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-13 13:40:13
 * @LastEditContent: 
-->
<template>
  <div class="nav-bar">
    <slot name="default"></slot>
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>

    <div class="addition">
      <slot :name="name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>

<style scoped>
.nav-bar {
  display: flex;
}

.left,
.right,
.center {
  height: 44px;
}

.left,
.right,
.addition {
  width: 80px;
  background-color: red;
}

.center {
  flex: 1;
  background-color: blue;
}
</style>
