export interface SMSRecord {
  id: string
  phoneNumber: string
  message: string
  status: 'success' | 'failed'
  createdAt: string
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  message?: string
} 