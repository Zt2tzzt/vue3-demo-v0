Vuex单一状态树的理解4点，

1. 用一个对象，包含全部的应用层级状态。
2. 也就是SSOT(Single Source of Truth)，也可翻译成单一数据源。
3. 意味着每个应用只包含一个store实例。
4. 单状态树与模块（module）并不冲突。

Vuex单一状态树的优势1点。

- 能够直接地找到某个状态片段，方便管理和维护。

------

template中取state，VOA直接展示，结合计算属性。

src/store/index.js

```javascript
import { createStore } from 'vuex'
const store = createStore({
	state() {
		return { rootCounter: 100 }
	}
})
export default store
```

App.vue

```vue
<template>
	<div>{{ rootCounter }}</div>
</template>
<script>
export default {
	computed: {
		rootCounter() {
			return this.$store.state.rootCounter
		}
	}
}
</script>
```

------

template中取state，VOA使用 mapState。2种写法。分别的使用场景。

src/store/index.js

```javascript
import { createStore } from 'vuex'
const store = createStore({
	state() {
		return { name: 'zzt', age: 18 }
	},
})
export default store
```

App.vue

```vue
<template>
	<div>{{name}} - {{age}}</div>
	<div>{{myName}} - {{myAge}}</div>
</template>
<script>
// mapState返回的是对象，对象中是一个个函数，函数中本质上也是通过this.$store.state.xxx来读取数据。
import { mapState } from 'vuex'
export default {
	computed: {
    // 第一种写法，传入数组。
		...mapState(['name', 'age']),
    // 第二种写法，传入对象，key为重名命的名称，value为传入参数为state的getter函数，返回指定状态
    ...mapState({
			myName: state => state.name,
			myAge: state => state.age
		})
	}
}
</script>
```

------

template中取state，VCA结合计算属性，VCA结合mapState。

```vue
<template>
	<div>{{myName}} - {{myAge}}</div>
	<div>{{name}} - {{age}}</div>
</template>
<script>
import { computed } from 'vue'
import { useStore, mapState } from 'vuex'
export default {
	setup() {
		const store = useStore()
    // VCA结合计算属性使用。
		const myName = computed(() => store.state.name)
		const myAge = computed(() => store.state.age)
    
		// VCA结合mapState使用。
    // objFns为Object类型，其中存放一个个名称为属性名的geeter函数。函数中未绑定this，函数没有被computed包裹。
    const objFns = mapState(['name', 'age']) 
		const storeState = {}
		Reflect.ownKeys(objFns).forEach(fnKey => {
      // 函数中通过this.$store.state.xxx来取值，因此绑定一个this
			const fn = objFns[fnKey].bind({ $store: store })
			storeState[fnKey] = computed(fn)
		})
		return {
			myName, myAge,
			...storeState
		}
	}
}
</script>
```

VCA结合mapState做封装

src/hooks/useState.js

```javascript
import { computed } from 'vue'
import { useStore, mapState } from 'vuex'
/**
 * @param {Array} mapper state名称字符串数组
 * @return {Array} state名称对应的 ref Object 对象
 */
export default function (mapper) {
	const objFns = mapState(mapper)
	const store = useStore()
	const storeState = {}
	Reflect.ownKeys(objFns).forEach(fnKey => {
		const fn = objFns[fnKey].bind({ $store: store })
		storeState[fnKey] = computed(fn)
	})
	return storeState
}
```

App.vue

```vue
<template>
	<div>{{ name }} - {{ age }}</div>
</template>
<script>
import useState from '../hooks/useState'
export default {
	setup() {
		const storeState = useState(['name', 'age'])
		return { ...storeState }
	}
}
</script>
```

------

Vuex的5大核心，state，getter，mutation，action，module。

------

getters 的使用场景：

- 某些属性可能需要经过变化后来使用。

getters 类似于计算属性，使用时不需要加 ()

------

getters 的基本使用；第2个参数的使用；返回函数（柯里化）的使用。

src/store/index.js

```javascript
import { createStore } from 'vuex'
const store = createStore({
	state() {
		return {
			books: [
				{ name: 'vuejs', count: 2, price: 110 },
				{ name: 'react', count: 3, price: 120 },
				{ name: 'webpack', count: 4, price: 130 },
			],
      discount: 0.9 // 折扣
		}
	},
	getters: {
    // getters的基本使用，计算书籍的总价。
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
        .map(book => book.count * book.price)
        .reduce((accumulator, currVal) => accumulator + currVal) * getters.currentDiscount
		},
    // getters返回函数（柯里化）的使用。实现自定义折扣案例
    totalPriceWithCount(state) {
			return function(n) {
				return state.books
        .map(book => book.count * book.price)
        .reduce((accumulator, currVal) => accumulator + currVal) * n
			}
		}
	},
})
export default store
```

App.vue

```vue
<template>
	<div>
		{{$store.getters.totalPrice}}
		{{$store.getters.totalPriceWithDoubleCount}}
		{{$store.getters.totalPriceWithCount(0.8)}}
	</div>
</template>
```

------

getters 辅助函数，VOA中结合mapGetters使用，传入数组和对象的2种写法。

src/store/index.js

