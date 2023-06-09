自定义指令的使用场景：

- 在Vue中，代码抽象或复用主要还是通过组件，当需要对DOM元素进行底层操作时，会用到自定义指令。

------

自定义指令分为2种，如何使用？

- 局部自定义指令，只能在注册的组件中使用。
  - VOA：通过组件中`directives`选项注册。
  - VCA：以`vNameOfDirective`的形式来命名自定义指令。在模板中引用时`v-name-of-directive`
- 全局自定义指令，可以在任意的组件中使用。
  - 通过app的`derective`方法注册，

------

实现input元素挂载后自动聚焦的案例，2种方式。

默认实现：

```vue
<template>
	<input type="text" ref="input" />
</template>
<script setup>
import { onMounted, ref } from 'vue'
const input = ref(null)
onMounted(() => {
	input.value.focus();
})
</script>
```

使用局部自定义指令，VOA, VCA 2种写法

VOA，使用directives选项。

```vue
<template>
  <input type="text" v-focus />
</template>
<script>
export default {
	directives: {
		focus: {
			// 生命周期mounted函数，可传4个参数：el, bindings, vnode, preVnode
			mounted(el) {
				el.focus()
			}
		}
	}
}
</script>
```

VCA，使用vXxx方式名命标识符并引用。

```vue
<template>
	<input type="text" v-focus />
</template>
<script setup>
const vFocus = {
	mounted(el) {
		el.focus()
	}
}
</script>
```

------

指令的7个生命周期（与Vue2不同）：

1. created：在绑定元素的attribute或事件监听被应用之前调用。
2. beforeMount：在指令第一次绑定到元素，挂载父组件之前调用。
3. mounted：在绑定元素的父组件被挂载后调用。
4. beforeUpdate：在更新包含组件的VNode之前被调用。
5. updated：在包含组件的VNode和它子组件的VNode更新后调用。
6. beforeUnmount：在卸载绑定元素的父组件之前调用。
7. unmounted：当指令与元素解除绑定并且父组件已卸载时，只调用一次。

代码演示

```vue
<template>
	<button v-if="counter < 2" v-zzt="'zzt'" @click="increment">当前计数：{{ counter }}</button>
</template>
<script setup>
import { ref } from 'vue'
const vZzt = {
	created() {
		console.log('zzt created'); // 直接打印1
	},
	beforeMount() {
		console.log('zzt beforeMount'); // 直接打印2
	},
	mounted() {
		console.log('zzt mounted'); // 直接打印3
	},
	beforeUpdate() {
		console.log('zzt beforeUpdate'); // 点击按钮后打印1
	},
	updated() {
		console.log('zzt updated'); // 点击按钮后打印2
	},
	beforeUnmount() {
		console.log('zzt beforeUnmount'); // counter >= 2 后打印1
	},
	unmounted() {
		console.log('zzt unmounted'); // counter >= 2 后打印2
	},
}
const counter = ref(0)
const increment = () => counter.value++
</script>
```

------

指令生命周期函数中4个参数分别是：el, bindings, vnode, preVnode

- el：指令绑定的元素/组件本身。
- bindings：其中有：指令接受的参数，修饰符等等。

------

如何获取自定义指令中传入的参数和修饰符。

- 参数：bindings.value
- 修饰符：bindings.modifiers，对象类型。

------

时间戳，秒钟是10位，毫秒是13位。

对时间做转换的第三方库有`dayjs`

------

运用封装思想，实现时间戳转换案例。

先安装第三方库`dayjs`用于做timestamp转换。

```shell
npm install dayjs
```

App.vue

```vue
<template>
	<h2 v-format-time="YYYY/MM/DD">{{timestamp}}</h2>
</template>
<script setup>
const timestamp = 1624452193
</script>
```

main.js

```javascript
import { createApp } from 'vue'
import App from './03_自定义指令/App.vue'
import registerDirective from './directives/index'
const app = createApp(App)
registerDirective(app)
app.mount('#app')
```

directives/index.js

```javascript
import registerFormat from './format-time'
export default function (app) {
	registerFormat(app)
}
```

directives/format-time.js

```javascript
import dayjs from 'dayjs'
export default function (app) {
	app.directive('format-time', {
		created(el, bindings) {
			bindings.formatString = bindings.value || 'YYYY-MM-DD HH:mm:ss'
		},
		mounted(el, bindings) {
			const textContent = el.textContent
			const timestamp = parseInt(textContent)
      const timestamp_ms = textContent.length === 10 ? timestamp * 1000 : timestamp
			el.textContent = dayjs(timestamp_ms).format(bindings.formatString)
		}
	})
}
```

------

teleport的使用场景

- 某些情况下，我们希望组件中的元素挂载到根节点以外的节点上，如`div#app`之外的元素。

------

teleport是一个Vue提供的内置组件，类似于react中的Portals。（Vue2中没有）

teleport的2个属性

- to：指定将其中的内容移动到的目标元素，可以使用选择器。
- disabled：是否禁用teleport的功能。

基本使用：

public/index.html

```html
<div id="app"></div>
<div id="zzt"></div>
```

App.vue

