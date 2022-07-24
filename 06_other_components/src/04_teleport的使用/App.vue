<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-20 21:53:55
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 22:56:58
 * @LastEditContent: 
-->
<template>
	<div class="app">
		<teleport to="#zzt">
			<h2>当前计数</h2>
			<button>+1</button>
			<HelloWorld></HelloWorld>
		</teleport>

		<teleport to="#zzt">
			<span>呵呵呵呵</span>
		</teleport>
	</div>
</template>

<script>
import HelloWorld from './HelloWorld.vue';
import {getCurrentInstance } from 'vue'
export default {
	components: { HelloWorld },
	setup() {
		const instance = getCurrentInstance();
		console.log(instance.appContext.config.globalProperties.$name);
	},
	mounted() {
		console.log(this.$name);
	}
}

</script>

<style scoped>
</style>