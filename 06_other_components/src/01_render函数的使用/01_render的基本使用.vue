<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 15:01:40
 * @LastEditors: ZeTian
 * @LastEditTime: 2021-11-16 15:15:15
 * @LastEditContent: 
-->
<script>
import { h } from 'vue'
export default {
  /* render() {
    return h('h2', { class: 'title' }, 'Hello Render')
  } */

  setup() {
    return () => {
      return h('h2', { class: 'title' }, 'Hello Render')
    }
  }
}
</script>

<style scoped>
</style>