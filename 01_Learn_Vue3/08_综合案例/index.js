/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-09-18 11:36:40
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-19 12:27:41
 * @LastEditContent: 
 */
const app = {
  template: '#my-app',
  data() {
    return {
      books: [
        {
          id: 1,
          name: '《算法导论》',
          date: '2006-9',
          price: 85.00,
          count: 1
        },
        {
          id: 2,
          name: '《UNIX编程艺术',
          date: '2006-2',
          price: 59.00,
          count: 1
        },
        {
          id: 3,
          name: '《编程珠玑》',
          date: '2008-10',
          price: 39.00,
          count: 1
        },
        {
          id: 4,
          name: '《代码大全》',
          date: '2006-3',
          price: 128.00,
          count: 1
        }
      ]
    }
  },
  watch: {

  },
  computed: {
    // vue2: filter/map/reduce
    totalPrice() {
      let finalPrice = 0
      for (const book of this.books) {
        finalPrice += book.count * book.price
      }
      return '￥' + finalPrice
    },
    // Vue3不支持过滤器，推荐两种做法：使用计算属性/使用全局方法
    /* filteBooks() {
      return this.books.map(item => {
        const newItem = Object.assign({}, item)
        newItem.price = '￥' + item.price
        return newItem
      })
    } */
  },
  methods: {
    decrement(index) {
      this.books[index].count--
    },
    increment(index) {
      this.books[index].count++
    },
    removeBook(index) {
      this.books.splice(index, 1)
    },
    formatPrice(price) {
      return '￥' + price
    }
  }
}
Vue.createApp(app).mount('#app')