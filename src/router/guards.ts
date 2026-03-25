import type { Router } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { pinia } from '@/stores'

const WHITE_LIST = new Set(['/login'])

export const setupRouterGuards = (router: Router) => {
  router.beforeEach(async (to) => {
    const authStore = useAuthStore(pinia)

    if (to.meta.title) {
      document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`
    }

    if (WHITE_LIST.has(to.path)) {
      if (to.path === '/login' && authStore.isAuthenticated) {
        return '/dashboard'
      }

      return true
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return {
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      }
    }

    if (authStore.isAuthenticated && !authStore.profile) {
      try {
        await authStore.fetchProfile()
      } catch {
        authStore.logout()
        return '/login'
      }
    }

    return true
  })
}
