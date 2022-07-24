<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-08 09:11:35
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-16 20:37:34
 * @LastEditContent: 
-->
<template>
  <div>
    <input type="text" v-model="keyword" />
    <transition-group
      tag="ul"
      name="zzt"
      :css="false"
      @beforeEnter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <li v-for="(item, index) in showNames" :key="item" :data-index="index">{{ item }}</li>
    </transition-group>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  name: "",
  data() {
    return {
      names: [
        "abc",
        "cba",
        "nba",
        "zzt",
        "Lingard",
        "Ronaldo",
        "Debruyne",
        "Salah",
      ],
      keyword: "",
    };
  },
  computed: {
    showNames() {
      return this.names.filter((item) => item.includes(this.keyword));
    },
  },
  methods: {
    // 进入时给一个初始状态。
    beforeEnter(ele) {
      ele.style.opacity = 0;
      ele.style.height = 0;
    },
    enter(ele, done) {
      // 也可以在这使用gsap.from，不使用beforeEnter
      gsap.to(ele, {
        opacity: 1,
        height: "1.5em",
        // 根据数组中元素的索引，设置动画延迟时间
        delay: ele.dataset.index * 0.5,
        onComplete: done,
      });
    },
    leave(ele, done) {
      gsap.to(ele, {
        opacity: 0,
        height: "0",
        delay: ele.dataset.index * 0.5,
        onComplete: done,
      });
    },
  },
};
</script>

<style scoped>
.zzt-enter-from,
.zzt-leave-to {
  opacity: 0;
}
.zzt-enter-active,
.zzt-leave-active {
  transition: opacity 1s ease;
}
</style>