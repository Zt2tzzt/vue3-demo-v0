<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-10 16:29:38
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-10 16:38:34
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>{{ name }}-{{ age }}</h2>
    <button @click="changeAge">修改age</button>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const info = reactive({ name: "zzt", age: 18 });
    /**
     * 1. toRefs: 将 reactive 对象中的所有属性都转成 ref，建立连接
     * let { name, age } = toRefs(info)
     * 2. toRef: 对其中一个属性进行转换 ref，建立连接
     */
    let { name, age } = toRefs(info);
    // let { name } = info;
    // let age = toRef(info, "age");

    const changeAge = () => {
      name.value = "Lingard";
      age.value++;
    };

    return {
      name,
      age,
      changeAge,
    };
  },
};
</script>

<style>
</style>