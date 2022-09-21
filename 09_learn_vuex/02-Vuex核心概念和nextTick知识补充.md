mutation的重要原则，

- mutation必须是同步函数。

mutation与devtool的关系。

1. devtool会记录mutation的日记。
2. 每一条mutation被记录，devtool都需要捕捉到前一状态和后一状态的快照。
3. 如果在mutation中执行异步操作，就无法追踪到数据的变化。

------

actions与mutations的不同2点。

- action提交的是mutation，而不是直接变更状态。
- action可以包含异步操作。

------

actions中context参数的介绍2点。

- context是一个和store实例有相同方法和属性的对象。
- 它与store实例相同的属性/方法：state, getters, commit, dispatch.
- 它特有的属性：rootState, rootGetters.

------

actions的基本使用。携带参数，对象提交风格。

src/store/index.js

```javascript
import { createStore } from 'vuex'
const store = createStore({
	state() {
		return {
			counter: 0
		}
	},
	mutations: {
		increment(state, num) {
			state.counter = state.counter + num
		},
	},
  // action 的基本使用，可传递参数。
	actions: {
		incrementAction(ctx, num) {
			setTimeout(() => {
				ctx.commit('increment', num)
			}, 1000);
		}
	}
})
export default store
```

Home.vue

```vue
<template>
	<div >
		计数器：{{$store.state.counter}}
		<button @click="increment">+100</button>
	</div>
</template>
<script>
export default {
	methods: {
		increment() {
      // 可传递参数
			this.$store.dispatch('incrementAction', 100)
		}
	}
}
</script>
```

对象类型的提交写法

src/store/index.js

```javascript
const store = createStore({
	state() {
		return {
			counter: 0
		}
	},
	mutations: {
		increment(state, count) {
			state.counter = state.counter + count
		},
	},
	actions: {
    // payload传递的是对象，需要解构。
		incrementAction(ctx, { count }) {
			setTimeout(() => {
				ctx.commit('increment', count)
			}, 1000);
		}
	}
})
export default store
```

Home.vue

```javascript
export default {
	methods: {
		increment() {
      // 对象类型提交时，传递的参数为对象类型。
			this.$store.dispatch({
        type: 'incrementAction',
        count: 100
      })
		}
	}
}
```

------

actions的辅助函数，2种方式传值，在VOA和VCA中使用。

src/store/index.js

```javascript
import { createStore } from 'vuex'
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
		incrementAction(ctx, payload) {
			setTimeout(() => {
				ctx.commit('increment')
			}, 1000);
		}
	}
})
export default store
```

Home.vue

```vue
<template>
	<div >
		计数器：{{$store.state.counter}}
		<button @click="incrementAction({name: 'zzt'})">+1</button>
    <button @click="add">+1</button>
	</div>
</template>
<script>
import { mapActions } from "vuex"
export default {
  // VOA中的写法
	methods: {
		...mapActions(['incrementAction']), // 传入数组的写法
    ...mapActions({ // 传入对象的写法
      add: 'incrementAction',
    })
	},
  // VCA中的写法
  setup() {
		return {
      ...mapActions(['incrementAction']),
      ...mapActions({
          add: 'incrementAction'
      })
    }
	}
}
</script>
```

------

actions通常是异步的，如何知道什么时候结束，结合Promise使用。

src/store/index.js

```javascript
import { createStore } from 'vuex'
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
		incrementAction(ctx) {
			return new Promise(resolve => {
				setTimeout(() => {
					ctx.commit('increment')
					resolve('请求完成')
				}, 1000);
			})
		}
	}
})
export default store
```

Home.vue

```vue
<template>
	<div>
		计数器：{{$store.state.counter}}
		<button @click="incrementAction">+1</button>
	</div>
</template>
<script>
import { useStore } from "vuex"
export default {
	setup() {
		const store = useStore()
		const incrementAction = () => {
			const promise = store.dispatch('incrementAction')
			promise.then(res => console.log(res))
		}
		return { incrementAction } 
	}
}
</script>
```

------

modules 的使用场景，

- vuex 中使用单一状态树，所有状态集中在一个对象显得比较臃肿，使用modules对不同模块的状态进行管理。

什么是 modules。

- modules 是用于分割 store 的模块，每个模块拥有自己的state，mutation，action，getter，modules（嵌套子模块）

------

modules的基本使用。

src/store/modules/home.js

```javascript
const home = {
	state() {
		return {
			homeCounter: 100
		}
	},
}
export default home
```

src/store/index.js

```javascript
import { createStore } from 'vuex'
import home from './modules/home'
const store = createStore({
	modules: {
		home
	}
})
export default store
```

Home.vue

```vue
<template>
	<div>HomeCouter: {{$store.state.home.homeCounter}}</div>
</template>
```

------

默认情况下，modules中的`actions`和`mutations`注册在全局名命空间中。

- 意味着提交一个mutation，那么所有模块中的同名 mutation 都会触发。

src/store/modules/home.js

```javascript
const home = {
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
}
export default home
```

src/store/index.js

```javascript
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
	modules: {
		home
	}
})
export default store
```

Home.vue

