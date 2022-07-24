一句话说明webpack是什么

- webpack是一个为现代JavaScript应用程序而生的静态模块化打包工具。
  - 现代的（modern）：现代前端开发面临各种各样的问题，催生了webpack的出现发展
  - 静态的（static）：最终可以将代码打包成静态资源（部署到静态服务器）
  - 模块化（module）：默认支持各种模块化开发，ESMoudule，CommonJS
  - 打包（bundler）：webpack 可帮助我们进行打包。

------

webpack 的使用前提，依赖 Node 环境，

webpack 的安装分两部分 webpack，webpack-cli

```shell
npm install webpack webpack-cli -g
```

两者的关系：

1. 执行 webpack 命令，会执行 `node_module/.bin` 目录下的webpack。
2. webpack 在执行时依赖 webpack-cli 的，如果没有安装就会报错。
3. 而 webpack-cli 中代码执行时，才是真正利用 webpack 进行编译和打包的过程。
4. 第三方脚手架事实上没有使用 webpack-cli。而是类似于自己的 `vue-cli-service` 的东西。

------

webpack默认打包步骤：

1. 在目录下执行 `webpack` 的命令，webpack 会查找当前项目下 `src/index.js` 作为入口。如果没有则会报错。

2. 生成 `dist/main.js` 文件

- 这个文件中代码被压缩和丑化了。
- 打包的代码依然存在ES6语法，因为默认情况下，webpack 不清楚打包的代码是否需要转成ES5语法。

3. 也可以通过配置来决定入口和出口：

   ```shell
   npx webpack --entry ./src/main.js --output-path ./build
   ```

------

使用局部 webpack 的步骤：

1. 创建 `package.josn` 文件，用于管理项目依赖信息。

   ```shell
   npm init -y
   ```

2. 安装局部的webpack

   ```shell
   npm install webpack webpack-cli -D
   ```

3. 使用局部的webpack，在 `package.json` 中创建 scipts 脚本，执行脚本打包

   ```json
   "scripts": {
     "build": "webpack --entry ./src/main.js --output-path ./build"
}
   ```
   
   ```shell
   npm run build
   ```

------

webpack 配置文件一般名为 `webpack.config.js`，使用 CommonJS 规范。

在该文件中，入口/出口两个属性的使用

```javascript
const path = require('path')
// 导出配置信息
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  }
}
```

------

指定 webpack 配置文件名：

1. 执行 webpack 命令时：

   ```shell
   webpack --config zzt.config.js
   ```

2. 在 `package.json` 文件中脚本做配置

   ```json
   "script": {
     "build": "webpack --config zzt.config.js"
   }
   ```

------

webpack 依赖图的概念3点理解。

1. webpack 在处理应用程序时，会根据命令或者配置文件找到入口文件。
2. 从入口开始，会生成一个依赖关系图，其中包含应用程序所需所有模块（如js文件，css文件，图片，字体等）
3. 然后遍历图结构，打包一个个模块（根据文件不同使用不同 loader 解析）

理解案例：要在js中引入css，css才能被打包：

```javascript
import '../css/style.css'
```

------

什么是 loader，2点理解

1. loader 可用于对模块的源代码进行转换。
2. 将css文件看作一个模块，我们通过 `import` 来加载这个模块，webpack 并不知道如何对其加载，必须制定对应的 loader 来完成这个功能。

------

css-loader 安装

```shell
npm install css-loader -D
```

3种使用方案。

1. 内联方式，使用较少，不方便管理。

   ```javascript
   import "css-loader!../css/style.css"
   ```

2. CLI方式（webpack5中不再使用），不方便管理。

3. 配置方式。在 `webpack.config.js` 中写明配置信息，方便后期维护。

------

style-loader 有什么用：

- css-loader 只是负责将.css文件进行解析，并不会将解析后的css插入到页面中，所以需要 style-loader 完成这步操作。

配置 style-loader：

```shell
npm install style-loader -D
```

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, // 对资源进行匹配，通常是正则表达式
        // loader: "css-loader", // 写法一
        // use: ["css-loader"], // 写法二
        use: [
        	{loader: "css-loader"},
        	{loader: "style-loader"},
        ]
      }
    ]
  }
}
```

多个 loader 的加载顺序：从下到上，从后到前，从右向左。

使用上属方法，css打包后是内联样式。

------

如何处理 less，安装 less 工具，将它编译成css，

```shell
npm install less -D
npx lessc ./src/css/title.less title.css
```

在 webpack 中使用 less-loader，自动完成编译转换：

1. 安装 less-loader

	```shell
	npm install less-loader -D
	```

2. 配置 `webpack.config.js`

   ```javascript
   {
     test: /\.less$/,
     use: [
       {loader: "css-loader"},
       {loader: "style-loader"},
       {loader: "less-loader"},
     ]
   }
   ```
   

------

什么是 PostCSS，3点：

1. PostCSS 是一个通过 JavaScript 来转换样式的工具。
2. 它可自动进行一些CSS转换和适配，比如自动添加浏览器前缀，css样式的重置。
3. 但是，实现这些功能，需要借助 PostCSS 插件。

如何单独使用，

1. 安装 postcss，postcss-cli

   ```shell
   npm install postcss postcss-cli -D
   ```

2. 安装需要的插件，如 autoprefixer：

	```shell
	npm install autoprefixer -D
	```

3. 执行命令，转换css，（-o：输出到哪里）

	```shell
	npx postcss --use autoprefixer -o end.css ./src/css/style.css
	```

如何在 webpack 中使用，2点：

1. 查找 PostCSS 在构建工具中的扩展，如 webpack 中的 postcss-loader。

   ```shell
   npm install postcss-loader -D
   ```

2. 选择添加需要的 PostCSS 插件并安装。

   ```shell
   npm install autoprefixer -D
   ```

3. 配置需要加载的 css 的 loader

   ```javascript
   module.exports = {
     module: {
       rules: [
         {
           test: /\.css$/,
           use: [
           	{loader: "css-loader"},
           	{loader: "style-loader"},
             {
               loader: 'postcss-loader',
               options: {
                 postcssOptions: {
                   plugins: [
                     require('autoprefixer')
                   ]
                 }
               }
             }
           ]
         }
       ]
     }
   }
   ```

------

什么是 autoprefixer

- 用于添加css前缀的插件。

------

如何单独的使用 PostCSS 配置文件：

- 可以i将配置信息放到单独的文件中进行管理，在项目根目录下创建 `postcss.config.js`

  ```javascript
  module.exports = {
    plugins: [
      require('autoprefixer')
    ]
  }
  ```

------

postcss-preset-env 的作用：

1. 将一些现代css特性，转成大多数浏览器都认识的css，根据目标浏览器或运行环境添加所需 polyfill。
2. 自动添加 autoprefixer。

使用：

1. 安装 postcss-preset-env

   ```shell
   npm install postcss-preset-env -D
   ```

2. 替换掉之前的针对 autoprefixer 的配置

