<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-28 20:20:22
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-28 21:16:53
 * @LastEditContent: 
-->
<template>
	<div>
		<!-- 呵呵呵：{{ myName }} - {{ myAge }} -->
		哈哈哈：{{ name }} - {{ age }}
	</div>
</template>

<script>
// import { computed } from 'vue'
// import { useStore } from 'vuex'
import useState from '../hooks/useState'
export default {
	/* computed: {
		rootCounter() {
			return this.$store.state.rootCounter
		},
		// ...mapState(['name', 'age'])
		...mapState({
			myName: state => state.name,
			myAge: state => state.age
		})
	}, */
	setup() {
		/* const myName = computed(() => store.state.name)
		const myAge = computed(() => store.state.age) */

		const storeState = useState(['name', 'age'])

		return {
			// myName, myAge,
			...storeState
		}
	}
}
</script>

<style scoped>
</style>