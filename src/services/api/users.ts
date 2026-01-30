import { client } from './client'

export interface User {
  _id: string
  organization: string
  username: string
  email: string
  phoneNumber: string
  dateJoined: string
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted' | '-'

  index?: number
  isActive?: boolean
  balance?: string
  picture?: string
  age?: number
  gender?: string
  address?: string
  guarantor?: {
    id: number
    name: string
  }
}

export interface RawApiUser {
  _id: string
  index?: number
  isActive?: boolean
  balance?: string
  picture?: string
  age?: number
  username: string
  gender?: string
  company: string
  email: string
  phone: string
  address?: string
  registered: string
  guarantor?: {
    id: number
    name: string
  }
  status: string
}

export const getUsers = async (): Promise<RawApiUser[]> => {
  if (import.meta.env.DEV) {
    const mockUrl = 'https://lendsqr-users.free.beeceptor.com/users'
    const response = await fetch(mockUrl)
    if (!response.ok) {
      throw new Error(`Mock API error: ${response.status}`)
    }
    return response.json() as Promise<RawApiUser[]>
  }

  return client('/users')
}
