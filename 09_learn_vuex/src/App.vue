<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-26 18:46:02
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-01 18:14:46
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>当前计数：{{ $store.state.rootCounter }}</h2>
    <button @click="$store.commit('increment', 10)">+1</button>
    <button @click="decrement({n: 10})">-1</button>
    <button @click="sub10({n: 10})">sub-1</button>

    <Home></Home>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Home from "./pages/Home.vue";
export default {
    data() {
        return {};
    },
    methods: {
    /* decrement() {
      this.$store.commit(DECREMENT, {n: 10, name: 'zzt'});
    }, */
    /* ...mapMutations(['decrement']),
    ...mapMutations({
      sub10: 'decrement'
    }) */
    },
    setup() {
        const stateMutations = mapMutations(["decrement"]);
        return {
            ...stateMutations
        };
    },
    components: { Home }
}
</script>

<style scoped>
</style>