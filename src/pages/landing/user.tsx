import { useEffect, useMemo, useState } from 'react'
import {
  type ColumnDef,
  type SortingState,
  type PaginationState,
} from '@tanstack/react-table'
import '../../styles/users.scss'
import { useUsers } from '../../hooks/users'
import type { User } from '../../services/api/users'
import { DataTable } from '../../components/datatable'
import type { FilterValues } from '../../components/filterdropdown'
import {
  ActiveUsersCardIcon,
  UsersCardIcon,
  UsersWithLoanCardIcon,
  UsersWithSavingsCardIcon,
} from '../../assets/icons/dashboard-icons/dashboard'
import UserCard from '../../components/usercard'
import { useNavigate } from 'react-router-dom'
import { searchBus } from '../../utils/searchBus'

const userCards = [
  {
    icon: <UsersCardIcon />,
    title: 'users',
    amount: 2453,
    bgcolor: '#FCE8FF',
  },
  {
    icon: <ActiveUsersCardIcon />,
    title: 'active users',
    amount: 2453,
    bgcolor: '#EEE8FF',
  },
  {
    icon: <UsersWithLoanCardIcon />,
    title: 'users with loans',
    amount: 12453,
    bgcolor: '#FEEFEC',
  },
  {
    icon: <UsersWithSavingsCardIcon />,
    title: 'users with savings',
    amount: 102453,
    bgcolor: '#FFEBF0',
  },
]

