/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-09-30 15:56:01
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-09-30 16:10:38
 * @LastEditContent: 
 */
// 对象的引用赋值
/* const info = {name: 'zzt', age: 18}
const obj = info;
info.name = 'Lingard'
console.log(obj.name) */

// 对象的浅拷贝
const info1 = { name: 'zzt', age: 18, friend: {name: 'Lingard'} }
const obj1 = Object.assign({}, info1)
// 引入第三方 lodash 包后
// const obj1 = _.clone(info1)
info1.name = 'Lingard'
console.log(obj1.name)
info1.friend.name = 'Ronaldo'
console.log(obj1.friend.name)

// 对象的深拷贝
// 引入第三方 lodash 包后
// _.cloneDeep(info2)
const info2 = {name: 'zzt', age: 18, friend: {name: 'Lingard'}}
const obj2 = JSON.parse(JSON.stringify(info2))
info2.friend.name = 'Ronaldo'
console.log(obj2.friend.name)
