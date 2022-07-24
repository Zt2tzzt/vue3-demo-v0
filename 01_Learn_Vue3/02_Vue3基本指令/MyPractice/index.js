/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-02 22:32:05
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-05-03 22:11:28
 * @LastEditContent: 
 */

/**
 * methods里方法中的this指向什么
 * 	methods中的this是响应式原理中劫持的组件实例data返回的对象。
 */

/**
 * 如何生成代码片段，2点。
 * 1.复制代码，来到https://snippet-generator.app/
 * 2.在file -> Preference -> use snippets做设置
 */

/**
 * Mustache语法中可以写4种类型的代码，代码实现
 * 1.变量名。
 * 2.表达式。
 * 3.函数。
 * 4.计算属性。
 */

/**
 * v-once，v-text，v-html的作用，在代码中实现。
 * v-once：将所有元素/组件以及所有子元素视为静态内容，可用于性能优化。
 * v-text：用于更新元素的textContent
 * v-html：将文本内容解析成html代码。
 */

/**
 * v-pre，v-cloak的作用，在代码中实现：
 * v-pre：用于跳过元素及其子元素的编译过程，显示原始的Mustache标签。
 * v-cloak：这个指令保存在元素上，直到关联组件实例编译完成。
 */

/**
 * v-bind是作用，语法糖，预期，修饰符
 * 作用：动态的绑定一个或多个属性，或一个组件prop
 * 语法糖：:
 * 预期：（变量名，表达式，函数，计算属性），对象，数组
 * 修饰符：.camel，将连字符转为驼峰写法。
 */

/**
 * Vue3中允许template中有多个根元素。
 */

/**
 * v-bind的基本使用，对象语法3种，数组语法3种。代码实现。
 */

/**
 * v-bind对象语法和数组语法的特点：
 * 	用于class的对象语法中value必须是Boolean类型的值。
 * 	对象中的value(除用于class的对象语法）和数组中的值，如果不用双引号，则表示动态绑定变量
 * v-bind对象语法绑定style的注意事项：
 * 	对象的key如果使用”-“连接，则需要使用双引号字符串，或者使用驼峰。
 */

/**
 * v-bind动态绑定属性名称的使用。直接给元素绑定属性的使用。代码实现
 */

/**
 * v-on的作用，语法糖，预期，参数，修饰符。
 * 作用：绑定监听事件
 * 语法糖：@
 * 预期：函数，表达式，对象
 * 参数：event，
 * 修饰符：.stop，.prevent，...
 */

/**
 * v-on的基本使用，绑定一个表达式，绑定一个对象，代码实现。
 */

/**
 * v-on传递参数的2种情况。
 * 1.方法不写()，默认传递event参数。
 * 2.如果需要既要用event也要传入参数，方法应写成foo($event, parm)
 */
