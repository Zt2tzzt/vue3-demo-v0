/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-02 10:53:52
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-06 11:57:48
 * @LastEditContent: 
 */
import { sum } from './js/math'
const { priceFormat } = require('./js/format')
import './js/element'
// import { createApp } from 'vue/dist/vue.esm-bundler'
// 当编写vue的SFC文件时，可这样引用。
import { createApp } from 'vue'

import App from './vue/App.vue'

console.log(sum(20, 30))
console.log(priceFormat())

const message = 'Hello World'
const names = ['abc', 'cba', 'nba']

names.forEach(item => console.log(item))
console.log(message) 

/* const app = createApp({
  template: '#my-app',
  data() {
    return {
      title: 'Hello World'
    }
  }
}) */
const app = createApp(App)
app.mount('#app')