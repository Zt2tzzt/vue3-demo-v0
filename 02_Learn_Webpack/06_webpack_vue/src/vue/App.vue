<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-05 19:24:22
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-06 11:42:37
 * @LastEditContent: 
-->
<template>
  <div>
    <h2>我是vue渲染出来的</h2>
    <h2>{{title}}</h2>
    <hello-world />
  </div>
</template>

<script>
  import HelloWorld from './HelloWorld.vue'

  export default {
    components: {
      HelloWorld
    },
    data() {
      return {
        title: 'Hello World'
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  h2 {
    color: red
  }
</style>