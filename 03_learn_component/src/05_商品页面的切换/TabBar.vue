<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-12 09:48:02
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-05-13 20:32:21
 * @LastEditContent: 
-->
<template>
  <div class="tab-bar">
    <div
      class="tab-bar-item"
      :class="{ active: currentIndex === index }"
      v-for="(title, index) in titles"
      :key="title"
      @click="toggleBar(index)"
    >
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["toggleContent"],
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    toggleBar(index) {
      this.currentIndex = index;
      this.$emit("toggleContent", index);
    },
  },
};
</script>

<style scoped>
.tab-bar {
  display: flex;
}

.tab-bar-item {
  flex: 1;
  text-align: center;
}

.tab-bar-item.active {
  color: red;
}
.tab-bar-item.active span {
  border-bottom: 3px solid red;
  padding: 5px 10px;
}
</style>
