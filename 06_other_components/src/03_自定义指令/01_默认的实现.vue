<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-20 20:13:52
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 20:14:55
 * @LastEditContent: 
-->
<template>
	<input type="text" ref="input" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
const input = ref(null)
onMounted(() => {
	input.value.focus();
})
</script>

<style scoped>
</style>