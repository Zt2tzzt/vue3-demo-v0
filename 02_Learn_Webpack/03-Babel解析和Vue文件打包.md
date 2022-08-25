Babel是什么？

- Babel是一个工具链，最早用于在旧浏览器或环境中将ES6+代码转成向后兼容的版本。
- 现在主要用于语法转换，源代码转换等。

Babel本质上是什么？

- Babel本质上是一个编译器。

------

如何单独使用Babel：

1. 安装@两个库：

   - @babel/core，babel核心代码，必须安装。
   - @babek/cli：可以让我们在命令行使用babel。

   ```shell
   npm install @babel/core @babel/cli -D
   ```

2. 使用babel来处理我们的源代码

   ```shell
   npx babel demo.js --out-dir dist
   npx babel demo.js --out-file main.js
   ```

安装插件：

1. 安装箭头函数转换相关插件，并在命令中使用

   ```shell
   npm install @babel/plugin-transform-arrow-function -D
   ```

   ```shell
   npx babel demo.js --out-dir dist --plugins=@babel/plugin-transform-arrow-function
   ```

2. 安装快级作用域语法转换插件，并在命令中使用：

   ```shell
   npm install @babel/plugin-transform-block-scoping -D
   ```

   ```shell
   npx babel demo.js --out-dir dist --plugins=@babel/plugin-transform-block-scoping,babel/plugin-transform-arrow-function
   ```

插件过多，一个个设置比较麻烦，可以使用预设：

1. 安装预设，并在命令中使用

   ```shell
   npm install @babel/preset-env -D
   ```

   ```shell
   npx babel demo.js --out-dir dist --presets=@babel/preset-env
   ```

------

安装库的方式如`@babel/core`，表示代码仓库通过 monoRepo 的方式来管理。

------

Babel编译器的工作流程，3点：对应的步骤，理解原理图。

1. 解析阶段（Parsing）
   - 原生代码 -> 词法分析 -> token数组 -> 语法分析（也称为Parsing）-> AST
2. 转换阶段（Transformation）
   - AST -> 遍历 -> 访问 -> 应用插件
3. 生成阶段（Code Generation）
   - 应用插件 -> 新的AST -> 目标代码

------

在webpack中使用babel：

1. 安装@babel/core，babel-loader

   ```shell
   npm install @babel/core babel-loader -D
   ```

2. 安装对应的插件/预设

   ```shell
   npm install @babel/plugin-transform-arrow-function @babel/plugin-transform-block-scoping -D
   ```
   
   ```shell
   npm install @babel/preset-env -D
   ```
   
3. 在`webpoack.config.js`文件中做配置：

   ```javascript
   module.exports = {
     module: {
       rules: [
         {
           test: /\.m?js$/,
           use: {
             loader: 'babel-loader',
             options: {
               // 配置插件
               /* plugins: [
                 "@babel/plugin-transform-arrow-function",
                 "@babel/plugin-transform-block-scoping"
               ] */
               // 配置预设, 常见的有env，react，TypeScript
               presets: [
                 ['@babel/preset-env']
                 // 另一种写法，用于配置预设
                 // ['@babel/preset-env', {xxx: xxx}]
               ]
             }
           }
         }
       ]
     }
   }
   ```

------

Babel配置文件的2种命名方式：

- babel.config.js（或者.json, .cjs, .mjs）
  - 可以直接用于 MonoRepo 的子包，更加方便。
- .babelrc.js（或者.babelrc, .js, .cjs, .mjs）
  - 早期使用较多的命名方式，对于配置 MonoRepos 项目比较麻烦。

------

使用单独配置文件配置babel

```javascript
module.exports = {
  presets: [
    ['@babel/preset-env']
  ]
}
```

------

Vue 打包的两大版本及特点，打包后的不同版本做解释。。

- runtime-compiler：包含了对 template 模板的编译代码，更加完整，包更大。
- runtime-only：没有包含对 template 模板的编译代码，包更小。

