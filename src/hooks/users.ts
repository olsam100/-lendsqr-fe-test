import { useQuery } from '@tanstack/react-query'
import { getUsers, type User, type RawApiUser } from '../services/api/users'

const USERS_QUERY_KEY = ['users'] as const

const FALLBACK_RAW: RawApiUser[] = [
  {
    _id: 'fallback-1',
    company: '-',
    username: '-',
    email: '-',
    phone: '-',
    registered: '-',
    status: '-',
  },
]

export const useUsers = () => {
  return useQuery<RawApiUser[], Error, User[]>({
    queryKey: USERS_QUERY_KEY,
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 2,
    placeholderData: FALLBACK_RAW,

    select: (rawData: RawApiUser[]): User[] => {
      return rawData.map((user, index) => {
        const mapped = {
          _id: user._id ?? '-',
          organization: user.company ?? '—',
          username: user.username ?? '—',
          email: user.email ?? '—',
          phoneNumber: user.phone ?? '—',
          dateJoined: user.registered ?? '—',
          status: normalizeStatus(user.status),

          index: user.index,
          isActive: user.isActive,
          balance: user.balance,
          picture: user.picture,
          age: user.age,
          gender: user.gender,
          address: user.address,
          guarantor: user.guarantor,
        }

        if (index === 0) {
          console.log('Mapped first user:', mapped)
          if (!user.company) console.warn('Missing company field in raw data')
          if (!user.phone) console.warn('Missing phone field in raw data')
          if (!user.registered)
            console.warn('Missing registered field in raw data')
        }

        return mapped
      })
    },
  })
}

function normalizeStatus(raw?: string): User['status'] {
  if (!raw) return '-'

  const lower = raw.toLowerCase().trim()

  if (lower.includes('active')) return 'Active'
  if (lower.includes('inactive')) return 'Inactive'
  if (lower.includes('pending')) return 'Pending'
  if (lower.includes('blacklist') || lower.includes('blacklisted')) {
    return 'Blacklisted'
  }

  return '-'
}
