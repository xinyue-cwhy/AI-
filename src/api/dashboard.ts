import { request } from '@/utils/request'

export interface DashboardSummary {
  visits: number
  sales: number
  conversionRate: string
  notices: string[]
}

export const getDashboardSummaryApi = () =>
  request<DashboardSummary>('/dashboard/summary', {
    method: 'GET',
  })
