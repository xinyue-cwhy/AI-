import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { loginApi, getProfileApi } from '@/api/auth'

const TOKEN_KEY = 'admin_token'

export interface UserProfile {
  id: string
  name: string
  role: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) ?? '')
  const profile = ref<UserProfile | null>(null)

  const isAuthenticated = computed(() => Boolean(token.value))

  const setToken = (value: string) => {
    token.value = value
    if (value) {
      localStorage.setItem(TOKEN_KEY, value)
      return
    }

    localStorage.removeItem(TOKEN_KEY)
  }

  const fetchProfile = async () => {
    if (!token.value) {
      profile.value = null
      return null
    }

    const data = await getProfileApi()
    profile.value = data
    return data
  }

  const login = async (payload: { username: string; password: string }) => {
    const data = await loginApi(payload)
    setToken(data.token)
    profile.value = data.user
    return data
  }

  const logout = () => {
    setToken('')
    profile.value = null
  }

  return {
    token,
    profile,
    isAuthenticated,
    fetchProfile,
    login,
    logout,
  }
})
