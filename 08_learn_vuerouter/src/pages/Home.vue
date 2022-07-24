<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-25 16:10:50
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-26 20:35:29
 * @LastEditContent: 
-->
<template>
	<div>
		<router-link to="/home/product">首页商品</router-link>
		<router-link to="/home/moment">首页动态</router-link>
		<router-view></router-view>
		<div>
			<h2>Home哈哈哈</h2>
			<ul>
				<li>Home的内容1</li>
				<li>Home的内容2</li>
				<li>Home的内容3</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { } from 'vue'

</script>

<style scoped>
</style>