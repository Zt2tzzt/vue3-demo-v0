CLI的3点理解：

1. 脚手架是建筑工程的概念，软件工程中帮助我们搭建项目的工具称之为脚手架。
2. CLI是command-line-interface，翻译为命令行界面。
3. VueCLI已经内置了webpack的相关配置。

------

安装全局的VueCLI并创建项目的步骤。

1. 安装/升级全局的VueCLI

   ```shell
   npm install @vue/cli -g
   npm update @vue/cli -g
   ```

2. 通过vue的命令来创建项目：

   ```shell
   vue create [英文项目名称]
   ```

------

VueCLI可配置项理解

```shell
Vue CLI v4.5.15
? Please pick a preset: (Use arrow keys)  // 选择预设
  Default ([Vue 2] babel, eslint) // 选择vue2的版本，默认选择babel和eslint
  Default (Vue 3) ([Vue 3] babel, eslint) // // 选择vue3版本，默认选择babel和eslint
> Manually select features // 手动选择希望获取到的特性
```

```shell
Vue CLI v4.5.15
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Choose Vue version // 是否选择vue版本
 (*) Babel // 是否选择babel
 ( ) TypeScript // 是否使用ts
 ( ) Progressive Web App (PWA) Support // 是否支持PWA
 ( ) Router // 是否默认添加Router
 ( ) Vuex // 是否默认添加Vuex
 ( ) CSS Pre-processors // 是否选择CSS预处理器
 (*) Linter / Formatter // 是否选择ESLint对代码进行格式化限制。
 ( ) Unit Testing // 是否添加单元测试
 ( ) E2E Testing // 是否添加端到端测试。
```

VueCLI创建的项目目录结构的理解：

```
public // 项目的一些资源
	-favicon.ico
	-index.html
src // 所有的源代码
	-assets
	-components
	-App.vue
	-main.js
.browserslistrc // 设置目标浏览器
...
```

------

理解VueCLI的运行原理。

npm run serve -> 

vue-cli-service serve -> 

node_modules/.bin/vue-cli-service -> 

@vue/cli-service ->

经过一系列操作加载webpack配置 ->

启动devServer服务器。

------

vite的定位：下一代构建工具。

vite的发音：/vit/

vite由两部分组成：

- 一个开发服务器，基于原生ES模块，提供了丰富的内建功能。HMR的速度非常快。
- 一套构建指令，它使用rollup打开代码，并且是预配置的，可输出优化后的静态资源。

------

现在大部分新的浏览器，都已支持ES6+语法和ES模块化，vite只需帮助我们解决2点问题：

- 引入第三方依赖如lodash，加载了上百个js代码，对于浏览器是巨大消耗。
- 代码中有Typescript，less，vue等代码时，浏览器并不能直接识别。

------

vite依赖Node环境，Node版本要>=12.0.0

vite的安装：

```shell
npm install vite -g
```

vite的使用

```shell
npx vite
```

默认打包后的效果：

- 引用模块路径不用加后缀名。
- 引用第三方依赖可直接使用依赖名。
- 将请求的第三方依赖打包在一个文件中，减少发送请求的次数。
- 第一次使用vite打包，会对第三方依赖做预打包，放在node_modules/vite中。

------

vite对css的支持步骤：

1. 直接导入css即可。

vite对less的支持步骤：

1. 安装less编译器

   ```shell
   npm install less -D
   ```

2. 直接导入less即可

vite对postcss的支持步骤：

1. 安装postcss，和预设

   ```shell
   npm install postcss postcss-preset-env -D
   ```

2. 在`postcss.config.js`中配置postcss：

   ```javascript
   module.exports = {
     plugins: {
       require('postcss-preset-env')
     }
   }
   ```

------

vite对TypeScript的支持：原生支持，会直接使用ESBuild来完成编译：

- 直接导入ts即可。

------

理解vite的原理（vite2中不再使用Koa作为服务器）

1. 浏览器发送请求给vite中的Connect服务器。
2. Connect服务器对请求进行转发。
3. 给浏览器返回编译后的代码，浏览器可直接解析。（比如，浏览器中获取的仍是.ts结尾的代码，但里面的代码是js的语法）

------

vite对vue提供的3种版本的支持。

- vue3的SFC支持：@vitejs/plugin-vue
- vue3的JSX支持：@vitejs/plugin-vue-jsx
- Vue2的支持：underfin/vite-plugin-vue2

vite对vue3的SFC打包的步骤：

1. 安装vite插件@vitejs/plugin-vue：

   ```shell
   npm install @vitejs/plugin-vue -D
   ```

2. 安装vue插件@vue/compiler-sfc

   ```shell
   npm install @vue/compiler-sfc -D
   ```

3. 在`vite.config.js`中配置插件

   ```javascript
   import vue from '@vitejs/plugin-vue';
   module.exports = {
     plugins: [ vue() ]
   }
   ```

------

vite的打包操作：

```shell
npx vite build
```

vite的预览操作：(开启一个本地服务来预览打包后的效果)

```shell
npx vite preview
```

在`package.json`中配置：

```json
"script": {
  "serve": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

------

ESBuild特点：（有babel的功能，同时也兼顾一些webpack的功能）

- 超快构建速度，且不需要缓存。
- 支持ES6和CommonJS模块化（webpack）
- 支持ES6的Tree Shaking。（webpack）
- 支持Go JavaScript的API。（babel不支持Go）
- 支持TypeScript，JSX等语法编译。（babel）
- 支持SourceMap。（webpack）
- 支持代码压缩；（webpack）
- 支持扩展其它插件；(webpack)

ESBuild为什么这么快：

- 使用Go编写，无需经过字节码，直接转换成机器码；
- 可充分利用CPU的多核，尽可能让它们饱和运行；
- ESBuild从0编写，不使用第三方库，考虑了各种性能问题。

------

如何使用vite脚手架来创建项目：

- 直接使用vite脚手架创建项目：

  ```shell
  npm init @vitejs/app
  ```

- 先安装vite脚手架，再创建项目：

  ```shell
  npm install @vitejs/create-app -g
  create-app
  ```

  