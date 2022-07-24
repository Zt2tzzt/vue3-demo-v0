/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-02 10:53:52
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-05 16:30:47
 * @LastEditContent: 
 */
import { sum } from './js/math'
const { priceFormat } = require('./js/format')
import './js/element'

console.log(sum(20, 30))
console.log(priceFormat())

const message = 'Hello World'
const names = ['abc', 'cba', 'nba']

names.forEach(item => console.log(item))
console.log(message)