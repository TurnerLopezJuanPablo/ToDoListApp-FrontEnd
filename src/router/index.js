import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/views/Home.vue'
import Login from '@/components/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

export default router