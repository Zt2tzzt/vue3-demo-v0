<template>
  <div>
    <button
      v-for="ele in tabs"
      :key="ele"
      @click="eleClick(ele)"
      :class="{ active: currentTab === ele }"
    >{{ ele }}</button>

    <!-- i。v-f的判断实现 -->
    <!-- <template v-if="currentTab === 'home'">
      <home />
    </template>
    <template v-else-if="currentTab === 'about'">
      <about />
    </template>
    <template v-else>
      <category />
    </template>-->

    <!-- 2.动态组件 -->
    <keep-alive include="home,about">
      <component :is="currentTab" name="zzt" :age="18" @pageClick="pageClick" />
    </keep-alive>
  </div>
</template>

<script>
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Category from "./pages/Category.vue";

export default {
  components: {
    Home,
    About,
    Category,
  },
  data() {
    return {
      tabs: ["Home", "About", "Category"],
      currentTab: "Home",
    };
  },
  methods: {
    eleClick(ele) {
      this.currentTab = ele;
    },
    pageClick() {
      console.log("page内部发生了点击");
    },
  },
};
</script>

<style scoped>
.active {
  color: red;
}
</style>