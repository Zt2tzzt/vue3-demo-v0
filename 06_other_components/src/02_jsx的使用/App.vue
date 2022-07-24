<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 15:45:10
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 13:33:48
 * @LastEditContent: 
-->
<script>
import HelloFrog from "./HelloFrog.vue";
import { ref } from 'vue'
export default {
  /* data() {
    return {
      counter: 0
    }
  }, */

  setup() {
    const counter = ref(0)
    const increment = () => counter.value++
    const decrement = () => counter.value--
    function render() {
      return (
        <div>
          <h2>当前计数：{counter.value}</h2>
          <button onClick={increment}>+1</button>
          <button onClick={decrement}>-1</button>
          <HelloFrog>
            {{
              default: props => <button>{props.name}</button>,
                title: props => <button>{props.title}</button>
            }}
          </HelloFrog>
        </div>
      )
    }

    return render
  }

}
</script>