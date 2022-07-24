<!--
 * @Description: file content
 * @Author: ZeTian
 * @Date: 2021-11-16 15:46:12
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-20 01:05:28
 * @LastEditContent: 
-->
<script>
export default {
  setup(props, { slots }) {
    function render() {
      return (
        <div>
          <h2>Hello Frog</h2>
          {slots.default ? slots.default({ name: 'zzt' }) : <span>哈哈哈</span>}
          {slots.title ? slots.title({ title: 'title' }) : <span>嘿嘿嘿</span>}
        </div>
      )
    }
    return render
  }
}
</script>