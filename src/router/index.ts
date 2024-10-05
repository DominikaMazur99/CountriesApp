import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'mainPage',
    component: () => import('@/views/MainPage.vue'),
  },
  {
    path: '/details',
    name: 'detailsView',
    component: () => import('@/views/DetailsView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
