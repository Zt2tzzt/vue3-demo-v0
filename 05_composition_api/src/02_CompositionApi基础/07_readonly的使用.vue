<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-09 14:08:47
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-17 19:26:06
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>name: {{ readonlyInfo1.name }}</h2>
    <button @click="updateState">修改状态</button>
  </div>
</template>

<script>
import { ref, reactive, readonly } from "vue";
export default {
  setup() {
    // 1. 普通对象
    const info1 = { name: "zzt" };
    const readonlyInfo1 = readonly(info1);

    // 2.响应式对象 reactive
    const info2 = reactive({ name: "zzt" });
    const readonluInfo2 = readonly(info2);

    // 3. 响应式对象 ref
    const info3 = ref("zzt");
    const readonlyInfo3 = readonly(info3);

    const updateState = () => {
      info3.value = "Lingard";
      readonluInfo2.name = 'jesse'
    };

    return {
      updateState,
      readonlyInfo1,
      readonluInfo2,
      readonlyInfo3,
    };
  },
};
</script>

<style>
</style>