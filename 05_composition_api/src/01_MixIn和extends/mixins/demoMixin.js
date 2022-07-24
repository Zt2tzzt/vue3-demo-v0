/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-11-08 10:29:31
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-17 15:33:44
 * @LastEditContent:
 */
export const demoMixin = {
  data() {
    return {
      message: 'Hello mixin',
      title: 'Mixin title'
    }
  },
  methods: {
    foo() {
      console.log('demo mixin foo')
    }
  },
  created() {
    console.log('执行了 demo mixin created')
  }
}