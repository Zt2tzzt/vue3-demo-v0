/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-03-01 20:03:08
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-01 21:18:32
 * @LastEditContent: 
 */
const home = {
	namespaced: true,
	state() {
		return {
			homeCounter: 100
		}
	},
	getters: {
		homeGetter(state) {
			return state.homeCounter
		}
	},
	mutations: {
		increment(state) {
			state.homeCounter++
		}
	},
	actions: {
		homeIncrementAction({commit, dispatch, state, rootState, getters, rootGetters}) {
      commit('increment')
			commit('increment', null, {root: true})
    }
	}
}
export default home