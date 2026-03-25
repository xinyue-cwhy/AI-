import type { ApiResponse, RequestConfig } from '@/types/request'

import { handleMockRequest } from '@/mock/server'
import { pinia } from '@/stores'
import { useAuthStore } from '@/stores/auth'

const baseURL = import.meta.env.VITE_API_BASE_URL
const defaultTimeout = Number(import.meta.env.VITE_REQUEST_TIMEOUT || 10000)
const useMock = import.meta.env.VITE_USE_MOCK === 'true'

const buildURL = (url: string, params?: RequestConfig['params']) => {
  const target = new URL(url, baseURL)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return
      }

      target.searchParams.set(key, String(value))
    })
  }

  return target.toString()
}

export const request = async <T>(url: string, config: RequestConfig = {}) => {
  const controller = new AbortController()
  const timeout = window.setTimeout(
    () => controller.abort(),
    config.timeout ?? defaultTimeout,
  )

  const authStore = useAuthStore(pinia)
  const headers = new Headers(config.headers)

  headers.set('Content-Type', 'application/json')

  if (!config.skipAuth && authStore.token) {
    headers.set('Authorization', `Bearer ${authStore.token}`)
  }

  const finalURL = buildURL(url, config.params)
  const finalConfig: RequestInit = {
    ...config,
    headers,
    signal: controller.signal,
  }

  try {
    if (useMock) {
      const mocked = await handleMockRequest<T>(finalURL, finalConfig)

      if (mocked) {
        return mocked.data
      }
    }

    const response = await fetch(finalURL, finalConfig)
    const result = (await response.json()) as ApiResponse<T>

    if (!response.ok || result.code !== 0) {
      throw new Error(result.message || 'Request failed')
    }

    return result.data
  } finally {
    window.clearTimeout(timeout)
  }
}
