<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-20 20:36:15
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 20:43:38
 * @LastEditContent: 
-->
<template>
	<button v-if="counter < 2" v-zzt="'zzt'" @click="increment">当前计数：{{ counter }}</button>
</template>

<script setup>
import { ref } from 'vue'
const vZzt = {
	created() {
		console.log('zzt created'); // 直接打印
	},
	beforeMount() {
		console.log('zzt beforeMount'); // 直接打印
	},
	mounted() {
		console.log('zzt mounted'); // 直接打印
	},
	beforeUpdate() {
		console.log('zzt beforeUpdate'); // 点击按钮后打印
	},
	updated() {
		console.log('zzt updated'); // 点击按钮后打印
	},
	beforeUnmount() {
		console.log('zzt beforeUnmount'); // counter >= 2 后打印
	},
	unmounted() {
		console.log('zzt unmounted'); // counter >= 2 后打印
	},
}
const counter = ref(0)
const increment = () => counter.value++

</script>

<style scoped>
</style>