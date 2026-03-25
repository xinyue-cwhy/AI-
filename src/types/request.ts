export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>
  timeout?: number
  skipAuth?: boolean
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
