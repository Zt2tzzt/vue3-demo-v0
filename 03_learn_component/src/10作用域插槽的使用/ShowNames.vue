<!--
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-13 13:49:39
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-13 14:51:32
 * @LastEditContent: 
--><template>
  <div>
    <span v-for="(item, index) in names" :key="item">
      <slot :item="item" :index="index" />
      <!-- <slot name="zzt" /> -->
    </span>
  </div>
</template>

<script>
export default {
  props: {
    names: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
</style>