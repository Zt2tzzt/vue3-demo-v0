前端3大框架都有自己的路由实现：

- Angular - ngRouter
- React - ReactRouter
- Vue - vue-router

------

vue-router是官方路由，与Vue.js核心深度集成，用于构建SPA。

------

vue-router是基于路由和组件的，2点理解

1. 可配置访问路径，将路径和组件映射起来。
2. 在SPA中，页面的路径改变就是组件的切换。

------

vue-router 的使用步骤，6步

1. 安装vue-router

   ```shell
   npm install vue-router
   ```

2. 创建路由组件。

3. 配置路由映射：路径和组件映射关系的routes数组。

4. 通过`createRouter`创建路由对象，并且传入`routes`和`history`模式（createWebHistory, createWebHashHistory）。

5. 全局安装插件app.use(router)

6. 使用路由，通过`<router-link>`和`<router-view>`。

------

路由的基本使用。

src/router/index.js

```javascript
import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
const routes = [
	{ path: '/home', component: Home },
	{ path: '/about', component: About }
]
const router = createRouter({
	routes,
	history: createWebHashHistory()
})
// router对象中，有install函数，其中执行了 app.component('router-link', ...), app.component('router-view',...)
export default router
```

src/main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
createApp(App).use(router).mount('#app')
```

src/App.vue

```vue
<template>
  <!-- router-link默认情况下是一个a元素。-->
  <router-link to="/home">首页</router-link>
  <router-link to="/about">关于</router-link>
  <router-view></router-view>
</template>
```

------

默认路由的使用场景：

- 进入网站时，默认没有匹配路由，则显示Home组件

src/router/index.js

基本使用：

```javascript
const routes = [
  { path: '/', component: Home },// 第一种方式
]
```

------

在默认路由的基础上使用重定向：

```javascript
const routes = [
  { path: '/', redirect: '/home'}, // 第二种方式，使用redirect做重定向，改变href
  { path: '/home', component: Home },
]
```

------

router-link 的4个属性

- to：可传字符串如`/home`、对象如`{ path: '/home', query: { name: 'zzt', age: 18 } }`
- replace：会调用router.replace()，而不是router.push()
- active-class：路由激活后应用于<a>的class，默认是`router-link-active`
- exact-active-class：与嵌套路由有关，路由精准激活时，应用于<a>的class,，默认是`router-link-exact-active`
- custom：表示自定义元素，否则内容外会包裹<a>

------

路由懒加载的使用场景：

- 随着应用不断庞大，打包后的文件也随之增大，需要对路由对应的组件进行分包加载，提高首屏的渲染效率。

基本使用：

```javascript
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('../pages/Home.vue') },
]
```

------

路由配置时，component可以接收一个组件，也可以接受一个函数，该函数需要返回一个Promise

------

使用webpack的特性魔法注释，给分包名命：

```javascript
const routes = [
  { path: '/home', component: () => /* webpackChunkName: "home-chunk" */import('../pages/Home.vue') }
]
```

------

配置路由的其它2个属性，

- name：路由记录独一无二的名称，可通过名字来做跳转（很少用），**动态添加路由**时也可使用。
- meta：自定义数据，某些地方会拿到route对象，可访问meta，也可用于导航守卫。

```javascript
const routes = [
	{
    path: '/about',
    name: 'about',
    component: () => import('../pages/About.vue'),
    meta: { name: 'zzt', age: 18 }
  }
]
```

------

动态路由的使用场景：

- 动态匹配路径中的值。

基本使用：

src/router/index.js

```javascript
const routes = [
  { path: '/user/:id', component: () => import('../pages/User.vue') }
]
```

App.vue

```vue
<router-link to="/user/123">用户：123</router-link>
```

------

在动态路由对应的组件中，获取值的3个场景：

1. 在template中通过`$route.params.xxx`获取值。
2. 在VOA中通过`this.$route.params.xxx`获取值。
3. 在setup中，使用`vue-router`库提供的一个hook函数`useRoute`，返回一个Route对象`route`，其中保存着当前路由相关属性，使用`route.params.xxx`取值。

User.vue

```vue
<template>
  <!-- 在template中获取 -->
  <h2>我是用户：{{$route.params.id}}</h2>
