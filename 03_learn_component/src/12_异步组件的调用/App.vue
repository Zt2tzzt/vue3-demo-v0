<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-15 15:09:11
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-15 16:49:16
 * @LastEditContent: 
-->
<template>
  <div>
    App组件
    <home />

    <suspense>
      <template #default>
        <async-category />
      </template>
      <template #fallback>
        <loading />
      </template>
    </suspense>
  </div>
</template>

<script>
import Home from "../06_Provide和inject使用/Home.vue";
import Loading from "./Loading.vue";
// import AsyncCategory from './AsyncCategory.vue'

import { defineAsyncComponent } from "vue";

const AsyncCategory = defineAsyncComponent(() => import("./AsyncCategory.vue"));

/* const AsyncCategory = defineAsyncComponent({
  // 工厂函数
  loader: () => import("./AsyncCategory.vue"),
  // 加载异步组件时，要使用的组件
  loadingComponent: Loading,
  // 加载失败时，要使用的组件
  errorComponent: Loading,
  // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
  delay: 200,
  // 如果提供了 timeout, 并且加载组件的时间，超过了设定值，将显示错误组件，默认值infinity（即永不超时）单位ms
  timeout: 3000,
  // 定义组件是否可挂起
  Suspense: false,
}); */

export default {
  components: { Home, AsyncCategory, Loading },
};
</script>

<style scoped>
</style>