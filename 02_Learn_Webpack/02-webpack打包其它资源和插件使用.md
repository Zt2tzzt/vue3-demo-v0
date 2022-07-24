加载文件时可使用 file-loader 和 url-loader，

file-loader 作用：

- 处理 import / require() 方式引入的一个文件资源，将它放到输出的文件夹中。

url-loader 作用：

- 和 file-loader 工作方式相似，默认情况下会把文件转成 base64 URL。

url-loader 可以取代 file-loader。

以上2个 loader，webpack5 中已不推荐使用。

------

匹配图片文件的正则表达式：`/\.(jpe?g|png|gif|svg)$/`

------

为什么有些资源不直接引用路径，而是通过import引入？

- 因为只有将文件当作一个模块导入，才能被 file-loader 识别，并执行解析和打包

------

用于文件名配置的 placeHolders，6个

- [ext]：处理文件的扩展名。
- [name]：处理文件的名称。
- [hash]：文件的内容，使用 MD4 的散列函数处理，生成的一个128位的 hash 值（32个十六进制）
- [contentHash]：在 file-loader 中和[hash]结果是一致的。
- [hash:<length>]：截图 hash 的长度，默认32个字符太长了。
- [path]：文件相对于 webpack 配置文件的路径。

------

在配置中设置 file-loader 文件路劲和名称：

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            // outputPath: 'img', // 可在name中直接设置。
            name: 'img/[name]_[hash:8].[ext]'
          }
        }
      }
    ]
  }
}
```

------

在开发中为什么需要使用 base64 编码的图片：

- 因为小的图片转换 base54 后可以与页面一起被请求，减少不必要的请求过程。

------

url-loader 配置某个数值大小的图片转成 base64：

```javascript
{
  test: /\.(jpe?g|png|gif|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: 'img/[name]_[hash:8].[ext]',
      limit: 10 * 1024, // 大于10kb的图片不会做base64转换。
    }
  }
}
```

------

webpack5 中内置的资源模块类型（asset module type）4个，作用

- asset/resource：发送一个单独的文件并导出 URL，之前通过使用 file-loader 实现。
- asset/inline：导出一个资源的 data URL，之前通过使用 url-loader 实现。
- asset/source：导出资源的源代码，之前通过使用 raw-loader 实现。
- asset：在导出一个data URL 和发送一个单独的文件之间自动选择，之前通过使用url-loader，并且配置资源体积限制实现。

------

使用 asset module type配置文件名和路径，2种，实现limit效果。

```javascript
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: 'js/bundle.js',
    assetModuleFilename: 'img/[name]_[hash:6][ext]' // [ext]前不用加.
  },
  module: {
    rules: [
      {
        test: '/\.(jpe?g|png|gif|svg)$/',
        type: 'asset',
      /*generator: {
          filename: 'img/[name]_[hash:6][ext]' // 后缀名可省略.
        },*/ // 也可在 output -> assetModuleFilename 中配置。
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 实现url-loader的limit效果。
          }
        }
      }
    ]
  }
}
```

------

打包字体的2种方式：

1. 可以使用 file-loader 来处理：

   ```javascript
   {
     test: /\.(eot|ttf|woff2?)$/,
     use: {
       loader: 'file-loader',
       options: {
         name: 'font/[name]_[hash:8].[ext]',
       }
     }
   }
   ```

2. 推荐使用 asset module type 来处理：

   ```javascript
   {
     test: /\.(eot|ttf|woff2?)$/,
     type: 'asset/resource',
     generator: {
       filename: 'font/[name]_[hash:6][ext]'
     }
   }
   ```

------

plugin 有什么用，它贯穿于 webpack 的整个生命周期，理解作用图。

- Plugin 可以用于执行更加广泛的任务，比如打包优化，资源管理，环境变量注入等。

------

ClearWebpackPlugin 的作用。

- 每次重新打包后，自动删除原有的 dist 文件夹。

使用步骤，2步：

1. 安装插件

   ```shell
   npm install clean-webpack-plugin -D
   ```

2. 在插件中配置：

   ```javascript
   const { cleanWebpackPlugin } = require('clean-webpack-plugin')
   module.exports = {
     plugins: [
       new CleanWebpackPlugin
     ]
   }
   ```

------

HtmlWebpackPlugin 的作用，

- 对 html 文件进行打包处理。

使用步骤，2步：

1. 安装插件

   ```shell
   npm install html-webpack-plugin -D
   ```

2. 在插件中配置，默认会根据插件中的一个ejs模板来生成。其中使用`<%= 变量 %>`来做数据填充。

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   module.exports = {
     plugin: [
       new HtmlWebpackPlugin({
         title: 'Hello Frog', // head -> title 元素值
         template: './public/index.html' // 制定模板文件路径。
       })
     ]
   }
   ```

------

DefinePlugin 的作用，它是 webpack 默认提供的插件。

- 允许在编译时创建配置的全局变量。

使用步骤：

```javascript
const { DefinePlugin } = require('webpack')
module.exports = {
  plugins: [
    new DefinePlugin({
      BASE_URL: '"./"' // 给全局变量BASE_URL赋值。（value是变量名，如果要直接赋值，需要再加一层引号）
    })
  ]
}
```

------

CopyWebpackPlugin 插件的作用：

- 将指定的文件，复制到 dist 文件夹中。

使用步骤，2步：

1. 安装 CopyWebpackPlugin 插件：

   ```shell
   npm install copy-webpack-plugin -D
   ```

2. 在插件中配置：

   ```javascript
   const CopyWebpackPlugin = require('copy-webpack-plugin')
   module.exports = {
     plugins: [
       new CopyWebpackPlugin({
         patterns: [
           {
             from: 'public',
             to: './', // 可省略，代表打包文件夹目录下（dist）
             globOptions: {
               ignore: [
                 '**/index.html' // 忽略public目录下所有的index.html文件。
               ]
             }
           }
         ]
       })
     ]
   }
   ```

------

在`webpack-config.js`文件中配置 node 和 devtool，分别由什么样

```javascript
module.exports = {
  mode: 'development',
  devtool: 'source-map'
}
```

mode：可告知 webpack 使用响应模式的内置优化：

- production：默认值，准备打包上线的时候，设置.打包的文件会被压缩和丑化。
- development：devlopment 开发阶段，会设置 devlopment
- none：不使用任何默认优化选项。

devtool：选择一种源映射方式，

- 在开发时，一般选择 source-map，建立js映射文件，方便调试代码和错误

