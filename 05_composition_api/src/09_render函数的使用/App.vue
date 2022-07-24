<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 14:21:01
 * @LastEditors: ZeTian
 * @LastEditTime: 2021-11-16 14:32:43
 * @LastEditContent: 
-->
<script>
import { h } from 'vue'
export default {
  setup() {
    return () => h('h2', { class: 'title' }, 'Hello Render')
  }
}

</script>

<style scoped>
</style>