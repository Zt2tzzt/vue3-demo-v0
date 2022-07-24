<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 15:29:32
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 00:41:12
 * @LastEditContent: 
-->
<script>
import { h } from 'vue'
export default {
  render() {
    return h('div', null, [
      h('h2', null, 'Hello Frog'),
      this.$slots.default ? this.$slots.default({ name: 'zzt' }) : h('span', null, '我是Hello Frog组件的插槽默认值'),
      this.$slots.title ? this.$slots.title({ title: 'abaaba' }) : h('span', null, '我是Hello Frog - tilte组件的插槽默认值')
    ])
  }
}
</script>

<style scoped>
</style>