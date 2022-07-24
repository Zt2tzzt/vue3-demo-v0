<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 15:01:40
 * @LastEditors: ZeTian
 * @LastEditTime: 2021-11-16 15:29:03
 * @LastEditContent: 
-->
<script>
import { h } from 'vue'
export default {
  data() {
    return {
      counter: 0
    }
  },
  render() {
    return h('div', { class: 'app' }, [
      h('h2', null, `当前计数: ${this.counter}`),
      h('button', { 'onClick': () => this.counter++ }, '+1'),
      h('button', { 'onClick': () => this.counter-- }, '-1'),
    ])
  }
}
</script>

<style scoped>
</style>
