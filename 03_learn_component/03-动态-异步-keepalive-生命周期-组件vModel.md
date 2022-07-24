在学习路由之前，组件的自动切换有2种方式。

1. 通过 v-if 来判断，显示不同组件。
2. 动态组件的方式

------

动态组件使用内置的 component 组件，通过一个特殊的 attribute `is` 来实现。

------

is 最好使用 v-bind 动态绑定，它的值可以是2种。(推荐小写加短横线，vue-loader 下大写也可以)

- 注册的全局组件名。
- 注册的局部组件名。

------

动态组件的基本使用，代码实现。

App.vue

```vue
<template>
	<component :is="curentTab">
</template>
<script>
  import Home from './Home.vue'
	export default {
    components: { Home },
    data() {
      return {
        currentTab: 'Home'
      }
    }
  }
</script>
```

------

给动态组件传 props 或在其中发射事件与普通组件是一样的。

------

keep-alive 是一个内置组件，使用场景是什么？

- 默认情况下，组件切换后会被销毁，切换回来会重新创建组件，如果希望保持组件的状态，则需要使用 keep-alive。

keep-alive 的基本使用：

App.vue

```vue
<template>
  <button v-for="ele of tabs" :key="ele" @click="eleClick(ele)" :class="{ active: currentTab === ele }">
    {{ ele }}
  </button>
  <keep-alive include="Home,About">
    <component :is="currentTab" />
  </keep-alive>
</template>
<script>
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Category from "./pages/Category.vue";
export default {
  components: { Home, About, Category, },
  data() {
    return {
      tabs: ["Home", "About", "Category"],
      currentTab: "Home",
    };
  },
  methods: {
    eleClick(ele) {
      this.currentTab = ele;
    },
  },
};
</script>
```

------

kepp-alive 组件中3个属性及作用：

- include - String | RegExp | Array，只有名称匹配的组件会被缓存。
- exclude - String | RegExp | Array，任何名称匹配的组件都不会被缓存。
- max - Number | String，最多可以缓存多少组件实例，一旦达到数字，那么缓存组件中最久没有被访问的组件会被销毁。

------

keep-alive 中属性 include / exclude 实际上匹配的是组件中设置属性`name`值。

------

默认情况下 webpack 代码打包过程：

1. 在构建整个组件树的过程中，组件之间通过模块化直接依赖。
2. webpack 在打包时会将组件模块打包到一起（比如一个`app.js`文件）将第三方库打包到一起（比如一个`chunk-vendors.js`文件）

webpack 分包的使用场景：

- 随着项目的不断庞大，app.js文件内容过多，会造成首屏渲染速度变慢的问题。

------

webpack 代码分包的好处：

1. 对一些不需要立即使用的组件，可以单独将它们拆分成一些小的代买快`chunk.js`。
2. 这些`chunk.js`会在需要时，从服务器下载，并运行代码。

打包后的dist目录理解：

```
dist
	js
		app.fd14a7ae.js
		app.fd14a7ae.map
		chunk-2d0dda4d.88dfd768.js // 异步组件分包后生成的js
		chunk-2d0dda4d.88dfd768.map // 异步组件分包后生成的map
		chunk-vendors.f9aa8ccb.js
		chunk-vendors.f9aa8ccb.map
		
```

------

webpack 代码分包的简单实现，使用ESModule的异步模块加载。

```javascript
import('./utils/math').then(res => console.log(res.sum(20, 30)))
```

------

vue中异步组件的使用场景：项目过大，对于某些组件我们希望通过异步的方式来进行加载，目的是可以对其进行分包处理。

vue提供了一个函数：`defineAsyncComponent`来实现异步组件加载。

------

defineAsyncComponent 接收2种类型的参数：

- 工厂函数，该工厂函数要返回一个Promise对象。
- 对象类型，对异步函数进行配置。

------

defineAsyncComponent 2种用法的基本使用：

工厂函数：

```vue
<script>
import { defineAsyncComponent } from 'vue'
const AsyncHome = defineAsyncComponent(() => import('./AsyncHome.vue'))
export default {
  components: { AsyncHome }
}
</script>
```

对象类型：

```vue
<script>
import Loading from './Loading.vue'
import { defineAsyncComponent } from 'vue'
const AsyncHome = defineAsyncComponent({
  loader: () => import('./AsyncHome.vue'), // 工厂函数
  loadingComponent: Loading, // 正在加载时要展示的组件。
  errorComponent: Loading, // 加载出错时要展示的组件
  delay: 200, // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
  timeout: 3000, // 加载时间超过设定值，显示错误组件，默认值infinity（即永不超时），单位ms
  suspensible: false, // 定义组件是否可挂起 | 默认值：true
   /**
   * @param {*} error 错误信息对象
   * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
   * @param {*} fail  一个函数，指示加载程序结束退出
   * @param {*} attempts 记录的尝试次数。
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // 请求发生错误时重试，最多可尝试 3 次
      retry()
    } else {
      // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
      // 必须调用其中一个才能继续错误处理。
      fail()
    }
  }
})
</script>
```

打包后的 dist 目录理解同上。

------

Suspense是一个内置的全局组件，该组件有2个插槽并介绍：

- default：如果default可以显示，那么显示default的内容。
- fallback：如果default无法显示，那么显示fallback插槽的内容。

------

Suspense与异步组件的结合使用：

