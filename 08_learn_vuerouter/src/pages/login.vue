<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-26 21:02:48
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-26 21:12:52
 * @LastEditContent: 
-->
<template>
	<div>
		Login
		<button @click="loginClick">登录</button>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();
const loginClick = () => {
	window.localStorage.setItem("token", "zzt")
	router.push({ path: "/home" })
}
</script>

<style scoped>
</style>