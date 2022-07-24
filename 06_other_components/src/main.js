/*
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 15:00:15
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 23:08:51
 * @LastEditContent: 
 */
import { createApp } from 'vue'
import App from './03_自定义指令/App.vue'
import registerDirective from './directives/index'
import pluginObject from './plugins/plugins_object'
import pluginFunction from './plugins/plugins_function'

const app = createApp(App)

// registerDirective(app)
app.use(registerDirective)

// 调用pluginObject对象中的install方法，并传入app
app.use(pluginObject)
// 调用pluginFunction函数，并传入app
app.use(pluginFunction)

app.mount('#app')
