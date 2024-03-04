
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import SceneryPage from '/@/views/scenery/index.vue'
import SpotDetail from '/@/views/scenery/SpotDetail.vue';
import MapPage from '../views/main/visualization/MapPage.vue';
import MainPage from '../views/main/MainPage.vue';
import { useStore } from "/@/store/modules/user";
// 配置路由信息
const routes: RouteRecordRaw[] = [


  {
    path: '/',
    redirect: '/home',
    component: MainPage,
    children: [
      {
        path: '', // 空路径，表示当访问 '/home' 时，默认渲染这个子组件  
        component: MapPage,
      },

    ],
  },

  {
    path: '/scenery',
    component: MainPage,
    children: [
      {
        path: '',
        name: 'SceneryPage',
        component: SceneryPage
      },
      {
        // 只有这个路由需要登陆才能访问，路由守卫怎么写
        path: 'detail',
        name: 'SpotDetail',
        component: SpotDetail
      },

    ]
  },

  {
    name: 'login',
    path: '/login',
    component: () => import('/@/views/login/index.vue'),

  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

/**
 * 在 Vue.js 和 Vue Router 中，useStore 是一个在 Vue 组件的 setup 函数内部使用的函数，因为它依赖于组件的上下文。
 * 当你在组件的 setup 函数中使用 useStore 时，它可以访问到组件关联的 Pinia store 实例。
当你在全局作用域（如路由守卫）中直接调用 useStore，它会尝试在当前上下文中查找一个与之关联的 Vue 组件实例。
由于路由守卫不是 Vue 组件的一部分，它没有关联的组件实例，因此 useStore 在这种情况下无法正常工作。
这就是为什么在路由守卫内部调用 useStore 是可行的，而在外部调用则不行。
在守卫内部，useStore 能够访问到当前路由导航的上下文，并据此决定导航行为。* 
 */

router.beforeEach((to, from, next) => {
  // 写在这里才行，写在外面就不行了，
  /**
   * 这样它就可以访问到与当前路由导航相关的 Vue 组件上下文（尽管在这种情况下，实际上并没有一个组件上下文，
   * 但是 Pinia 设计成可以在非组件上下文中工作，只要它被正确地初始化并传入）。
   */
  const store = useStore()
  if (to.path === '/scenery/detail' && !store.isLoggedIn) {
    next('/login')
  }
  else {
    next()
  }
})
export default router
