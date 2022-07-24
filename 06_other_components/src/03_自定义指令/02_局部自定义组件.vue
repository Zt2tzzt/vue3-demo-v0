<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-20 20:18:34
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 20:23:27
 * @LastEditContent: 
-->
<template>
	<input type="text" v-focus />
</template>

<script setup>
const vFocus = {
	mounted(el) {
		console.log('focus mounted');
		el.focus()
	}
}
</script>

<style scoped>
</style>