import type { ApiResponse } from '@/types/request'
import type { UserProfile } from '@/stores/auth'

const mockUser: UserProfile = {
  id: 'u_1001',
  name: 'Admin User',
  role: 'Administrator',
  email: 'admin@example.com',
}

const wait = (duration = 300) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })

const createResponse = <T>(data: T, message = 'success'): ApiResponse<T> => ({
  code: 0,
  message,
  data,
})

export const handleMockRequest = async <T>(
  input: string,
  init?: RequestInit,
): Promise<ApiResponse<T> | null> => {
  await wait()

  const method = (init?.method ?? 'GET').toUpperCase()
  const url = new URL(input, window.location.origin)

  if (url.pathname === '/auth/login' && method === 'POST') {
    return createResponse<T>({
      token: 'mock-admin-token',
      user: mockUser,
    } as T)
  }

  if (url.pathname === '/auth/profile' && method === 'GET') {
    return createResponse<T>(mockUser as T)
  }

  if (url.pathname === '/dashboard/summary' && method === 'GET') {
    return createResponse<T>({
      visits: 12840,
      sales: 342,
      conversionRate: '6.8%',
      notices: [
        '统一请求封装已接入',
        '路由守卫已启用',
        '环境变量已拆分',
      ],
    } as T)
  }

  return null
}
