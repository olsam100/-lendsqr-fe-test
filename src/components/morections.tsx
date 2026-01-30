import { useNavigate } from 'react-router-dom'
import {
  ActivateIcon,
  BlacklistIcon,
  ViewDetailsIcon,
} from '../assets/icons/dashboard-icons/dashboard'
import type { User } from '../services/api/users'

interface MoreActionsProps {
  row: User
  onClose: () => void
}

export default function MoreActions({ row, onClose }: MoreActionsProps) {
  const navigate = useNavigate()

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const userId = `${row.username}-${row._id}`
      .toLowerCase()
      .replace(/\s+/g, '-')
    navigate(`/users/${userId}`, { state: { user: row } })
    onClose()
  }

  const handleBlacklist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    alert(`Blacklisting user: ${row.username}`)
    onClose()
  }

  const handleActivate = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    alert(`Activating user: ${row.username}`)
    onClose()
  }

  return (
    <div
      style={{
        background: 'white',
        padding: '8px 0',
        minWidth: '170px',
        pointerEvents: 'auto',
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleViewDetails}
        onMouseDown={(e) => e.stopPropagation()}
        className=''
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          padding: '10px 16px',
          border: 'none',
          background: 'white',
          textAlign: 'left',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background 0.1s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
      >
        <ViewDetailsIcon /> View Details
      </button>
      <button
        onClick={handleBlacklist}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          padding: '10px 16px',
          border: 'none',
          background: 'white',
          textAlign: 'left',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background 0.1s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
      >
        <BlacklistIcon /> Blacklist User
      </button>
      <button
        onClick={handleActivate}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          padding: '10px 16px',
          border: 'none',
          background: 'white',
          textAlign: 'left',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background 0.1s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
      >
        <ActivateIcon /> Activate User
      </button>
    </div>
  )
}
