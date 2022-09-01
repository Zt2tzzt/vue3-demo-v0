/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-04 01:38:16
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-09-01 18:48:57
 * @LastEditContent: 
 */
/**
 * Vue提供了4个指令来进行条件判断，代码实现。
 * v-if
 * v-else-if
 * v-else
 * v-show
 */

/**
 * 双向绑定的指令是v-model，简单案例实现。
 */

/**
 * v-if的渲染原理，3点
 * 1.v-if是惰性的。
 * 2.当条件为false时，内容不会渲染或者被销毁掉。
 * 3.当条件为true时，才会真正渲染。
 */

/**
 * v-show和v-if的区别，3个方面。
 * 1.在用法上：
 * 	v-show不支持template
 * 	v-show不可以和v-else一起使用。
 * 2.本质的区别：
 * 	使用v-show指令的元素会被渲染到DOM，使用CSS的display属性进行切换。
 * 	v-if条件为false时，对应元素不会渲染到DOM中
 * 3.开发中如何做选择：
 * 	如果元素需要在显示和隐藏之间来回切换，使用v-show
 * 	如果不会频繁的发生切换，使用v-if
 */

/**
 * v-for的基本使用，遍历对象的使用，遍历数字的使用，代码实现。
 * 支持遍历数组：
 * 	v-for="item (in/of) arr" / v-for="(item, index) (in/of) arr"
 * 支持遍历对象：
 * 	v-for="value (in/of) obj" / v-for="(value, key) (in/of) obj" / v-for="(value, key, index) (in/of) obj"
 * 支持遍历数字：
 * 	v-for="num (in/of) 10" / v-for="(num, index) (in/of) 10"
 */

/**
 * v-if和v-for都可以和template结合使用。
 */

/**
 * Vue的响应式系统能够侦听到的修改数组的方法，7个。实现简单案例。
 * push()：将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
 * pop()：从数组中删除最后一个元素，并返回该元素的值。
 * shift()：从数组中删除第一个元素，并返回该元素的值。
 * unshift()：将一个或多个元素添加到数组的开头，并返回该数组的新长度。
 * splice()：通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容
 * sort()：对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的
 * reverse()：将数组中元素的位置颠倒，并返回该数组
 */

/**
 * 举例3个会生成新数组的方法。
 * filter()：传入回调函数，过滤数组。
 * concat()：合并两个或多个数组。
 * slice()：返回由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）
 */

/**
 * 使用 v-for 通常会给元素绑定 key 属性。
 */

/**
 * 理解VNode概念，4点，VNode最大好处是可以做跨平台适配。
 * 1.VNode全称是Virtual Node，也就是虚拟节点。
 * 2.无论组件还是元素，在Vue中表现出来的都是VNode。
 * 3.VNode本质是一个JavaScript对象。
 * 4.渲染过程：template -> VNode -> 真实DOM
 */

/**
 * 什么是虚拟DOM，2点理解。
 * 1.虚拟DOM就是一大堆VNode元素组成的VNode Tree
 * 2.不考虑组件的情况，虚拟DOM中的VNode和真实DOM中的元素一一对应。
 */

/**
 * 根据“插入F”案例理解diff算法，有无key分别使用的方法。及不同情况的算法细节。
 * 有无key分别使用的方法。源码位置：packages -> runtime-core -> src -> renderer.ts
 * 有key，使用patchKeyedChildren方法。5步
 * 	1.while循环从头比较新旧VNodes节点元素的type（tag）和key，遇到相同节点就继续，遇到不同节点就跳出。
 * 	2.while循环从尾比较新旧VNodes节点元素的type（tag）和key，遇到相同节点就继续，遇到不同节点就跳出。
 * 	3.如果新节点更多，使用null与新节点做patch操作（相当于挂载）。
 * 	4.如果旧节点更多，则使用unmount方法卸载旧节点。
 * 	5.如果中间存在无序的节点位置序列，会使用key建立索引，尽量用旧节点匹配新节点，没匹配到的旧节点则卸载，没匹配到的新节点则新增。
 * 没key，使用patchUnKeyedChildren方法。3步
 * 	1.取到旧VNodes和新VNodes，比较两者长度，取小的那个遍历。
 * 	2.遍历时，依次将新VNode与旧VNode做patch操作，有不同的元素则更新，
 * 	3.遍历完后，旧VNodes中元素比较多，则卸载多余的元素。新VNodes比较多，则更新多余元素。
 */