打包后的不同版本：(.runtime意味着不包含template的compiler，包更小，.prod意味做过压缩和丑化)

- vue(.runtime).global(.prod).js：通过浏览器中的`<script>`标签引用，暴露一个全局的Vue。
- vue(.runtime).esm-broswer(.prod).js：通过原生ES模块导入，如在浏览器中使用`<script type="module">`。
- vue(.runtime).esm-bundle.js：webpack / rollup 等构建工具中默认使用该版本，如需解析 template，手动指定非 runtime 版本。
- vue.cjs(.prod).js：服务器端渲染使用，通过 require() 在 Node.js 中使用。

------

vue中编写DOM元素有3种方式：

- template模板的方式。
  - 需要通过源码中的一部分代码来进行编译。
- 通过`.vue`文件中的template来编写。
  - 通过在vue-loader中对其进行编译和处理
- render函数的方式，使用h函数来编写渲染的内容。
  - h函数可以直接返回一个虚拟节点，也就是VNode节点。

------

webpack对vue代码打包的步骤：

1. 安装vue依赖（vue3已经是默认版本）

   ```shell
   npm install vue
   ```

2. 在js文件中引入vue并编写vue代码：

   ```javascript
   import { createApp } from 'vue.esm.bundle.js' // 手动指定非runtime版本
   createApp({
     template: '#my-app',
     data() {
       return {
         title: 'I an title',
         content: 'Hello Frog'
       }
     }
   }).mount('#app')
   ```

3. 在`webpack.config.js`中配置Vue3的两个全局属性

   ```javascript
	const { DefinePlugin } = require('webpack')
   module.exports = {
     plugins: [
       new DefinePlugin({
         __VUE_OPTIONS_API__: true,
         __VUE_PROD_DEVTOOLS__: false
       }),
     ]
   }
   ```
   
4. 执行webpack打包命令。

   ```shell
   npx webpack
   ```

------

webpack 对 vue 的SFC文件打包的步骤：

1. 编写一个`app.vue`文件，并在js中引入

   ```javascript
   import App from './vue/App.vue'
   import { createApp } from 'vue.esm.bundle.js' /* 后续安装 @vue/compiler-sfc，配置 vue-loader-plugin 后，可改为默认引入方式，即 vue */
   createApp(App).mount('#app')
   ```

2. 安装 vue-loader

   ```shell
   npm install vue-loader -D
   ```

3. 在`webpack.config.js`文件中做配置：

   ```javascript
   module.exports = {
     module: {
       rules: [
         {
           test: /\.vue$/
           loadeer: 'vue-loader',
         }
       ]
     }
   }
   ```

4. 安装 @vue/compiler-sfc 来对 template 进行解析。

   ```shell
   npm install @vue/compiler-sfc -D
   ```

5. 在`webpack.config.js`中配置对应的vue插件：

   ```javascript
   const { VueLoaderPlugin } = require('vue-loader/dist/index')
   const { DefinePlugin } = require('webpack')
   module.exports = {
     plugins: [
       new VueLoaderPlugin,
       new DefinePlugin({
         __VUE_OPTIONS_API__: true,
         __VUE_PROD_DEVTOOLS__: false
       }),
     ]
   }
   ```
   
6. 执行webpack打包命令：

   ```shell
   npx webpack
   ```

------

从Vue3开始，使用esm-bundler版本，强烈建议配置两个全局标识（GlobalFeatureFlags）：

- `__VUE_OPTIONS_API__ `：是否需要支持 Options API，默认 true，配置 false 可做 tree-shaking优化代码。

- `__VUE_PROD_DEVTOOLS__`：是否在生产环境使用 devtool 调试工具，默认为 false。

在 webpack 中使用 DefinePlugin 插件配置。

------

将 template 属性放入SFC文件后，可改变引入的Vue文件为`vue`，这是因为 @vue/compiler-sfc 已经对 template 做了解析。。

