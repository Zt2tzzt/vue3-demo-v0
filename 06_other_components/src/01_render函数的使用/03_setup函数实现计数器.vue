<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 15:01:40
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 00:32:43
 * @LastEditContent: 
-->
<script>
import { ref, h } from 'vue'
export default {
  setup() {
    const counter = ref(0)

    return function render() {
      return h('div', { class: 'app' }, [
        h('h2', null, `当前计数: ${counter.value}`),
        h('button', { 'onClick': () => counter.value++ }, '+1'),
        h('button', { 'onClick': () => counter.value-- }, '-1'),
      ])
    }
  }
}
</script>

<style scoped>
</style>
