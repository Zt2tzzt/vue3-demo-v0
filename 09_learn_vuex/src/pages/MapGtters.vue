<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-28 21:35:40
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-28 23:06:25
 * @LastEditContent: 
-->
<template>
	<div >
		<!-- 嘿嘿嘿：{{$store.getters.totalPrice}}
		嘿嘿嘿：{{$store.getters.totalPriceWithDoubleCount}}
		嘿嘿嘿：{{$store.getters.totalPriceWithCount(0.8)}} -->
		{{nameInfo}}, {{ageInfo}}
		<!-- {{nameMsg}}, {{ageMsg}} -->
		{{nameStr}}
	</div>
</template>

<script>
import { computed } from "vue"
import { mapGetters, useStore } from "vuex"
export default {
	/* computed: {
		...mapGetters(['nameInfo', 'ageInfo']),
		...mapGetters({
			nameMsg: 'nameInfo',
			ageMsg: 'ageInfo',
		}),
	}, */
	setup() {
		const store = useStore()
		const nameStr = computed(() => store.getters.nameInfo)

		const objFns = mapGetters(['nameInfo', 'ageInfo']) 
		const storeGetter = []
		Reflect.ownKeys(objFns).forEach(fnKey => {
      // 函数中通过this.$store.state.xxx来取值，因此绑定一个this
			const fn = objFns[fnKey].bind({$store: store})
			storeGetter[fnKey] = computed(fn)
		})

		return {
			nameStr,
			...storeGetter	
		}
	}
}
</script>

<style scoped>

</style>