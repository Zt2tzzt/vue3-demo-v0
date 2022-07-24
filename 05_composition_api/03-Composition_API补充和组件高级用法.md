`setup` 函数是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的

------

VCA的生命周期钩子函数有哪些？

- onBeforeMount：代替beforeMount。
- onMounted：代替mounted。
- onBeforeUpdate：代替beforeUpdate。
- onUpdated：代替updated。
- onBeforeUnmount：代替beforeUnmount。
- onUnmounted：代替unmounted。

`beforeCreat` 和 `created` 中的代码应直接写在 `setup` 函数中，setup函数的执行时机比这两个阶段还早，

VCA用于动态组件的生命周期钩子：

- onActivated：代替activated。
- onDeactivated：代替deactivated。

VCA生命周期API的基本使用：

```javascript
import { onMounted } from 'vue'
export default {
  setup() {
    onMounted(() => {
      console.log('App Mounted1')
    })
  }
}
```

------

同一个生命周期钩子函数可以多次使用而不会被覆盖，有什么好处？

- 有利于代码的抽取复用。

------

能用ref尽量用ref，而不是reactive，能够更好的做到解耦，这样方便代码的抽取。

------

vue和react开发中，都需要遵守**单向数据流的规范**：

- 子组件永远不要直接改父组件中定义的数据。而是通过发射事件的方式让父组件修改。

------

结合响应式API和readonly，使用Provide, Inject API.

App.vue

```vue
<template>
  <Home />
  <h2>App Counter: {{ counter }}</h2>
  <button @click="increment">App中的+1</button>
</template>
<script>
import { ref, readonly, provide } from "@vue/runtime-core"
import Home from "./Home.vue"
export default {
  components: { Home },
  setup () {
    let name = ref('zzt')
    let counter = ref(100)
    // provide可传两个参数：prop1：属性名称，prop2：属性值
    provide('name', readonly(name))
    provide('counter', readonly(counter))
    const increment = () => counter.value++
    return { increment, counter }
  }
}
</script>
```

Home.vue

```vue
<template>
  <h2>{{ name }}</h2>
  <h2>{{ counter }}</h2>
</template>
<script>
import { inject } from 'vue'
export default {
  setup() {
    // inject可传2个参数，prop1：属性名，prop2：默认值。
    const name = inject('name', 'zzt')
    const counter = inject('counter')
    return { name, counter }
  }
}
</script>
```

------

vue3中抽取出来的逻辑代码，因为太像react中的Hook函数了，所以一般称为Hook函数，，社区中的名命规范是什么？

- use + xxx，如`useCounter.js`

------

封装一个Hook，用来修改title：

App.vue

```vue
<script>
import useTitle from './hooks/useTitle.js'
export default {
  setup() {
    const titleRef = useTitle('zzt')
    setTimeout(() => {
      titleRef.value = 'Lingard'
    }, 3000);
  }
}
</script>
```

useTitle.js

```javascript
import { ref, watch } from 'vue'
export default function (title = '默认的title') {
  const titleRef = ref(title)
  watch(titleRef, (newValue) => {
    document.title = newValue
  }, { 
    immediate: true
  })
  return titleRef
}
```

------

封装一个Hook，用来实时显示scrollX, scrollY

App.vue

```vue
<template>
  <p class="content"></p>
  <div class="scroll">
    <div class="scroll-x">scrollX: {{ scrollX }}</div>
    <div class="scroll-y">scrollY: {{ scrollY }}</div>
  </div>
</template>
<script>
import useScrollPosition from './hooks/useScrollPosition.js'
export default {
  setup() {
    const { scrollX, scrollY } = useScrollPosition()
    return { scrollX, scrollY, }
  }
}
</script>
<style scoped>
.content {
  width: 3000px;
  height: 5000px;
}
.scroll {
  position: fixed;
  right: 30px;
  bottom: 30px;
}
</style>
```

useScrollPosition.js

```javascript
import { ref } from 'vue'
export default function () {
  const scrollX = ref(0)
  const scrollY = ref(0)
  document.addEventListener('scroll', () => {
    scrollX.value = window.scrollX
    scrollY.value = window.scrollY
  })
  return { scrollX, scrollY }
}
```

------

封装一个Hook，用来实现鼠标位置的实时显示。

App.vue

```vue
<template>
  <div class="mouse">
    <div class="mouse-x">mouseX:{{ mouseX }}</div>
    <div class="mouse-Y">mouseY:{{ mouseY }}</div>
  </div>
</template>
<script>
import useMousePosition from './hooks/useMousePosition.js'
export default {
  setup() {
    const { mouseX, mouseY } = useMousePosition()
    return{ mouseX, mouseY }
  }  
}
</script>
<style scoped>
.mouse {
  position: fixed;
  right: 30px;
  bottom: 80px;
}
</style>
```
useMousePosition.js

