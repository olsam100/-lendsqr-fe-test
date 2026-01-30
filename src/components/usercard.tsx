import '../styles/usercard.scss'

interface UserCardProps {
  icon: React.ReactNode
  title: string
  amount: string | number
  iconBgColor?: string
  iconColor?: string
}

const UserCard = ({
  icon,
  title,
  amount,
  iconBgColor = '#f3faff',
  iconColor = '#39cdcc',
}: UserCardProps) => {
  return (
    <div className='user-card'>
      <div className='user-card-wrapper'>
        <div className='card-title-wrapper'>
          <div
            className='icon-wrapper'
            style={{
              backgroundColor: iconBgColor,
              color: iconColor,
            }}
          >
            {icon}
          </div>

          <p className='card-title'>{title}</p>
        </div>

        {/* Amount */}
        <p className='card-amount'>{amount.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default UserCard
