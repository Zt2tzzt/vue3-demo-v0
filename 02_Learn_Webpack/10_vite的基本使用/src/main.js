/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-08 16:11:09
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-08 17:18:02
 * @LastEditContent: 
 */
// import _ from 'lodash-es'
import _ from 'lodash-es'
import { sum } from './js/math'
import mul from './ts/mul'

import './css/style.css'
import './css/title.less'

console.log("Hello World")
console.log(sum(20, 30))
console.log(mul(20, 30))

console.log(_.join(['abc', 'cba'], "-"))

const titleel = document.createElement('div')
titleel.className = 'title'
titleel.innerHTML = 'Hello Vite'
document.body.appendChild(titleel)