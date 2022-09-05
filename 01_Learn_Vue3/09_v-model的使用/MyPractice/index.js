/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-05 19:20:36
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-09-04 20:45:43
 * @LastEditContent: 
 */
/**
 * 实现浅拷贝/深拷贝的简单方法。
 * 浅拷贝：Object.assign({}, obj)，展开语法
 * 深拷贝：JSON.parse(JSON.stringfy(obj))
 * 实现深拷贝的2个库：
 * lodash，underscore
 */

/**
 * v-mode的1点理解： 
 * v-model本质上是语法糖，负责监听用户的输入事件来更新数据。并在某种极端场景下做一些特殊处理。
 */

/**
 * 在input中实现v-model的原理
 */

/**
 * v-model在input（checkbox，radio），textare，select中的使用。
 */

/**
 * lazy修饰符的原理，使用。
 * 默认情况下，v-model绑定的是input事件，使用lazy修饰符后，绑定事件变为change事件，只有在提交时才会触发。
 */

/**
 * v-model默认绑定的是String类型，Number修饰符的使用。
 */

/**
 * 理解逻辑判断隐式转换的案例。
 */

/**
 * trime修饰符的使用
 */

/**
 * Vue组件化的3点理解，
 * 1.createApp函数传入了一个对象app，这个对象本质上是一个组件，也就是我们应用程序的根组件。
 * 2.组件化提供了一种抽象，可以开发出一个个独立可复用的小组件来构建应用。
 * 3.任何应用都会被抽象成一颗组件树。
 * 
 * 什么是全局组件？什么是局部组件？
 * 	全局组件：在任何其它组件中都可以使用的组件。
 * 	局部组件：只有在注册的组件中才能使用的组件。
 */

/**
 * 注册一个全局组件
 */

/**
 * 组件名命的2种方式
 * 1.使用短横线分割符，在模板中引入时也要使用这种方式，如<my-component />
 * 2.使用驼峰标识符，在模板中引入时最好使用短横线分割方式。在vue-loader解析后可使用驼峰
 */

/**
 * 在开发中一般使用局部组件，因为webpack会打包没有使用的全局组件，增加包的大小。
 * 注册一个局部组件。
 */

/**
 * SFC全称，特点4个，支持方式2个
 * SFC：simple file components（单文件组件）
 * 特点：
 * 1.代码高亮。
 * 2.支持ESModule，CommonJS的模块化能力。
 * 3.组件作用域的CSS。
 * 4.可使用预处理器构建更加丰富的组件，比如：TypeScript，Babel，Less，Sass等。
 * 支持方式：
 * 1.使用Vue CLI创建项目。
 * 2.使用webpack/rollup/vite这类打包工具，对其进行打包处理。
 */