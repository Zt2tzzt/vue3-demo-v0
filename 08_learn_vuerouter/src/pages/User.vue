<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-25 18:52:03
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-25 18:59:42
 * @LastEditContent: 
-->
<template>
	<div>
		<h2>我是用户：{{$route.params.id}}</h2>
	</div>
</template>

<script>
import {  } from 'vue'
import { useRoute } from 'vue-router'
export default {
	created() {
		console.log('--created--', this.$route.params.id);
	},
	setup() {
		const router = useRoute()
		console.log('--setup--', router.params.id);
	}
}

</script>

<style scoped>

</style>