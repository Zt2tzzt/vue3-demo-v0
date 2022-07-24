Mixin的使用场景1点：

- vue项目的开发过程中，组件和组件之间有时会存在相同的代码逻辑，我们希望将相同的代码逻辑进行抽取，可以使用Mixin

Mixin的3点描述：

1. Mixin 用于分发Vue组件中可复用功能。
2. 一个Mixin对象可以包含任何组件选项。
3. 当组件使用Mixin对象时，所有Mixin对象的选项将被混合进入该组件本身的选项中。

------

Mixin的基本使用：

demoMixin.js

```javascript
export const demoMixin = {
  data() {
    return {
      message: 'Hello mixin',
      title: 'Mixin title'
    }
  },
  methods: {
    foo() {
      console.log('demo mixin foo')
    }
  },
  created() {
    console.log('执行了 demo mixin created')
  }
}
```

App.vue

```vue
<template>
  <h2>{{ message }}</h2>
  <button @click="foo">按钮</button>
</template>
<script>
import { demoMixin } from "./mixins/demoMixin";
export default {
  mixins: [ demoMixin ],
};
</script>
<style scoped>
</style>
```

------

Mixin冲突合并的规则，分3种情况：

1. 如果是data函数返回的对象，保留组件自身的。
2. 如果是生命周期钩子函数，会合并到数组中，都会被调用。
3. 如果是值为对象的选项（如computed，methods），key冲突，取组件对象的键值对。

------

全局混入的使用场景：

- 组件中的某些选项，是所有的组件都需要拥有的，那么将它们抽取出来，使用全局的mixin。

全局混入的基本使用：

main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.mixin({
  created() {
    console.log('global mixin created')
  }
})
app.mount('#app')
```

------

extends 的使用场景：

- 继承另外一个组件来做扩展，用的很少，在Vue2中一般使用mixin

extends的基本使用

BasePage.vue

```vue
<template>
</template>
<script>
export default {
  data() {
    return {
      title: "Hello BasePage",
    };
  },
  methods: {
    bar() {
      console.log("base page bar");
    },
  },
};
</script>
<style scoped>
</style>
```

Home.vue

```vue
<template>
  <button @click="bar">Hoem按钮</button>
</template>
<script>
import BasePage from "./BasePage.vue";
export default {
  extends: BasePage,
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>
```

------

Options API 的缺点：

- 对应的代码逻辑会被拆分到各个属性中，代码内聚性差，组件大时难以阅读和维护。

------

Vue中的Composition API编写在setup函数里。

------

setup函数中包含了大部分Options API的选项，如data, methods, computed, watch, 生命周期等等。

------

setup函数主要有2个参数：

1. props：Object类型，父组件中传递过来的属性。它是响应式的，不能使用解构语法，除非使用`toRefs`
   - props还是需要在选项中定义，在 setup 函数中通过 props 参数获取，而不是 this。(components属性也通过选项定义)
2. context，Object类型，称之为SetupContext，它里面包含3个属性（可使用解构获取）：
   - attrs：所有非prop的attribute。
   - slots：父组件传递过来的插槽，可用于渲染函数。
   - emit：发射事件时使用，而不是this.$emit

------

setup 函数的返回值，可以用来做什么：

- 在模板 template 中使用。（可代替data, methods等等选项中定义的内容）

------

为什么 setup 函数中不能使用this，2点：

1. setup被调用之前，data, computed, methods 等选项都没有被解析。
2. setup 中未绑定this，所以它的this没有指向组件实例。

------

Reactive API的使用场景，

- 为**Object/Array类型**数据提供响应式的特性。

Reactive API响应式原理介绍，3点：

1. 使用reactive函数处理后的数据，使用时会进行依赖收集。
2. 当数据改变时，所有收集的依赖，进行对应的响应式操作。
3. 事实上，data选项返回的对象， 也是交给reactive函数将其编程响应式对象的。

Reactive API的基本使用：

```vue
<template>
  <h2>当前计数：{{ state.counter }}</h2>
  <button @click="increment">+1</button>
</template>
<script>
import { reactive } from "vue";
export default {
  setup() {
    const state = reactive({ counter: 100 });
    const increment = () => {
      state.counter++;
      console.log(state.counter);
    };
    return { state, increment };
  },
};
</script>
```

------

Ref API的使用场景：

- 用于处理基本数据类型（String, Number, Boolean），返回响应式对象。

Ref API的介绍

1. ref 意为 Reference，返回一个可变的响应式对象，该对象作为一个响应式的引用维护者它内部的值。
2. 它内部的值是在ref的`value`属性中维护的。

Ref API的注意事项：

1. 在 \<template\> 模板中引入ref的值时，vue会自动帮助我们进行解包操作，并不需要通过`ref.value`的方式使用。
2. 在 setup 函数内部，它依然是一个ref引用，所以需要通过 `ref.value` 的方式来使用。

------

如何理解Ref API的浅层解包。

- 如果ref对象在外层包裹一个对象，那么它在template模板中不会自动解包，除非外层包裹的对象是reactive对象。

Ref API的基本上使用：

```vue
<template>
	<h2>{{ message }}</h2>
	<!-- 在template模板中使用 ref 对象， 它会自动进行解包 -->
	<h2>当前计数：{{ counter }}</h2>
	<!-- ref 的解包只能是一个浅层解包（info是一个普通的JavaScript对象） -->
	<h2>当前计数：{{ info.counter.value }}</h2>
	<!-- 如果最外层包裹的是一个reactive可响应式对象，那么内容的 ref 可以解包 -->
	<h2>当前计数：{{ reactiveInfo.counter }}</h2>
	<button @click="increment">+1</button>
</template>
<script>
import { ref, reactive } from "vue";
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup() {
    let counter = ref(100);
    const info = { counter };
    const reactiveInfo = reactive({ counter });
    // 局部函数
    const increment = () => {
      counter.value++;
      console.log(counter.value);
    };
    return { counter, info, reactiveInfo, increment };
  },
};
</script>
```

------

Readonly API的使用场景

- 给另外一个地方（组件）传入**普通值，reactive对象，ref对象**时，我们希望它们是只读的，需要使用Readonly API。（默认做深度只读处理）

Readonly API的原理：

- readonly 会返回原生对象的只读代理（Prox），这个代理对象中的set方法被劫持，使它不能进行修改。

Readonly API结合普通对象和响应式对象的使用：

```vue
<template>
	<h2>name: {{ readonlyInfo1.name }}</h2>
	<h2>name: {{ readonlyInfo2.name }}</h2>
	<h2>name: {{ readonlyInfo3 }}</h2>
	<button @click="updateState">修改状态</button>
</template>
<script>
import { ref, reactive, readonly } from "vue";
export default {
  setup() {
    // 1. 普通对象
    const info1 = {name: "zzt"};
    const readonlyInfo1 = readonly(info1);
    // 2.响应式对象 reactive
		const info2 = reactive({ name: "zzt" });
    const readonlyInfo2 = readonly(info2);
    // 3. 响应式对象 ref
    const info3 = ref("zzt");
    const readonlyInfo3 = readonly(info3);
    const updateState = () => {
      info1.name = 'Lingard'
      info2.name = 'Lingard'
      info3.value = "Lingard";
    };
    return {
      updateState,
			readonlyInfo1,
			readonlyInfo2,
      readonlyInfo3,
    };
  },
};
</script>
```

