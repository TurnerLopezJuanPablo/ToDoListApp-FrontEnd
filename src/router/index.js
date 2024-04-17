import { createRouter, createWebHistory } from 'vue-router'

// Components
import Home from '@/components/views/Home.vue'
import Login from '@/components/Login.vue'
import Assigned from '@/components/views/CommonViews/Assigned.vue'
import Board from '@/components/views/CommonViews/Board.vue'
import Calendar from '@/components/views/CommonViews/Calendar.vue'
import Completed from '@/components/views/CommonViews/Completed.vue'
import Favorites from '@/components/views/CommonViews/Favorites.vue'
import Settings from '@/components/views/CommonViews/Settings.vue'
import TasksDueSoon from '@/components/views/CommonViews/TasksDueSoon.vue'
import TasksForToday from '@/components/views/CommonViews/TasksForToday.vue'

// Routes
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      sensitive: true 
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      sensitive: true 
    },
    {
      path: '/assigned',
      name: 'assigned',
      component: Assigned,
      sensitive: true 
    },
    {
      path: '/board/:id(\\d+)',
      name: 'board',
      component: Board,
      sensitive: true 
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
      sensitive: true 
    },
    {
      path: '/completed',
      name: 'completed',
      component: Completed,
      sensitive: true 
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
      sensitive: true 
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      sensitive: true 
    },
    {
      path: '/tasksDueSoon',
      name: 'tasksDueSoon',
      component: TasksDueSoon,
      sensitive: true 
    },
    {
      path: '/tasksForToday',
      name: 'tasksForToday',
      component: TasksForToday,
      sensitive: true 
    },
  ]
})

export default router