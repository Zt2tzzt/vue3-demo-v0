/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-25 16:14:09
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-26 21:12:08
 * @LastEditContent: 
 */
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import User from '../pages/User.vue'

const routes = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		children: [
    	// 嵌套路由中，默认路由的path不需要/，redirect需要写完整路径
    	{ path: '', redirect: '/home/product' },
  		{ path: 'product', component: () => import('../pages/HomeProduct.vue') }
    ]
	},
	{
		path: '/about',
		component: About
	},
	{
		path: '/user/:id',
		component: User
	},
	{
		path: '/:pathMatch(.*)',
		component: () => import('../pages/NotFound.vue')
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../pages/login.vue')
	},
]

const router = createRouter({
	routes,
	history: createWebHistory()
})

// 动态添加路由, 一级路由
router.addRoute({
	path: '/category',
	component: () => import('../pages/Category.vue')
})

// 添加二级路由对象
router.addRoute("home", {
  path: "moment",
  component: () => import("../pages/HomeMoment.vue")
})

router.beforeEach((to, from) => {
  // if (to.path.indexOf("/home") !== -1) {
  //   return "/login"
  // }
  if (to.path !== "/login") {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return "/login"
    }
  }
})

export default router