```html
<template>
	<suspense>
    <!-- <template v-slot:default> -->
  	<template #default>
			<AsyncCategory></AsyncCategory>
		</template>
		<template #fallback>
			<Loading></Loading>
		</template>
  </suspense>
</template>
<script>
import Loading from "./Loading.vue";
import { defineAsyncComponent } from 'vue'
const AsyncCategory = defineAsyncComponent(() => import("./AsyncCategory.vue"));
export default {
  components: { AsyncCategory, Loading }
}
</script>
```

------

$refs 的使用场景：

- vue开发中不推荐进行DOM操作，而在组件中想要直接获取到元素对象或者子组件实例。

$refs 的使用步骤：

1. 给元素或组件绑定一个 ref 的 attribute。
2. 在组件实例中使用 $refs，它是一个对象，持有注册过ref attribute的所有DOM元素和子组件实例。
3. 元素会返回它本身，组件会返回一个 Prox 且可以访问其中data定义的变量，调用 methods 中的方法。

基本实现： 

```vue
<template>
  <div>
    <!-- 绑定到一个元素上 -->
    <h2 ref="title">哈哈哈</h2>
    <!-- 绑定到一个组件上 -->
    <NavBar ref="navBar" />
    <button @click="btnClick">获取元素</button>
  </div>
</template>
<script>
import NavBar from "./NavBar.vue";
export default {
  components: { NavBar },
  methods: {
    btnClick() {
      console.log(this.$refs.title); // h2元素本身
      console.log(this.$refs.navBar.message); // 访问NavBar中的message
      this.$refs.navBar.sayHello(); // 调用NavBar中的sayHello方法。
    },
  },
};
</script>
```

------

$parent 和 $root 有什么用：

- $parent：用来访问父组件。
- $root：用来访问根组件。

基本使用：

```javascript
visitParent() {
  console.log(this.$parent.message)
  console.log(this.$root.message)
}
```

弊端：使用时耦合性太强。

Vue3中已删除了$children的属性

------

理解组件和组件实例的关系，会不会出现一个组件有多个父组件的情况。

- 不会，我们写一个.vue组件，是在写一个组件描述，真正使用时，会创建出一个组件实例。

------

$el有什么用，用来访问组件的根元素。

```javascript
visitCpnRoot() {
  console.log(this.$refs.navBar.$el) // 拿到的是NavBar中的根元素。
}
```

------

什么是生命周期1点：

- 每个组件都会经历的创建、挂载、更新、卸载等一系列的过程。

生命周期函数的理解3点：

1. 生命周期函数是一些钩子函数，在某个时间会被vue源码内部进行回调。
2. 可用于监听组件正在经历什么阶段。
3. 可在生命周期函数中编写属于自己的代码逻辑。

------

理解vue的生命周期流程图，举例8个生命周期函数：

beforeCreate, created, beforeMount, mounted, beforeUpdate, updated, beforeUnmount, unmounted

![](https://gitee.com/Zt2tzzt/my-image/raw/master/202205160923355.jpg)

------

vue提供的针对缓存组件的2个生命周期是 activated 和 deactivated，

使用场景是什么：监听动态组件的激活和未激活事件

```javascript
activated() {
  console.log("about activated");
},
deactivated() {
  console.log("about deactivated");
},
```

------

组件v-model的基本使用：

App.vue

```vue
<template>
  <MyCpn v-model="message"></MyCpn>
  <!-- 等价于↓ $event是子组件传来的值 -->
  <MyCpn :modelValue="message" @update:modelValue="message = $event"></MyCpn>
</template>
<script>
	import Mycpn from './MyCpn.vue'
  export default {
    components: { MyCpn },
    data() {
      return { message: 'Hello Frog' }
    }
  }
</script>
```

MyCpn.vue

```vue
<template>
	<imput :value="modelValue" @input="inputChange" />
</template>
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    inputChange(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
```

------

组件v-model使用，使用computed处理。

App.vue

```vue
<template>
  <MyCpn v-model="message"></MyCpn>
</template>
<script>
	import Mycpn from './MyCpn.vue'
  export default {
    components: { MyCpn },
    data() {
      return { message: 'Hello Frog' }
    }
  }
</script>
```

MyCpn.vue

```vue
<template>
	<imput v-model="cpnModelValue" />
</template>
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    cpnModelValue: {
      set(value) {
        this.$emit("update:modelValue", value)
      },
      get() {
        return this.modelValue
      }
    }
  }
}
</script>
```

自定义组件多个v-model的使用：

App.vue

```vue
<template>
	<!-- 
				v-model:title做了2件事：
				1.使用v-bind绑定了title属性。:title
				2.使用v-on监听了update:title的事件。@update:title=“title=$event”
	-->
  <MyCpn v-model="message" v-model:title="title"></MyCpn>
</template>
<script>
	import Mycpn from './MyCpn.vue'
  export default {
    components: {MyCpn},
    data() {
      return {
        message: 'Hello Frog',
        title: 'the title
      }
    }
  }
</script>
```

MyCpn.vue

```vue
<template>
	<imput v-model="cpnModelValue" />
	<input v-mode="cpnTitle" />
</template>
<script>
export default {
  props: ['modelValue', 'title'],
  emits: ['update:modelValue', 'update:title'],
  computed: {
    cpnModelValue: {
      set(value) {
        this.$emit("update:modelValue", value)
      },
      get() {
        return this.modelValue
      }
    },
    cpnTitle: {
      set(value) {
        this.$emit('update:title', value)
      },
      get() {
        return this.tilte
      }
    }
  }
}
</script>
```

