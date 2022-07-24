<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 13:50:58
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 00:12:39
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>Hello Frog</h2>
    <h2>{{ message }}</h2>
    <button @click="emitEvent">发射事件</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: '哈哈哈'
  }
})

console.log('---message---', props.message);

const emit = defineEmits(['increment', 'decrement'])
const emitEvent = () => emit('increment', '1000000')
</script>

<style scoped>
</style>