```javascript
import { ref } from 'vue'
export default function () {
  const mouseX = ref(0)
  const mouseY = ref(0)
  window.addEventListener('mousemove', event => {
    mouseX.value = event.pageX
    mouseY.value = event.pageY
  })
  return { mouseX, mouseY }
}
```

------

封装一个Hook，实现localStorage存储。

App.vue

```vue
<template>
</template>
<script>
import useLocalStorage from './hooks/useLocalStorage.js'
export default {
  setup() {
    const data = useLocalStorage('info')
    const changeData = () => data.value = '呵呵呵呵'
    return { data, changeData }
  }
}
</script>
```

useLocalStorage.js

```javascript
import { ref, watch } from 'vue'
export default function (key, value) {
  const data = ref(value)
  if (value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    data.value = JSON.parse(window.localStorage.getItem(key))
  }
  watch(data, (newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue))
  })
  return data
}
```

------

setup的script顶层写法，如何处理return，components，props，emits。

1. 不用写return，定义的标识符可直接用于模板。
2. 不用写components选项，直接import引入子组件即可。
3. 定义props中的数据：使用`defineProps`API。
4. 定义emits中的事件，使用`defineEmits`API.

基本使用：

```vue
<template>
  <h2>{{ message }}</h2>
  <button @click="clickbtn">发射事件</button>
</template>
<script setup>
// defineProps，defineEmits只能用于<script setup>，不需要导入。
const props  = defineProps({
  message: {
    type: String,
    default: '哈哈哈'
  }
})
console.log('---message---', props.message);
const emit = defineEmits(['increment', 'decrement'])
const clickbtn = () => emit('increment', 1000000)
</script>
```

------

template模板到VNode的过程：

- template -> compiler编译 -> render函数 -> VNode ( -> 渲染器，patch/挂载 -> 真实DOM -> 显示在页面上)

render函数的使用场景：

- 需要使用JS的完全编程能力，这个时候使用render函数，比模板更接近编译器。

render函数的介绍：

1. render函数不支持在`<script setup>`中编写。
2. render函数是组件中的一个选项，它要求返回一个VNode对象，一般使用h函数生成这个VNode对象。

------

h函数的介绍2点：

1. h函数是一个用于创建VNode对象的函数。
2. h函数更准确的名命是`createVNode`函数，简化为h，推测源于hyperscript工具，它是一个基于JavaScript编写模板的工具。

代码解释render函数与h函数之间的关系：

```javascript
export default {
  render() {
    return h(tag, props, children)
  }
}
```

------

h函数接收哪3个参数，

1. `tag`(String | Object | Function)：表示：html元素 / 组件 / 异步组件 / 函数式组件。
2. `props`(Object)：表示：在模板中使用的 attribute / props / 事件。
3. `children`(String | Array | Object)：表示：文本 / 用`h()`创建的子VNodes / 有插槽的对象。

h函数的1点注意事项：

- 如果没有props，children可作为第二参数，但为了避免歧义，最好还是将`null`作为第二参数。

render函数的基本使用

```vue
<script>
// vue3中需要导入h，方便代码抽取，vue2中是render(h)
import { h } from 'vue'
export default {
  render() {
    return h('h2', { class: 'title' }, 'Hello Render')
  }
}
</script>
```

------

render函数结合VOA实现计数器案例：

第一种写法：使用render option结合data option

```vue
<script>
import { h } from 'vue'
export default {
  data() {
    return { counter: 0 }
  },
  // render中绑定了this
  render() {
    return h('div', { class: 'app' }, [
      // ${} 模板字符串语法
      h('h2', null, `当前计数: ${this.counter}`),
      // h函数中事件绑定使用 on 前缀
      h('button', { onClick: () => this.counter++ }, '+1'),
      h('button', { onClick: () => this.counter-- }, '-1'),
    ])
  }
}
</script>
```

第二种写法：使用render option结合setup option

```vue
<script>
import { h, ref } from 'vue'
export default {
  setup() {
    const counter = ref(0)
    return { counter }
  },
  render() {
    return h('div', { class: 'app' }, [
      h('h2', null, `当前计数: ${this.counter}`),
      h('button', { onClick: () => this.counter++ }, '+1'),
      h('button', { onClick: () => this.counter-- }, '-1'),
    ])
  }
}
</script>
```

第三种写法，render函数放在setup中，作为setup返回值：