export default function Users() {
  const navigate = useNavigate()
  const { data: users = [], isLoading, isError, error } = useUsers()

  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const isUsingFallback =
    users.length > 0 &&
    (isError || users.every((u) => u._id.startsWith('fallback-')))

  const [columnFilters, setColumnFilters] = useState<{
    organization?: FilterValues
    username?: FilterValues
  }>({})

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const unsubscribe = searchBus.subscribe((query) => setSearchQuery(query))
    return () => void unsubscribe()
  }, [])

  const handleFilterApply = (columnId: string, filters: FilterValues) => {
    setColumnFilters((prev) => ({
      ...prev,
      [columnId]: filters,
    }))
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  const handleRowClick = (user: User) => {
    const userId = `${user.username}-${user._id}`
      .toLowerCase()
      .replace(/\s+/g, '-')
    navigate(`/users/${userId}`)
  }

  const filteredUsers = useMemo(() => {
    let result = users

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((user) => {
        return (
          user.username?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.organization?.toLowerCase().includes(query) ||
          user.phoneNumber?.toLowerCase().includes(query) ||
          user.status?.toLowerCase().includes(query)
        )
      })
    }

    if (columnFilters.organization) {
      const filters = columnFilters.organization
      if (filters.searchValue) {
        result = result.filter((user) =>
          user.organization
            ?.toLowerCase()
            .includes(filters.searchValue.toLowerCase())
        )
      }
      if (filters.email) {
        result = result.filter((user) =>
          user.email?.toLowerCase().includes(filters.email!.toLowerCase())
        )
      }
      if (filters.phone) {
        result = result.filter((user) =>
          user.phoneNumber?.toLowerCase().includes(filters.phone!.toLowerCase())
        )
      }
      if (filters.selectedStatus) {
        result = result.filter(
          (user) =>
            user.status?.toLowerCase() === filters.selectedStatus!.toLowerCase()
        )
      }
    }

    if (columnFilters.username) {
      const filters = columnFilters.username
      if (filters.searchValue) {
        result = result.filter((user) =>
          user.username
            ?.toLowerCase()
            .includes(filters.searchValue.toLowerCase())
        )
      }
      if (filters.email) {
        result = result.filter((user) =>
          user.email?.toLowerCase().includes(filters.email!.toLowerCase())
        )
      }
      if (filters.phone) {
        result = result.filter((user) =>
          user.phoneNumber?.toLowerCase().includes(filters.phone!.toLowerCase())
        )
      }
      if (filters.selectedStatus) {
        result = result.filter(
          (user) =>
            user.status?.toLowerCase() === filters.selectedStatus!.toLowerCase()
        )
      }
    }

    return result
  }, [users, searchQuery, columnFilters])

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'organization',
        header: 'ORGANIZATION',
        size: 150,
      },
      {
        accessorKey: 'username',
        header: 'USERNAME',
        size: 130,
      },
      {
        accessorKey: 'email',
        header: 'EMAIL',
        size: 120,
      },
      {
        accessorKey: 'phoneNumber',
        header: 'PHONE NUMBER',
        size: 156,
        cell: ({ getValue }) => {
          const raw = (getValue() as string) || ''
          let cleaned = raw.replace(/^\+234\s*/, '')
          cleaned = cleaned.replace(/[\s()-]/g, '')
          if (cleaned.length === 10 && !cleaned.startsWith('0')) {
            cleaned = '0' + cleaned
          }
          return cleaned || raw || '—'
        },
      },
      {
        accessorKey: 'dateJoined',
        header: 'DATE JOINED',
        size: 154,
        cell: ({ getValue }) => {
          const rawDate = (getValue() as string) || ''
          if (!rawDate) return '—'
          try {
            const cleanedDate = rawDate.replace(/\s([+-]\d{2}:\d{2})$/, '$1')
            const date = new Date(cleanedDate)
            if (isNaN(date.getTime())) {
              return rawDate
            }
            return date.toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
          } catch (err) {
            console.warn('Date parse error:', rawDate, err)
            return rawDate
          }
        },
      },
      {
        accessorKey: 'status',
        header: 'STATUS',
        size: 120,
        cell: ({ getValue }) => {
          const raw = ((getValue() as string) || '').toLowerCase().trim()
          let display = 'Unknown'
          let bgColor = '#f5f5f5'
          let textColor = '#4b5563'

          if (raw.includes('active') || raw === 'true' || raw === '1') {
            display = 'Active'
            bgColor = '#F1FAF4'
            textColor = '#166534'
          } else if (raw.includes('pending')) {
            display = 'Pending'
            bgColor = '#FDF7E5'
            textColor = '#92400e'
          } else if (raw.includes('blacklist') || raw === 'blacklisted') {
            display = 'Blacklisted'
            bgColor = '#FCE6EB'
            textColor = '#991b1b'
          } else if (raw.includes('inactive')) {
            display = 'Inactive'
            bgColor = '#f5f5f5'
            textColor = '#4b5563'
          }

          return (
            <span
              className='status-badge'
              style={{
                backgroundColor: bgColor,
                color: textColor,
                border: `1px solid ${textColor}30`,
              }}
            >
              {display}
            </span>
          )
        },
      },
      {
        id: 'actions',
        header: '',
        cell: () => null, // Empty cell - actual actions rendered in portal
        size: 30,
        enableSorting: false,
      },
    ],
    []
  )

  const gridTemplateColumns = useMemo(() => {
    return columns.map((col) => `${col.size || 120}px`).join(' ')
  }, [columns])

  if (isLoading) {
    return <div className='loading'>Loading users...</div>
  }

  if (isError) {
    return (
      <div className='error'>
        Error loading users: {error?.message || 'Unknown error'}
      </div>
    )
  }

  return (
    <div className='usercontainer'>
      <div className='usercontainerwrapper'>
        <p className='containertitle'>Users</p>

        {isUsingFallback && (
          <div className='api-fallback-warning'>
            ⚠️ Using demo data — real API is currently unavailable
          </div>
        )}

        <div className='cardswrapper'>
          {userCards.map((card) => (
            <UserCard
              key={card.title + card.icon}
              icon={card.icon}
              title={card.title}
              amount={card.amount}
              iconBgColor={card.bgcolor}
            />
          ))}
        </div>

        {(searchQuery || Object.keys(columnFilters).length > 0) && (
          <div className='search-results-info'>
            {filteredUsers.length === 0 ? (
              <p>No users found</p>
            ) : (
              <p>
                Showing {filteredUsers.length} of {users.length} user
                {filteredUsers.length !== 1 ? 's' : ''}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            )}
          </div>
        )}

        <DataTable
          data={filteredUsers}
          columns={columns}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          onPaginationChange={setPagination}
          gridTemplateColumns={gridTemplateColumns}
          onFilterApply={handleFilterApply}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  )
}
