import { request } from '@/utils/request'
import type { UserProfile } from '@/stores/auth'

interface LoginPayload {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  user: UserProfile
}

export const loginApi = (payload: LoginPayload) =>
  request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    skipAuth: true,
  })

export const getProfileApi = () =>
  request<UserProfile>('/auth/profile', {
    method: 'GET',
  })
