import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Myorder from '@/views/myorder'
import Pay from '@/views/pay'
import Prodetail from '@/views/prodetail'
import Search from '@/views/search/index'
import SearchList from '@/views/search/list'
import Home from '@/views/layout/home'
import Cart from '@/views/layout/cart'
import Category from '@/views/layout/category'
import User from '@/views/layout/user'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      // 重定向
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/cart', component: Cart },
        { path: '/category', component: Category },
        { path: '/user', component: User }
      ]
    },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay },
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchList', component: SearchList }
  ]
})
// 全局前置路由守卫
// 当登录之后才能进入支付页和订单页
const authUrl = ['/pay', 'myorder']

router.beforeEach((to, from, next) => {
  // 1. to 往哪里去， 到哪去的路由信息对象
  // 2. from 从哪里来， 从哪来的路由信息对象
  // 3. next() 是否放行
  // 如果next()调用，就是放行
  //   next(路径) 拦截到某个路径页面
  // console.log(to, from, next)
  // 非权限页面全部放行
  // const token = store.state.user.userInfor.token
  const token = store.getters
  if (!authUrl.includes(to.path)) {
    next()
  }
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
