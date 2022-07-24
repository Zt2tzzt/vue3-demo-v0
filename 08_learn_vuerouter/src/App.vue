<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-25 15:58:05
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-26 21:03:05
 * @LastEditContent: 
-->
<template>
  <p>
    <router-link to="/home" v-slot="slotProps">
      <button @click="slotProps.navigate">{{ slotProps.href }}</button>
      <span :class="{ 'active': slotProps.isActive }">{{ slotProps.isActive }}</span>
    </router-link>

    <router-link to="/about">关于</router-link>
    <button @click="jumpToAbout">关于</button>
    <router-link to="/user/123">用户</router-link>
    <router-link to="/category">分类</router-link>
    <router-link to="/login">登录</router-link>
  </p>

  <router-view v-slot="props">
    <transition name="zzt" mode="out-in" appear>
      <keep-alive>
        <component :is="props.Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
import { useRouter } from 'vue-router';
import Foo from './pages/Foo.vue';

export default {
  methods: {
    /* jumpToAbout() {
      this.$router.push('/about')
    } */
  },
  setup() {
    const router = useRouter();
    const jumpToAbout = () => {
      // router.push('/about')
      router.push({
        path: "/about",
        query: { name: "zzt", age: 18 }
      });
    };
    return {
      jumpToAbout
    };
  },
  components: { Foo }
}

</script>

<style scoped>
.active {
  color: green;
}
.zzt-enter-from,
.zzt-leave-to {
  opacity: 0;
}

.zzt-enter-active,
.zzt-leave-active {
  transition: opacity 0.3s ease;
}
</style>