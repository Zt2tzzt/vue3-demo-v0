<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 15:01:40
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 00:42:09
 * @LastEditContent: 
-->
<script>
import { h } from 'vue'
import HelloFrog from './HelloFrog.vue'
export default {
  render() {
    return h('div', null, [
      h(HelloFrog, null,
        { 
          default: props => h('span', null, `app传入到HelloFrog中的内容：${props.name}`),
          title: props => h('span', null, `app传入到HelloFrog - title中的内容：${props.title}`) 
        },
      )
    ])
  }
}
</script>

<style scoped>
</style>