```vue
<template>
	<div class="app">
		<teleport to="#zzt">
			<h2>当前计数</h2>
			<button>+1</button>
			<HelloWorld></HelloWorld>
		</teleport>
		<teleport to="#zzt">
			<span>呵呵呵呵</span>
		</teleport>
	</div>
</template>
```

------

vue插件的使用场景：

- 添加一些全局功能。

Vue插件的2种编写方式：

- 对象类型：一个对象，必须包含一个`install`方法，该方法在插件安装时执行。
- 函数类型：一个函数，在插件安装时自动执行。

------

Vue插件可以完成的功能4个：

1. 添加全局方法或者属性，通过把它们添加到`config.globalProperties`上实现。（全局标识符名命规范：以`$`开头）
2. 添加全局资源：如指令/过滤器/过渡等。
3. 添加全局的mixin，混入一些组件选项。
4. 添加一个库中的API，同时提供以上的一个或多个功能。

------

Vue插件对象类型基本使用。

main.js

```javascript
import { createApp } from 'vue'
import App from './04_teleport的使用/App.vue'
import pluginObject from './plugins/plugins_object'
const app = createApp(App)
// 调用pluginObject对象中的install方法，并传入app
app.use(pluginObject)
app.mount('#app')
```

plugins/plugins_object.js

```javascript
export default {
	install(app) {
		app.config.globalProperties.$name = 'zzt'
	}
} 
```

App.vue

```vue
<script>
import { getCurrentInstance } from 'vue'
export default {
	setup() {
		// VCA中拿到全局定义的标识符。
    const name = getCurrentInstance().appContext.config.globalProperties.$name;
	},
	mounted() {
    // VOA中拿到全局定义的标识符。
		console.log(this.$name);
	}
}
</script>
```

------

Vue插件函数类型基本使用，

main.js

```javascript
import { createApp } from 'vue'
import App from './04_teleport的使用/App.vue'
import pluginFunction from './plugins/plugins_function'
const app = createApp(App)
// 调用pluginFunction函数，并传入app
app.use(pluginFunction)
app.mount('#app')
```

plugins/plugins_function

```javascript
export default function (app) {
	console.log(app);
}
```

重构registerDirectives。

main.js

```javascript
import registerDirective from './directives/index'
// registerDirective(app)
app.use(registerDirective)
```

------

虚拟DOM的优势：

- 直接操作DOM有很多限制，如不好做diff算法，不好clone，而使用JavaScript操作，则变得非常简单。
- 最重要的还是，方便实现跨平台，可以将VNode渲染在任意节点上
  - 如渲染在canvas, WebGL, SSR, Native(IOS, Android)上。
  - vue允许开发属于自己的渲染器（render），在其它平台上渲染。

------

虚拟DOM具体的渲染过程：

template ->（compiler）-> 渲染函数（render function） -> 虚拟节点（VNode） -> 渲染器，挂载/patch -> 真实元素 -> 浏览器展示

------

Vue源码的3大核心模块，作用：

- Compiler模块：编译模板系统。
- Runtime模块：也可以称之为Render模块，真正渲染的模块。
- Reactivity模块：响应式系统。

------

理解三大模块协同工作图

------

实现一个Mini-vue由3个模块组成：

1. 渲染系统
2. 响应式系统
3. 应用程序入口

------

渲染系统实现的3个功能：

1. h函数，用于返回一个VNode对象。
2. mount函数，用于将VNode挂载到DOM上。
3. patch函数，用于对比两个VNode，决定如何处理新的VNode。

------

h函数的实现，生成VNode

index.html

```html
<body>
	<div id="app"></div>
	<script src="./render.js"></script>
	<script>
		// 1.通过h函数来创建一个vnode
		const vnode = h('div', { class: 'zzt', id: 'aaa' }, [
			h('h2', null, '当前计数：100'),
			h('button', { onClick: () => { } }, '+1')
		])
	</script>
</body>
```

render.js

```javascript
const h = (tag, props, children) => {
	// vnode => javaScript对象 {}
	return {
		tag,
		props,
		children
	}
}
```

------

mount函数的实现，挂载VNode，分3步

1. 根据tag，创建html元素，存储到vnode的el中。
2. 处理props属性，
   - 以on开头，那么监听事件。
   - 普通属性，通过setAttribute添加。
3. 处理子节点：
   - 字符串，直接设置textContent。
   - 数组，递归调用mount函数。
4. 挂载到容器节点。

index.html

```html
<script>
// 2.通过mount函数，将vnode挂载到div#app上
mount(vnode, document.querySelector('#app'))
</script>
```

render.js

```javascript
const mount = (vnode, container) => {
	// vnode -> element
	// 1.创建出真实的元素，在vnode上保留el
	const el = vnode.el = document.createElement(vnode.tag)
	// 2.处理props
	if (vnode.props) {
		for (const key in vnode.props) {
			const value = vnode.props[key]
			// 对事件监听的判断
			if (key.startsWith('on')) {
				el.addEventListener(key.slice(2).toLowerCase(), value)
			} else {
				el.setAttribute(key, value)
			}
		}
	}
	// 3.处理children
	if (vnode.children) {
		if (typeof vnode.children === 'string') {
			el.textContent = vnode.children
		} else {
			vnode.children.forEach(vn => {
				mount(vn, el)
			});
		}
	}
	// 4.将el挂载到container上
	container.appendChild(el)
}
```

