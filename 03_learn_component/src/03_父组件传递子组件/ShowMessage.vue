<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-11 14:15:35
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-12 17:07:24
 * @LastEditContent: 
-->
<template>
  <div>
    <h2 v-bind="$attrs">{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  // 如果不希望组件的根元素继承 非 props 的 Attribute，则需要使用以下属性
  inheritAttrs: false,
  // props: ["title", "content"],
  // 在开发中，props一般使用对象的形式
  props: {
    title: String,
    content: {
      type: String, // String, Number, Boolean, Array, Object, Date, Function, Symbol
      required: true,
      default: "123",
    },
    // 如果父组件传递的是对象类型，默认值要写成default()函数
    info: {
      type: Object, // 数组或对象，默认值都需要写工厂函数
      default() {
        return { name: "Lingard" };
      },
    },
    // 自定义验证函数，要求父组件传过来的值是三个值中的一个
    propF: {
      type: "String",
      validator(value) {
        return ["success", "warnning", "danger"].includes(value);
      },
    },
  },
};
</script>

<style scoped>
</style>