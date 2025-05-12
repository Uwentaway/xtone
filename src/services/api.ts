import axios from 'axios'
import type { SMSRecord, APIResponse } from '@/types'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message
    return Promise.reject(new Error(message))
  }
)

export async function sendSMS(phoneNumber: string, message: string): Promise<void> {
  await api.post<APIResponse<void>>('/sms/send', {
    phoneNumber,
    message,
  })
}

export async function getHistory(): Promise<SMSRecord[]> {
  const response = await api.get<APIResponse<SMSRecord[]>>('/sms/history')
  return response.data || []
}

export async function deleteHistory(id: string): Promise<void> {
  await api.delete<APIResponse<void>>(`/sms/history/${id}`)
} 