```javascript
import { createStore } from 'vuex'
const store = createStore({
	state() {
		return { name: 'zzt', age: 18 }
	},
	getters: {
		nameInfo(state) {
			return `my name is ${state.name}`
		},
		ageInfo(state) {
			return `my age is ${state.age}`
		}
	}
})
export default store
```

App.vue

```vue
<template>
	<div>
		{{nameInfo}}, {{ageInfo}}
		{{nameMsg}}, {{ageMsg}}
	</div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
	computed: {
    // 传入数组的写法。
		...mapGetters(['nameInfo', 'ageInfo']),
    // 传入对象的写法。
		...mapGetters({
			nameMsg: 'nameInfo',
			ageMsg: 'ageInfo',
		}),
	}
}
</script>
```

------

getters函数在VCA中的基本使用，结合mapGetter的使用。

App.vue

```vue
<template>
	<div>{{nameStr}}</div>
</template>
<script>
import { computed } from "vue"
import { mapGetters, useStore } from "vuex"
export default {
	setup() {
    // VCA的基本使用
		const store = useStore()
		const nameStr = computed(() => store.getters.nameInfo)
    
		// 结合mapGetter使用。
    // objFns为Object类型，其中存放一个个名称为属性名的geeter函数。
    const objFns = mapGetters(['nameInfo', 'ageInfo']) 
		const storeGetter = {}
		Reflect.ownKeys(objFns).forEach(fnKey => {
      // 函数中通过this.$store.getters.xxx来取值，因此绑定一个this
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
```

------

封装函数useGetters。结合useStates进行2层封装。

src/store/useMapper.js

```javascript
import { computed } from 'vue'
import { useStore } from 'vuex'
/**
 * @param {Array} mapper state名称字符串数组
 * @param {Fuction} mapFn 要使用的map函数。
 * @return {Array} state名称对应的 ref Object 数组
 */
export default function (mapper, mapFn) {
	const objFns = mapFn(mapper)
	const store = useStore()
	const res = {}
	Reflect.ownKeys(objFns).forEach(fnKey => {
		const fn = objFns[fnKey].bind({ $store: store })
		res[fnKey] = computed(fn)
	})
	return res
}
```

src/store/useGetters.js

```javascript
import useMapper from './useMapper'
import { mapGetters } from 'vuex'
export default function(mapper) {
	return useMapper(mapper, mapGetters)
}
```

------

在Vuex的store中，修改状态的唯一方法是提交mutation。

------

mutations中方法传参（第二个参数）。一般用对象，基本使用。

src/store/index.js

```javascript
import { createStore } from 'vuex'
const store = createStore({
	state() {
		return {
			rootCounter: 100,
    }
	},
	mutations: {
		increment(state, n) { // 传一个Number类型
			state.rootCounter = state.rootCounter + n
		},
		decrement(state, payload) { // 传一个Object类型
			state.rootCounter = state.rootCounter - payload.n
		},
	}
})
export default store
```

App.vue

```vue
<template>
  <div>
    <h2>当前计数：{{ $store.state.rootCounter }}</h2>
    <button @click="$store.commit('increment', 10)">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>
<script>
export default {
  methods: {
    decrement() {
      this.$store.commit("decrement", {age: 18, name: 'zzt'});
    },
  },
}
</script>
```

------

mutations中对象风格的提交方式，基本使用。

```vue
<script>
export default {
  methods: {
    // 对象风格的提交方式
    decrement() {
      this.$store.commit({
        type: "decrement",
        age: 10,
        name: 'zzt'
      });
    },
  },
}
</script>
```

------

将mutations中标识符值抽成常量，结合对象增强语法计算属性名使用。

src/store/mutationTypes.js

```javascript
export const DECREMENT = 'decrement'
```

src/store/index.js

```javascript
import { createStore } from 'vuex'
import { DECREMENT } from './mutationTypes'
const store = createStore({
	state() {
		return { rootCounter: 100 }
	},
	mutations: {
    // ES6 对象字面量增强 计算属性名
		[DECREMENT](state, payload) {
			state.rootCounter = state.rootCounter - payload.n
		},
	}
})
export default store
```

App.vue

```vue
<script>
import { DECREMENT } from "./store/mutationTypes";
export default {
  methods: {
    decrement() {
      this.$store.commit(DECREMENT, {age: 10, name: 'zzt'});
    },
  },
}
</script>
```

------

mutations辅助函数，VOA中结合 mapMutations 使用。传入数组对象2种。

```vue
<template>
  <div>
    <h2>当前计数：{{ $store.state.rootCounter }}</h2>
    <!-- mapMutation省略了操作步骤this.$store.commit -->
    <button @click="decrement({n: 10})">-1</button>
    <button @click="sub10({n: 10})">sub-1</button>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    // 传入数组
    ...mapMutations(['decrement']),
    // 传入对象
    ...mapMutations({
      sub10: 'decrement'
    })
  }
}
</script>
```

------

mutation辅助写法，VOA中结合 mapMutations 使用，直接解构。

```vue
<template>
  <div>
    <h2>当前计数：{{ $store.state.rootCounter }}</h2>
    <button @click="decrement({n: 10})">-1</button>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  setup() {
    return {
      ...mapMutations(['decrement']) // 对象中本身就是函数，直接返回即可
    }
  }
}
</script>
```

