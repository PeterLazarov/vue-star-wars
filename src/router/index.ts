import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import PeoplePage from '../views/PeoplePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: PeoplePage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
