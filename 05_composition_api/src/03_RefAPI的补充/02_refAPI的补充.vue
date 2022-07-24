<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-10 16:29:38
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-10 16:47:57
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>{{ info }}</h2>
    <button @click="changeInfo">修改Info</button>
  </div>
</template>

<script>
import { shallowRef, triggerRef } from "vue";
export default {
  setup() {
    const info = shallowRef({ name: "zzt" });

    const changeInfo = () => {
      info.value.name = "Lingard";
      triggerRef(info);
    };

    return {
      info,
      changeInfo,
    };
  },
};
</script>

<style>
</style>