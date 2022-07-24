/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-03-03 23:14:03
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-03 23:19:52
 * @LastEditContent: 
 */
let str: string
let msg: any
let msg2: unknown
let res: unknown = 'abc'
// str = res // 会报错
msg = res
msg2 = res

if (typeof res == 'string') {
  console.log(res.length) // 不会报错，ts根据上下文做了推导。
}