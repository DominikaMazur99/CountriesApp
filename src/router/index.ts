import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'mainPage',
        component: () => import('../views/MainPage.vue'),
      },
      {
        path: '/details/:countryName',
        name: 'detailsView',
        component: () => import('../views/DetailsView.vue'),
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
