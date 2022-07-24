<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-07 17:23:06
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-11-07 21:37:39
 * @LastEditContent: 
-->
<template>
  <div class="app">
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
    </div>

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <h2 class="title" v-if="isShow">Hello Frog</h2>
    </transition>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    beforeEnter() {
      console.log('beforeEnter')
    },
    enter() {
      console.log('enter')
    },
    afterEnter() {
      console.log('afterEnter')
    },
    beforeLeave() {
      console.log('beforeLeave')
    },
    leave() {
      console.log('leave')
    },
    afterLeave() {
      console.log('afterLeave')
    }
  }
}
</script>


.app {
  width: 200px;
  margin: 0 auto;
}

.title {
  display: inline-block;
}
}
</style>