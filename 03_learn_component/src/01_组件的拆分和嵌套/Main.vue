<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-11 13:31:15
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-12 16:36:48
 * @LastEditContent: 
-->
<template>
  <div class="main">
    <MainBanner />
    <MainProductList />
  </div>
</template>

<script>
import MainBanner from "./MainBanner.vue";
import MainProductList from "./MainProductList.vue";

export default {
  components: {
    MainBanner,
    MainProductList,
    MainBanner1
},
};
</script>

<style scoped>
</style>