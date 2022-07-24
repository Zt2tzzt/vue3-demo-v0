/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-08 10:21:46
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 00:11:51
 * @LastEditContent: 
 */App.vue
import { createApp } from 'vue'
import App from './08_setup顶层编写方式/App.vue'

const app = createApp(App)
/* app.mixin({
  created() {
    console.log('global mixin created')
  }
}) */
app.mount('#app')