```vue
<script>
import { h } from 'vue'
export default {
  setup() {
    const counter = ref(0)
    return function render() {
      return h('div', { class: 'app' }, [
        // 在render函数中，不能写this，需要用 xxx.value 将ref对象解包。
        h('h2', null, `当前计数: ${counter.value}`),
        h('button', { onClick: () => counter.value++ }, '+1'),
        h('button', { onClick: () => counter.value-- }, '-1'),
    	])
    }
  }
}
</script>
```

------

render函数中使用组件的写法：

App.vue

```vue
<script>
import { h } from 'vue'
import HelloFrog from './HelloFrog.vue'
export default {
  render() {
    return h(HelloFrog, null, null)
  }
}
</script>
```

HelloFrog.vue

```vue
<script>
import { h } from 'vue'
export default {
  render() {
    return h('h2', null, 'Hello Frog')
  }
}
</script>
```

render函数中使用插槽及作用域插槽的写法：

App.vue

```vue
<script>
import { h } from 'vue'
import HelloFrog from './HelloFrog.vue'
export default {
  render() {
    // 传入插槽，h()第三个参数用对象 {}
    return h(HelloFrog, null,
      /*
      	default是要使用的插槽的名称。是一个函数，
        可接收参数props，里面是子组件的作用域插槽传递给父组件的参数。
        返回一个要h()生成的要传入插槽的VNode。
      */
     	{
      	default: props => h('span', null, `app传入到HelloFrog中的内容：${props.name}`),
        title: props => h('span', null, `app传入到HelloFrog - title中的内容：${props.title}`) 
      }
    )
  }
}
</script>
```

HelloFrog.vue

```vue
<script>
import { h } from 'vue'
export default {
  render() {
    return h('div', null, [
      h('h2', null, 'Hello Frog'),
      /* 插槽用函数来体现，返回一个VNode，
      	 插入了内容则通过$slot调用该函数，返回一个VNode，
      	 没插入内容则调用默认的h函数返回一个VNode
      */
      this.$slots.default ? this.$slots.default({ name: 'zzt' })
      : h('span', null, '我是Hello Frog组件的插槽默认值'),
      this.$slots.title ? this.$slots.title({ title: 'abaaba' })
      : h('span', null, '我是Hello Frog - tilte组件的插槽默认值')
    ])
  }
}
</script>
```

------

jsx通过babel进行转换，配置对jsx的支持2步

1. 安装babel针对vue的jsx插件：

   ```shell
   npm install @vue/babel-plugin-jsx -D
   ```

2. 在`babel.config.js`中配置预设和插件：

   ```javascript
   module.exports = {
     presets: ['@vue/cli-plugin-babel/preset'],
     plugin: ['@vue/babel-plugin-jsx']
   }
   ```

现在，Vue CLI 已默认支持jsx，可不用配置。

jsx基本使用

```jsx
export default {
  render() {
    return <div>Hello Frog</div>
  }
}
```

------

使用jsx实现计数器案例，并引用组件，实现插槽：

App.vue

```jsx
import HelloFrog from "./HelloFrog.vue";
import { ref } from 'vue'
export default {
  setup() {
    const counter = ref(0)
    const increment = () => counter.value++
    const decrement = () => counter.value--
    return function render() {
      // 使用 () 包裹
      return (
        <div>
          <!-- jsx特殊语法使用 {} 引用值 -->
          <h2>当前计数：{counter.value}</h2>
          <!-- 使用 on 前缀来绑定事件 -->
          <button onClick={increment}>+1</button>
          <button onClick={decrement}>-1</button>
          <!-- 引用子组件 -->
          <HelloFrog>
            <!-- 使用插槽，在 {} 中写引用值，每个插槽函数需要放在一个对象 {} 中 -->
            {{
              default: props => <button>{props.name}</button>,
              title: props => <button>{props.title}</button>
            }}
          </HelloFrog>
        </div>
      )
    }
  }
}
```

HelloFrog.js

```jsx
export default {
  render() {
    return (
      <div>
        <h2>Hello Frog</h2>
        <!-- 在 {} 中引用值 -->
        { this.$slots.default ? this.$slots.default({ name: 'zzt' }) : <span>哈哈哈</span> }
        { this.$slots.title ? this.$slots.title({ title: 'title' }) : <span>嘿嘿嘿</span> }
      </div>
    )
  }
}
```

HelloFrog.js，或者，使用setup返回render

```jsx
export default {
  // 使用setup的ctx属性slots
  setup(props, {slots}) {
    return function render() {
      return (
        <div>
          <h2>Hello Frog</h2>
          <!-- 在 {} 中应用值 -->
          { slots.default ? slots.default({ name: 'zzt' }) : <span>哈哈哈</span> }
          { slots.title ? slots.title({ title: 'title' }) : <span>嘿嘿嘿</span> }
        </div>
      )
    }
  }
}
```

