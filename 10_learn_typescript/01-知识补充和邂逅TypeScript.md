historyApiFallback有什么用，

- historyApiFallback用于本地服务，解决SPA页面在路由跳转之后，刷新时返回404的错误。

historyApiFallback如何在vue项目中进行配置。

vue.config.js

```javascript
module.exports = {
	// 最终会与脚手架中的配置合并
	configureWebpack: {
		devServer: {
			// 本身不需要配置，默认为true，在刷新时，会自动返回index.html的内容，前端路由根据路径渲染相应的组件
			historyApiFallback: true
		}
	}
}
```

------

在nginx中如何实现historyApiFallback类似的效果。

```nginx
try_files $url $url/ /index.html;
```

$url: 默认找路由对应的资源。

$url/: 没找到去路径对应的目录下找。

/index.html: 没找到则返回路径下的index.htmml

------

JavaScript的痛点，没有加入类型检测。

------

编程中的共识，错误出现的越早越好。

1. 能在编写时发现，就不要在编译时发现（IDE的优势，本质上是将代码转成ast，再做检查）。
2. 能在编译时发现，就不要在运行时发现（类型检测就能很好的做到这一点）。
3. 能在开发阶段发现错误，就不要在测试阶段发现错误。
4. 能在测试期间发现错误，就不要在上线后发现错误。

------

为JavaScript提供类型检测的2种方案。

- Facebook推出了flow。
- Microsoft推出了TypeScript。

------

TypeScript的定义。如何理解4点。

定义：TypeScript是拥有类型的JavaScript超集，它可以编译成普通，干净，完整的JavaScript代码。

1. TypeScript是加强版的JavaScript。
2. TypeScript支持JavaScript所有特性。在实现新特性的同时，保持ECMAScript的标准同步甚至领先。
3. 语言层面上，不仅增加了类型的约束，还包括了一些语法的扩展，如枚举类型（Enum），元组类型（Tuple）等
4. TypeScript最终会编译成JavaScript代码，不需要担心兼容性问题，也不需要借助babel这样的工具（babe可以加polyfill，为某些浏览器适配打补丁。）

------

TypeScript的特点，3点。

- 始于JavaScript，归于JavaScript。
  - TS可以编译出JS，运行在浏览器，Node，或任何支持ECMAScript3（或更高版本）的JS引擎中。
- 是强大的工具，用于构建大型项目。
- 拥有先进的JavaScript

------

TypeScript转成JavaScript2种方式。

- TypeScript Compiler
- Babel

使用tsc的步骤

1. 安装TypeScript

   ```shell
   npm install typescript -g
   # 查看版本
   tsc --version
   ```

2. 执行命令编译

   ```shell
   tsc demo.ts
   ```

------

写一个简单的案例，使用tsc做转换。

demo.ts

```typescript
let msg: string = 'Hello TypeScript'
function foo(payload: string) {
	console.log(payload.length);	
}
foo('abc')
```

```shell
tsc demo.ts #在目录下生成同名的js文件
```

------

默认情况下，目录下的所有TS文件都是在同一作用域下编译的。有同名变量会报错，

临时解决办法：末尾加上 `export {}`，将文件当作一个模块。

```typescript
let msg: string = 'Hello TypeScript'
export {}
```

------

将TS代码自动转成JS让浏览器或Node执行，2种方式。

- webpack配置本地TypeScript编译环境，开启一个本地服务，直接运行在浏览器上。
- ts-node库，在node中为TypeScript提供执行环境，做了2件事：1.编译。2.在Node下执行。

------

使用ts-node的3个步骤。

1. 安装ts-node

   ```shell
   npm install ts-node -g
   ```

2. 安装需要的依赖：tslib, @types/node 两个包

   ```shell
   npm install tslib @types/node -g
   ```

3. 执行命令，编译和运行

   ```shell
   ts-node demo.ts
   ```

------

使用webpack搭建TS运行环境。

1. 初始化项目，生成 package.json

   ```shell
   npm init
   ```

2. 创建webpack.config.js

3. 配置 entry，output

4. 安装 ts-loader 和 typescript

   ```shell
   npm install ts-loader typescript -D
   ```

5. webpack.config.js 中配置匹配规则。

6. 生成 tsconfig.josn 配置文件

   ```shell
   tsc --init
   ```

7. webpack.config.js中使用 resolve 的 extensions 配置后缀名。默认的也要加上如`'.wasm', '.mjs', '.js', '.json'`。

8. 安装webpack-dev-server

   ```shell
   npm install webpack-dev-server -D
   ```

9. 配置 package.josn `“serve”: "webpack serve"`

10. 安装 html-webpack-plugin，并配置插件，使用html模板。

    ```shell
    npm install html-webpack-plugin -D
    ```

webpack.config.js

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },
  devServer: {
  },
  resolve: {
    // 需要加上后面4个默认的后缀名。
    extensions: [".ts", '.wasm', '.mjs', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
}

```

------

使用TS声明变量的格式和理解，声明一个变量。

格式： var/let/const 标识符: 数据类型 = 赋值

理解：声明了类型后，TypeScript就会进行类型检测，声明的类型可以称之为类型注解。

```typescript
let msg: string = 'Hello TypeScript'
```

------

类型注解小写大写的区别。

小写，如`string`, 是TypeScript中定义的字符串类型，

```typescript
let name: string = 'zzt'
```

大写，如`String`, 表示ECMAscript中定义的一个类，也就是字符串包装类的类型。

```typescript
let msg: String
```

------

tslint的简单使用步骤，2步，

1. 安装

   ```shell
   npm install tslint -D
   ```

2. 初始化

   ```shell
   tslint --init
   ```

用于生成配置文件，规范代码。

------

什么是变量的类型推导（推断）

- 在一个变量第一次赋值时，会根据后面的赋值内容的类型，推导出变量的类型

```typescript
let msg = 'hello' // msg虽然没有类型注解，但依然是一个string类型。
```

