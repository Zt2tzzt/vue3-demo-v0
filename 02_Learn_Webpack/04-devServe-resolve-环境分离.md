webpack中3种自动编译的方式。

- webpack watch mode
- webpack-dev-server（常用）
- webpack-dev-middleware（中间件）（不常用）

------

webpack 提供了 watch 模式，有什么作用。

- 在该模式下，webpack 依赖图中的所有文件，只要有一个发生了更新，那么代码将被重新编译。

如何开启watch模式：

- 在`webpack.config.json`中添加watch: true

  ```javascript
  module.exports = {
    watch: true
  }
  ```

- 在`package.json`中的script中配置：

  ```json
  "script": {
    "watch": "webpack --watch"
  }
  ```

watch模式有什么缺点：

- 没有具备live loading（热加载）的功能，自动重新编译后需要刷新页面才有效果。

------

webpack-dev-server有什么用：

- 实现项目文件更新后的自动编译和热加载（live loading）。

如何使用webpack-dev-server：

1. 安装webpack-dev-server

   ```shell
   npm install webpack-dev-server -D
   ```

2. 配置`package.json`文件：

   ```json
   "script": {
     "serve": "webpack serve"
   }
   ```

使用webpack-dev-server的注意事项：

- webpack3 以前，需要从webpack-dev-server启动服务，现在有了webpack-cli，当发现命令中有serve，会自动帮助我们启动。。
- webpack-dev-server 会帮助我们基于 express 框架搭建一个本地服务。
- webpack-dev-server 在编译之后不会输出任何文件，而是将打包后的文件保留在内存中。

------

devServer中的`contentBase`已弃用，代替它的是`static`属性，有什么用：

- 指定一个目录进行访问。（在CopyWebpackPlugin中复制的文件，可放在static指定的目录下，在开发阶段使用，而不轻易的对所有资源打包。）

配置devServer中的static：

```javascript
const path = require('path')
module.exports = {
  devServer: {
    // contentBase: "./public"
    static: path.resolve(__dirname, './public')
  }
}
```

------

什么是HMR，2点理解

- HMR全称是Hot Module Replacement，译为模块热替换。
- 指在应用程序运行中，替换，添加，删除模块，而无需刷新整个页面。（模块通常指文件）

HMR的好处，2点：

- 不重新加载页面，保留应用程序某些状态不丢失。
- 只更新变化的内容，节省开发的时间。

如何使用HMR，需要基于 webpack-dev-server 中使用。

1. 配置`webpack.config.json`文件：

   ```javascript
   module.exports = {
     target: "web", // 最好配置，意思是为web环境打包。
     devServer: {
       hot: true
     }
   }
   ```

2. 在编写的代码中，指定哪个模块发生变更时，进行HMR：

   ```javascript
   import './js/util.js' // 需要先引入模块。
   if (module.hot) {
     module.hot.accept("./js/util.js", () => {
       console.log("util更新了")
     })
   }
   ```

------

在实际开发项目时，是否需要经常手动写 module.hot.accept 代码呢？2个例子：

- vue开发中，vue-loader支持vue组件的HMR，提供开箱即用的体验。
- react开发中，react-refresh（React Hot Loader已弃用）实时调整react组件。

------

HMR原理的理解，2方面，理解原理图。

webpack-dev-server会创建两个服务：

- express server 负责直接提供静态资源服务（打包后的资源被浏览器请求和解析）
- Socket Server
  1. webpack compiler 监听到对应模块发生变化时，生成两个文件.json（manifest文件）和.js文件（update chunk）。
  2. 将这两个文件主动发送给客户端（浏览器）
  3. 浏览器通过HMR runtime机制，加载这两个文件，针对修改的模块做更新。

------

理解Socket连接和Http连接的连接过程。

Socket连接：长连接，用于及时通讯（微信，聊天，直播送礼物，进场）

- 经过3次或5次握手，通过心跳包建立连接通道，客户端和服务器可随时互相发送消息。

Http连接，短链接：+

- 客户端发送请求 -> 与服务器建立连接 -> 服务器做出响应 -> 断开连接。

------

devServer中使用host设置主机地址，两个值，区别

- 默认值是locahost：
  - 本质是域名，会被解析为127.0.0.1，它是回环地址（loop back address），意思是主机自己发送的包，被自己接收。
  - 正常的数据包经过应用层-传输层-网络层-数据链路层-物理层，在回环地址中，数据包在网络层被获取到。
