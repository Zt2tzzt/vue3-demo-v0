/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-01 22:33:32
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-05-03 18:05:38
 * @LastEditContent: 
 */
/**
 * 一句话说明什么是Vue，Vue的全称是Vue.js
 * 	Vue是一套用于构建用户界面的渐进式框架
 * 什么是渐进式框架？
 * 	表示我们可以在项目中引用Vue，而不一定要使用Vue来开发整个项目。
 */

/**
 * Vue3带来的变化：
 * 源码方面：
 * 	1.通过monorepo的形式来管理源代码。
 * 	2.源码使用TypeScript进行重写。（Vue2中使用Flow来进行类型检测）
 * 性能方面：
 * 	1.使用Proxy进行数据劫持。
 * 		Vue2中使用Object.defineProperly中的getter和setter方法进行数据劫持，
 * 		这种方法无法劫持对象添加或删除属性，
 * 		所以不得不提供一些像$set或$delete这样特殊的API
 * 	2.删除了一些不必要的API。
 * 		移除了实例上的$on，$off和$once。
 * 		删除了一些特性，如filter，内联模板等。
 * 	3.编译方面的优化。
 * 		生成Block Tree，Slot编译优化，diff算法优化
 * API方面
 * 	1.由Options API到Composition API
 * 		Vue2通过Options API来描述组件对象，
 * 		其中包括data, props, methods, computed, 生命周期等等这些选项。
 * 		造成一个逻辑可能是在不同的地方，代码内聚性非常差。
 * 		Composition API可以将相关联的代码放到同一处进行处理，而不需要在多个Options之间寻找
 * 	2.Hooks函数增加代码的复用性：
 * 		vue2通常使用mixin在多个组件之间共享逻辑。
 * 		而mixin也是由一大堆Options组成，并且多个mixin会存在名命冲突的问题。
 * 		Vue3中可以通过Hook函数，将一部分独立的逻辑抽取出去，并且还可以做到到响应式。
 */

/**
 * 安装和使用Vue这个库的4种方式
 * 1.通过CDN的方式引入。
 * 2.下载Vue的JavaScript文件，并且自己手动引入。
 * 3.通过npm安装并使用它
 * 4.直接通过Vue CLI创建项目并使用它。
 */

/**
 * 什么是CDN，它的全称是内容分发网络，英文是Content Deliver NetWork或Content Distribution NetWork
 */

/**
 * 使用CDN引入或手动下载的方式将Hello Frog显示在页面上。
 */

/**
 * 使用原生JS和VUE3实现计数器案例
 */

/**
 * Vue3是兼容Vue2的
 */

/**
 * 原生开发和Vue开发对应命令式编程和声明式编程，它们之间的不同：
 * 	命令式编程关注how to do，声明式编程关注what to do,由框架完成how的过程。
 */

/**
 * 三大框架使用的都是声明式编程
 */

/**
 * MVC和MVM的全称，风别对应的命令式和声明式编程，理解MVVM的架构图。
 * MVC：Model-View-Controller
 * MVVM：Model-View-ViewModel
 */

/**
 * template会替换掉要挂在的元素，Vue使用template的2种方式。
 * 1.使用script标签，并且标记它的类型为x-template（type="x-template"），并设置Id
 * 2.使用任意标签（通常是template，加载时不会呈现，运行时可使用JavaScript实例化），设置Id
 */

/**
 * data属性在Vue2和Vue3的区别，2点
 * 1.Vue2中可以传入一个对象（官方推荐传入函数）
 * 2.Vue3中必须传入函数。
 */

/**
 * data中返回的对象会被Vue的响应式系统劫持，之后对改对象的修改和访问都在劫持中被处理
 */

/**
 * 列举一些Vue中使用的其它属性
 * 	props，computed，watch，emits，setup
 */