```vue
<script>
import { useStore } from "vuex"
export default {
	setup() {
		const store = useStore()
		const homeIncrement = () => {
      // 在此处直接提交，counter，homeCounter都会+1
			store.commit('increment')
		}
		return { homeIncrement }
	}
}
</script>
```

默认情况下，modules中的`getters`

Home.vue

```vue
<template>
	<div>
    <!-- 这种方式取不到home模块中的getter -->
    <!-- HomeGetter: {{$store.state.home.homeGetter}} -->
    <!-- 这种方式才能取到，但是可能会有名命冲突 -->
    HomeGetter: {{$store.getters.homeGetter}}
  </div>
</template>
```

------

使modules成为带命名空间的模块，需要使用`namespaced: true`，基本使用。

src/store/modules/home.js

```javascript
const home = {
	namespaced: true,
  // ...
}
export default home
```

Home.vue

```vue
<template>
	<div>
    <!-- 获取home模块中的homeGetter -->
    HomeGetter: {{ $store.getters['home/homeGetter'] }}
    HomeCouter: {{ $store.state.home.homeCounter }}
		<button @click="homeIncrement">home+1</button>
  </div>
</template>
<script>
export default {
	setup() {
		const store = useStore()
		const homeIncrement = () => {
      // 提交home模块中的 increment mutation，dispatch同理
			store.commit('home/increment')
		}
		return { homeIncrement }
	}
}
</script>
```

------

增加名命空间后，modules 中的 getter 方法有4个参数，

- state, getters, rootState, rootGetters.

src/store/modules/home.js

```javascript
const home = {
	state() {
		return {
			homeCounter: 100
		}
	},
  getters: {
		homeGetter(state, getters, rootState, rootGetters) {
			return state.homeCounter
		}
	},
}
export default home
```

------

增加名命空间后，modules中的action方法context参数对象有6个属性。

- commit, dispatch, state, rootState, getters, rootGetters

src/store/moudels/home.js

```javascript
const home = {
	state() {
		return {
			homeCounter: 100
		}
	},
	mutations: {
		increment(state) {
			state.homeCounter++
		}
	},
  actions: {
    // {} 解构语法
    homeIncrementAction({commit, dispatch, state, rootState, getters, rootGetters}) {
      commit('increment')
    }
  }
}
export default home
```

------

在modules中使用actions向根提交和派发事件，传第三个参数。

src/store/modules/home.js

```javascript
const home = {
  actions: {
    // {} 解构语法
    homeIncrementAction({commit}) {
      // 第二个参数是payload，第三个参数是对象，设置root:true
      commit('increment', null, {root: true})
    }
  }
}
export default home
```

------

使用modules中对应状态的辅助函数VOA的2种常用写法。

Home.vue

写法一：

```vue
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex"
export default {
	computed: {
		...mapState('home', ['homeCounter']),
		...mapGetters('home', ['homeGetter']),
	},
	methods: {
		...mapMutations('home', ['increment']),
		...mapActions('home', ['homeIncrementAction'])
	},
}
</script>
```

写法二：

```vue
<script>
import { createNamespacedHelpers } from "vuex"
const { mapActions, mapGetters, mapMutations, mapState } = createNamespacedHelpers('home')
export default {
	computed: {
		...mapState(['homeCounter']),
		...mapGetters(['homeGetter']),
	},
	methods: {
		...mapMutations(['increment']),
		...mapActions(['homeIncrementAction'])
	},
}
</script>
```

------

使用modules中对应状态的辅助函数VCA写法，针对mapState，mapGetters重新封装。以mapState封装举例：

src/hooks/useState.js

```javascript
import useMapper from './useMapper'
import { mapState, createNamespacedHelpers } from 'vuex'
export default function(mapper, moduleName) {
	let mapperFn = mapState
	if (typeof moduleName === 'string' && moduleName.length > 0) {
		mapperFn = createNamespacedHelpers(moduleName).mapState
	}
	return useMapper(mapper, mapperFn)
}
```

Home.vue

```vue
<script>
import { createNamespacedHelpers } from "vuex"
import useState from "../hooks/useState"
import useGetters from "../hooks/useGetters"
const { mapActions, mapMutations } = createNamespacedHelpers('home')
export default {
	setup() {
		const states = useState(['homeCounter'], 'home')
		const getters = useGetters(['homeGetter'], 'home')
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
```

------

nextTick是什么，

- 一个钩子函数，将回调函数加入Vue中维护的微任务队列。

nextTick的使用场景。

- 将回调推迟到下一个DOM更新之后执行，例如向h2标签中添加内容，获取它添加内容后的高度。

------

nextTick的基本使用。

```vue
<template>
  <div>
    <h2 class="title" ref="titleRef">{{message}}</h2>
    <button @click="addMessageContent">添加内容</button>
  </div>
</template>
<script>
  import { ref, nextTick } from "vue";
  export default {
    setup() {
      const message = ref("")
      const titleRef = ref(null)
      const addMessageContent = () => {
        message.value += "哈哈哈哈哈哈哈哈哈哈"
        // 更新DOM
        nextTick(() => {
          console.log(titleRef.value.offsetHeight)
        })
      }
      return { message, titleRef, addMessageContent }
    }
  }
</script>
<style scoped>
  .title {
    width: 120px;
  }
</style>
```