</template>
<script>
import { useRoute } from 'vue-router'
export default {
	created() {
    // VOA的方式
		console.log('--created--', this.$route.params.id);
	},
	setup() {
    // VCA的方式
		const route = useRoute()
		console.log('--setup--', route.params.id);
	}
}
</script>
```

------

动态路由匹配多个参数：

src/router/index.js

```javascript
const routes = [
  { path: '/user/:id/info/:name', component: () => import('../pages/User.vue')  }
]
```

| 匹配模式             | 匹配路径           | $route.params            |
| -------------------- | ------------------ | ------------------------ |
| /user/:id            | /user/123          | {id: '123'}              |
| /user/:id/info/:name | /user/123/info/zzt | {id: '123', name: 'zzt'} |

------

使用动态路由对NotFound页面做处理，匹配规则的2种写法。

src/router/index.js

```javascript
const routes = [
  // 方式一
  { path: '/:pathMatch(.*)', component: () => import('../pages/Notfound.vue') },
  // 方式二
  { path: '/:pathMatch(.*)*', component: () => import('../pages/Notfound.vue') }
]
```

NotFound.vue

```vue
<!-- 访问一个未匹配的路径：user/hahaha/123 -->
<!-- 方式一的结果：Not Found：user/hahaha/123 -->
<!-- 方式二的结果：Not Found：["user","hahaha","123"] -->
<h2>Not Found: {{$route.params.pathMatch}}</h2>
```

他们的区别在于解析的时候，方式一不解析"/"，方式二解析“/”

------

嵌套路由的使用场景：

- 在路由对应的页面中，也存在多个组件来回切换的情况。

基本使用：

src/router/index.js

```javascript
const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: () => import('../pages/Home.vue'),
    children: [
    	// 嵌套路由中，路由的path不需要/，redirect需要写完整路径
    	{ path: '', redirect: '/home/product' },
  		{ path: 'product', component: () => import('../pages/HomeProduct.vue') }
    ]
  },
]
```

Home.vue

```vue
<template>
	<!-- 嵌套路由，router-link中，to属性需要写完整的路径 -->
	<router-link to="/home/product">首页商品</router-link>
	<router-view></router-view>
	<div>
		<h2>Home哈哈哈</h2>
		<ul>
			<li>Home的内容1</li>
			<li>Home的内容2</li>
			<li>Home的内容3</li>
		</ul>
	</div>
</template>
```

------

编程式导航的使用场景：

- 通过代码来完成跳转。

分别使用VOA, VCA实现:

App.vue

```vue
<template>
  <router-link to="/home">首页</router-link>
  <router-link to="/about">关于</router-link>
  <button @click="jumpToAbout">关于</button>
  <router-view></router-view>
</template>
<script>
import { useRouter } from 'vue-router';
export default {
  // VOA实现
  methods: {
    jumpToAbout() {
      this.$router.push('/about')
    }
  },
  // VCA实现。
  setup() {
    const router = useRouter()
    const jumpToAbout = () => {
      router.push('/about')
    }
    return { jumpToAbout }
  }
}
</script>
```

------

编程式导航的另外一种实现方法，传入对象：

App.vue

```vue
<script>
import { useRouter } from 'vue-router';
export default {
  setup() {
    // VCA实现。
    const router = useRouter()
    const jumpToAbout = () => {
      // 声明式的写法 <router-link :to="对象">首页</router-link>
      router.push({
        path: '/about',
        query: { name: 'zzt', age: 18 }
      })
    }
    return { jumpToAbout }
  }
}
</script>
```

About.vue

```vue
<!-- 拿到参数 -->
<h2>query: {{$route.query.name}} - {{$route.query.age}}</h2>
```

------

编程式导航的其它4个方法。

- replace：`router.replace('/about')`，相当于声明式的`<router-link to="/about" replace />`

- go：`router.go(1)`，回退或者前进。
- back：`router.back()`，相当于go(-1)
- forward：`router.forward()`，相当于go(1)

