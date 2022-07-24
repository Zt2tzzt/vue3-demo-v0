<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 13:49:37
 * @LastEditors: ZeTian
 * @LastEditTime: 2021-11-16 14:01:42
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>当前计数：{{ counter }}</h2>
    <button @click="increment">+1</button>

    <HelloFrog message="呵呵呵" @increment="getCounter" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HelloFrog from './HelloFrog.vue';

const counter = ref(0)
const increment = () => counter.value++

const getCounter = (payload) => console.log(payload)

</script>

<style scoped>
</style>