import { paths } from '@/constants/paths'
import { useUserStore } from '@/stores/user'
import { DashboardCourseManagement, DashboardOverview, Login } from '@/views'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },

    {
      path: paths.overview,
      name: 'courses',
      component: DashboardOverview,
      meta: { requiresAuth: true }
    },

    {
      path: paths.courses,
      name: 'courses-management',
      component: DashboardCourseManagement,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard to protect routes
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isAuthenticated()) {
    next({ name: 'login' })
  } else if (to.name === 'login' && userStore.isAuthenticated()) {
    next({ name: 'courses' })
  } else {
    next()
  }
})

export default router
