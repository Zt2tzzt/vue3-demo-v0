<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-07 21:52:02
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-16 18:07:38
 * @LastEditContent: 
-->
<template>
  <div>
    <button @click="addNum">添加数字</button>
    <button @click="removeNum">删除数字</button>
    <button @click="shuffle">数字洗牌</button>
    <transition-group tag="p" name="zzt">
      <span v-for="item in numbers" :key="item" class="item">{{ item }}</span>
    </transition-group>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: '',
  data() {
    return {
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      numberCounter: 10
    }
  },
  methods: {
    // 新增数字
    addNum() {
      this.numbers.splice(this.randomIndex(), 0, this.numberCounter++)
    },
    // 删除数字
    removeNum() {
      this.numbers.splice(this.randomIndex(), 1)
    },
    // 数字洗牌
    shuffle() {
      this.numbers = _.shuffle(this.numbers)
    },
    // 获取随机数
    randomIndex() {
      return Math.floor(Math.random() * this.numbers.length)
    }
  },
}
</script>

<style scoped>
.item {
  margin-right: 10px;
  display: inline-block;
}
.zzt-enter-from,
.zzt-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.zzt-enter-active,
.zzt-leave-active {
  transition: all 1s ease;
}

.zzt-leave-active {
  /*使移除的元素脱离标准流，实现流畅的动画效果。*/
  position: absolute;
}

.zzt-move {
  /*不需要告知transform的具体大小，vue会自动帮助我们处理。*/
  transition: transform 1s ease;
}
</style>