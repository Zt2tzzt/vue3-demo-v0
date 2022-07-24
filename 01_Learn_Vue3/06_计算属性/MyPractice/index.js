/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-04 20:42:48
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-05-05 21:49:39
 * @LastEditContent: 
 */
/**
 * 计算属性选项，类型，2种用法，代码实现
 * 	选项：computed
 * 	类型：{ [key: string]: Function | { get: Function, set: Function } }
 */

/**
 * 计算属性和 methods 的区别，2点
 * 1.计算属性有缓存。
 * 2.计算属性在模板语法中更优雅（不用写()）
 */

/**
 * 计算属性缓存的理解，3点：
 * 1.计算属性会基于依赖关系做缓存。
 * 2.依赖的数据不发生变化时，计算属性不需要重新计算。
 * 3.依赖的数据变化，计算属性会重新计算。
 */

/**
 * 处理计算属性源码的理解：
 * 	会判断选项内容是否为一个函数，是则绑定一个publicThis，不是则会取选项的get属性判断是否为方法。
 */

/**
 * 侦听器的选项，类型，基本使用，深度侦听4种使用，案例实现。
 * 选项：watch
 * 类型：{ [key: string]: string | Function | Object | Array}
 */

/**
 * 默认情况下，侦听器只能侦听对象引用的变化。对象中属性发生改变，newVal和oldVal相同。
 */

/**
 * 书籍购物车案例实现。
 */
