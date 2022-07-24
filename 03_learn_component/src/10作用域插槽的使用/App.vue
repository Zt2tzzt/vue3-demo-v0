<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-13 13:49:03
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-13 15:08:05
 * @LastEditContent: 
-->
<template>
  <div>
    <!-- 编译作用域 -->
    <!-- <child-cpn>
      <button>{{ title }}</button>
    </child-cpn> -->

    <show-names :names="names">
      <template v-slot="slotProps">
        <button>{{ slotProps.item }}-{{ slotProps.index }}</button>
      </template>
    </show-names>

    <!-- 只存在默认插槽的写法，官方叫法：独占默认插槽缩写 -->
    <show-names :names="names" v-slot="slotProps">
      <strong>{{ slotProps.item }}-{{ slotProps.index }}</strong>
    </show-names>
  </div>
</template>

<script>
import ShowNames from "./ShowNames.vue";
export default {
  components: { ShowNames },
  data() {
    return {
      names: ["zzt", "Lingard", "Ronaldo", "Deburyne"],
    };
  },
};
</script>

<style scoped>
</style>
ChildCpn