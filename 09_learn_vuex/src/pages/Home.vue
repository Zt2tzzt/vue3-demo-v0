<!--
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-03-01 18:06:25
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-01 22:19:29
 * @LastEditContent: 
-->
<template>
	<div>
		计数器：{{ $store.state.counter }}
		<button @click="incrementAction">+1</button>
		<button @click="add">+1</button>
		HomeCouter: {{ $store.state.home.homeCounter }}
		<button @click="homeIncrementAction">home+1</button>
		HomeGetter: {{ $store.state.home.homeGetter }}
		HomeGetter: {{ $store.getters['home/homeGetter'] }}
	</div>
</template>

<script>
import { createNamespacedHelpers, useStore } from "vuex"
import useState from "../hooks/useState"
const { mapActions, mapGetters, mapMutations, mapState } = createNamespacedHelpers('home')

export default {
	computed: {
		// ...mapState(['homeCounter']),
		// ...mapGetters(['homeGetter']),
	},
	methods: {
		/* ...mapActions(['incrementAction']),
		...mapActions({
			add: 'incrementAction'
		}), */
		/* increment() {
			// this.$store.dispatch('incrementAction', 100)
			this.$store.dispatch({
				type: 'incrementAction',
				count: 100
			})
		} */

		// ...mapMutations(['increment']),
		// ...mapActions(['homeIncrementAction'])
	},
	setup() {
		/* const actions = mapActions(['incrementAction'])
		const actions2 = mapActions({
			add: 'incrementAction'
		})
		return { ...actions, ...actions2 } */

		/* const store = useStore()
		const incrementAction = () => {
			const promise = store.dispatch('incrementAction')
			promise.then(res => console.log(res))
		}
		return { incrementAction	} */

		/* const store = useStore()
		const homeIncrement = () => {
			store.dispatch('home/homeIncrementAction')
		}
		return { homeIncrement } */


		const states = useState(['homeCounter'], 'home')
		const getters = mapGetters(['homeGetter'], 'home')
		const mutations = mapMutations(['increment'])
		const actions = mapActions(['homeIncrementAction'])

		return {
			...states,
			...getters,
			...mutations,
			...actions,
		}
	}
}
</script>

<style scoped>
</style>