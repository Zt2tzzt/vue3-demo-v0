/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-26 21:44:38
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-01 20:25:16
 * @LastEditContent: 
 */
import { createStore } from 'vuex'
import home from './modules/home'

const store = createStore({
	state() {
		return {
			counter: 0
		}
	},
	mutations: {
		increment(state) {
			state.counter++
		},
	},
	actions: {
		/* incrementAction(ctx, { count }) {
			setTimeout(() => {
				ctx.commit('increment', count)
			}, 1000);
		} */
		incrementAction(ctx) {
			return new Promise(resolve => {
				setTimeout(() => {
					ctx.commit('increment')
					resolve('请求完成')
				}, 1000);
			})
		}
	},
	modules: {
		home
	}
})

export default store

/* const store1 = createStore({
	state() {
		return {
			rootCounter: 100,
			name: 'zzt',
			age: 18,
			books: [
				{ name: 'vuejs', count: 2, price: 110 },
				{ name: 'react', count: 3, price: 120 },
				{ name: 'webpack', count: 4, price: 130 },
			],
			discount: 0.9
		}
	},
	getters: {
		// getters的基本使用
    totalPrice(state) {
		  return state.books
        .map(book => book.count * book.price)
        .reduce((accumulator, currVal) => accumulator + currVal)
		},
    // getters第2个参数的使用,实现书籍折上折案例
    currentDiscount(state) { // 当前折扣
			return state.discount * 0.7
		},
		totalPriceWithDoubleCount(state, getters) {
		  return state.books
        .map(book => book.count * book.price * getters.currentDiscount)
        .reduce((accumulator, currVal) => accumulator + currVal)
		},
		// getters返回函数（柯里化）的使用。实现自定义折扣案例
		totalPriceWithCount(state) {
			return function(n) {
				return state.books
        .map(book => book.count * book.price * n)
        .reduce((accumulator, currVal) => accumulator + currVal)
			}
		},
		nameInfo(state) {
			return `my name is ${state.name}`
		},
		ageInfo(state) {
			return `my age is ${state.age}`
		}
	},
	mutations: {
		increment(state, n) { // 传一个Number类型
			state.rootCounter = state.rootCounter + n
		},
		[DECREMENT](state, payload) { // 传一个Object类型
			state.rootCounter = state.rootCounter - payload.n
		},
	}
}) */