- 0.0.0.0：(windows浏览器解析可能会出错。)
  - 监听IPV4上所有的地址，再根据端口找到不同的应用程序。
  - 比如监听0.0.0.0时，同一网段下的主机，通过ip地址可以访问

```javascript
module.exports = {
  devServer: {
    host: '0.0.0.0'
  }
}
```

------

devServer中 port，open，compress 等属性的配置，可用的值含义。

port：设置监听的端口，默认是8080

open：是否打开浏览器：默认是false，设为true自动打开浏览器。

compress：是否为静态文件开启 gzip compression，不会压缩HTML文件，浏览器可自动对gzip格式解压，

```javascript
module.exports = {
  devServer: {
    port: 8000,
    open: true,
    compress: false
  }
}
```



------

跨域问题怎么产生的？

比如一个api请求是`http://localhost:8888`，但本地启动服务器域名是`http://localhost:8000`，这个时候浏览器发送网络请求就会出现跨域问题。

跨域问题的解决办法，3点：

- 将静态资源和api服务器部署在一起。
- 让服务器关闭跨域。
- 使用nginx代理访问静态资源和api

以上方式都需要后端参与，那么在开发中我们如何临时解决跨域问题？

------

devServer 中 proxy 有什么用：

设置代理来解决跨域的问题。将请求发送到代理服务器，代理服务器和api服务器没有跨域问题。

devServer 中的 proxy 怎么配置：

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
				target: 'http://localhost:8888', // 代理的目标地址，默认情况下将代理http://localhost:8888/api这个路径
				pathRewrite: {
					"^/api": '' // 在代理路径中删除掉/api
				},
        secure: false, // 在https的情况下，仍代理，默认为true
        changeOrigin: true // 表示是否更新代理后请求的headers中host地址，默认http://localhost:8000,应该为http://localhost:8888
      }
    }
  }
}
```

------

resolve有什么用：

- 用于设置模块如何被解析，帮助 webpack 从每个 require/import 语句中，找到需要引入的模块，

- webpack 使用 enhanced-resolve 来解析文件路径。

resolve怎么配置：

```javascript
const path = require('path')
module.exports = {
  resolve: {
    // 解析的文件自动添加扩展名
    extensions: ['.wasm', '.mjs', '.js', '.json', '.vue', '.jxs', 'ts'], // 前4个是默认值。
    // 常用的路径起别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
      pages: path.resolve(__dirname, "./src/pages")
    }
  }
}
```

------

webpack能解析的3种路径

- 绝对路径：不需要要进一步解析。
- 相对路径：解析时会拼接上下文路径。
- 模块路径：`resolve.modules`中指定的所有目录，默认是['node_modules']

------

webpack解析时如何确认是文件还是目录？

- 当作是一个文件

  1. 有扩展名，直接打包文件。

  2. 无扩展名，使用`resolve.extensions`选项作为文件扩展名解析。

- 当作是目录

  3. 根据`resolve.mainFiles`配置选项中指定的文件顺序查找，默认值是['index']

  4. 根据`resolve.extensions`来解析扩展名。

------

区分开发和生产环境的`webpack.config.js`步骤

1. 在根目录下建立`config`文件夹

2. 在其中添加三个文件`webpack.comm.config.js`，`webpack.dev.config.js`，`webpack.prod.config.js`

3. 在`webpack.dev.config.js`和`webpack.prod.config.js`中导入`webpack.comm.config.js`并合并。

   ```javascript
   const { merge } = require('webpack-merge') // 先安装，npm install webpack-merge -D
   const commonConfig = require('./webpack.comm.config')
   module.exports = merge(commonConfig, {
     // ...
   })
   ```

4. 修改文件中引用的路径，注意，入口文件路径比较特殊，与 context 属性有关

   ```javascript
   const path = require('path')
   module.exports = {
     context: path.resolve(__dirname, '../'), // 为入口文件设置路径。
     entry: "./src/index.js"
   }
   ```

5. 配置`package.json`文件中的指令

   ```json
   "script": {
     "build": "webpack --config ./config/webpack.prod.config.js",
     "serve": "webpack serve --config ./config/webpack.dev.config.js"
   }
   ```

   

