<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-11 14:14:23
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-11 15:20:06
 * @LastEditContent: 
-->
<template>
  <div id="app">
    <show-message title="哈哈哈" content="我试哈哈哈" />
    <!-- 父组件传递值时，传递的变量名如果是驼峰名命，最好使用'-'符号连接 -->
    <show-message
      :title="title"
      :content="content"
      :message-info="messageInfo"
      class="zzt"
      id="Lingard"
    />
    <show-message :title="message.title" :content="message.content" />
    <show-message v-bind="message" />
  </div>
</template>

<script>
import ShowMessage from "./ShowMessage.vue";
export default {
  components: {
    ShowMessage,
  },
  data() {
    return {
      title: "嘻嘻嘻",
      content: "我是嘻嘻嘻",
      message: {
        title: "嘿嘿嘿",
        content: "我试嘿嘿嘿",
      },
      messageInfo: "abc",
    };
  },
};
</script>

<style scoped>
</style>