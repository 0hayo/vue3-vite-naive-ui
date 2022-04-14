import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(), // 使用history模式
  routes,
})

export default router;