import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useUsers } from '../hooks/users'
import { BackIcon } from '../assets/icons/dashboard-icons/dashboard'
import '../styles/userdetailspage.scss'
import {
  getActionButtonClass,
  getActionButtonLabel,
} from '../utils/statuslabel'
import { Rating } from 'react-simple-star-rating'

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { data: users = [] } = useUsers()

  const [activeTab, setActiveTab] = useState('general')

  const userFromState = location.state?.user
  const userFromList = users.find((u) => {
    const userIdentifier = `${u.username}-${u._id}`
      .toLowerCase()
      .replace(/\s+/g, '-')
    return userIdentifier === userId
  })

  const user = userFromState || userFromList

  const formatDate = (dateString: string) => {
    if (!dateString) return '—'
    try {
      const cleanedDate = dateString.replace(/\s([+-]\d{2}:\d{2})$/, '$1')
      const date = new Date(cleanedDate)
      if (isNaN(date.getTime())) return dateString
      return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    } catch {
      return dateString
    }
  }

  const formatPhone = (phone: string) => {
    if (!phone) return '—'
    let cleaned = phone.replace(/^\+234\s*/, '')
    cleaned = cleaned.replace(/[\s()-]/g, '')
    if (cleaned.length === 10 && !cleaned.startsWith('0')) {
      cleaned = '0' + cleaned
    }
    return cleaned || phone
  }

  const formatCurrency = (amount: number | string) => {
    if (!amount) return '—'
    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    return `₦${num.toLocaleString()}`
  }

  const getStatusStyle = () => {
    if (!user)
      return { bgColor: '#f5f5f5', textColor: '#4b5563', display: 'Unknown' }

    const status = (user.status || '').toLowerCase().trim()
    let bgColor = '#f5f5f5'
    let textColor = '#4b5563'
    let display = 'Unknown'

    if (status.includes('active') || status === 'true' || status === '1') {
      display = 'Active'
      bgColor = '#F1FAF4'
      textColor = '#166534'
    } else if (status.includes('pending')) {
      display = 'Pending'
      bgColor = '#FDF7E5'
      textColor = '#92400e'
    } else if (status.includes('blacklist') || status === 'blacklisted') {
      display = 'Blacklisted'
      bgColor = '#FBFBFB'
      textColor = '#991b1b'
    } else if (status.includes('inactive')) {
      display = 'Inactive'
      bgColor = '#f5f5f5'
      textColor = '#4b5563'
    }

    return { bgColor, textColor, display }
  }

  const handleStatusAction = () => {
    const current = statusStyle.display.toLowerCase()

    if (current === 'active') {
      if (window.confirm('Are you sure you want to blacklist this user?')) {
        console.log('Blacklisting user:', user._id)
      }
    } else if (current === 'blacklisted' || current === 'inactive') {
      if (window.confirm('Activate this user?')) {
        console.log('Activating user:', user._id)
      }
    } else if (current === 'pending') {
      if (window.confirm('Approve this user?')) {
        console.log('Approving user:', user._id)
      }
    }
  }

  const sectionsData = useMemo(() => {
    if (!user) return []

    return [
      {
        title: 'Personal Information',
        fields: [
          { label: 'full name', value: user.username },
          { label: 'phone number', value: formatPhone(user.phoneNumber) },
          { label: 'email address', value: user.email },
          { label: 'bvn', value: user.bvn },
          { label: 'gender', value: user.gender },
          { label: 'marital status', value: user.maritalStatus },
          { label: 'children', value: user.children },
          { label: 'type of residence', value: user.typeOfResidence },
        ],
      },
      {
        title: 'Education and Employment',
        fields: [
          { label: 'level of education', value: user.levelOfEducation },
          { label: 'employment status', value: user.employmentStatus },
          { label: 'sector of employment', value: user.sectorOfEmployment },
          { label: 'duration of employment', value: user.durationOfEmployment },
          { label: 'office email', value: user.officeEmail },
          {
            label: 'monthly income',
            value: formatCurrency(user.monthlyIncome),
          },
          {
            label: 'loan repayment',
            value: formatCurrency(user.loanRepayment),
          },
        ],
      },
      {
        title: 'Socials',
        fields: [
          { label: 'twitter', value: user.twitter },
          { label: 'facebook', value: user.facebook },
          { label: 'instagram', value: user.instagram },
        ],
      },
      {
        title: 'Guarantor',
        fields: [
          { label: 'full name', value: user.guarantorName },
          { label: 'phone number', value: formatPhone(user.guarantorPhone) },
          { label: 'email address', value: user.guarantorEmail },
          { label: 'relationship', value: user.guarantorRelationship },
        ],
      },
    ]
  }, [user])

  const handleBack = () => {
    navigate('/users')
  }

  if (!user) {
    return (
      <div className='user-details-page'>
        <div className='user-not-found'>
          <h2>User not found</h2>
          <p>The user you're looking for doesn't exist.</p>
          <button className='btn-primary' onClick={handleBack}>
            Back to Users
          </button>
        </div>
      </div>
    )
  }

  const statusStyle = getStatusStyle()

  const tabs = [
    { id: 'general', label: 'General details' },
    { id: 'documents', label: 'Documents' },
    { id: 'bank', label: 'Bank details' },
    { id: 'loans', label: 'Loans' },
    { id: 'savings', label: 'Savings' },
    { id: 'app', label: 'App and System' },
  ]

  return (
    <div className='user-details-page'>
      <div className='user-details-wrapper'>
        {/* Back Button */}

        <div className='userdetailsheader'>
          <button className='back-button' onClick={handleBack}>
            <BackIcon />
            <span>Back to Users</span>
          </button>

          <div className='userdetailstitlewrapper'>
            <div className='userdetailstitleinner'>
              <div className='userdetailstitle'>User Details</div>
              <div className='userStatusContainer'>
                <div
                  className='status-badge-large'
                  style={{
                    backgroundColor: statusStyle.bgColor,
                    color: statusStyle.textColor,
                    border: `1px solid ${statusStyle.textColor}30`,
                  }}
                >
                  {statusStyle.display}
                </div>
                <div
                  className={`action-btn ${getActionButtonClass(
                    statusStyle.display
                  )}`}
                  onClick={handleStatusAction}
                >
                  {getActionButtonLabel(statusStyle.display)}
                </div>
              </div>
            </div>

            {/* Page Header */}
            <div className='page-header'>
              <div className='user-header-info'>
                <div className='user-avatar'>
                  <span>{user.username?.charAt(0).toUpperCase() || 'U'}</span>
                </div>
                <div className='user-header-text'>
                  <p>{user.username || 'Unknown User'}</p>
                  <p className='user-subtitle'>{user.email || '—'}</p>
                </div>
                <div className='userrating'>
                  <div className='verticalbar'></div>
                  <div>
                    <p className='ratingtext'>User's Tier</p>
                    <div className='rating'>
                      <Rating iconsCount={3} />
                    </div>
                  </div>
                  <span className='verticalbar'></span>
                </div>
                <div className='bankdetails'>
                  <div className='userbalaance'>₦200,000.00</div>
                  <div className='userbaankaccount'>
                    9912345678/Providus Bank
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className='user-tabs'>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`tab-item ${
                      activeTab === tab.id ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <main className='user-details-content'>
          {activeTab === 'general' && (
            <>
              {/* Personal Information */}
              <section className='details-section'>
                {sectionsData.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <div className='details-section-wrapper'>
                      <h3 className='section-title'>{section.title}</h3>
                      <div className='generalInformation'>
                        {section.fields.map((field, fieldIndex) => (
                          <div key={fieldIndex} className='informwrapper'>
                            <p className='informtitle'>{field.label}</p>
                            <p className='informDetails'>
                              {field.value || '—'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {sectionIndex < sectionsData.length - 1 && (
                      <div className='divider'></div>
                    )}
                  </div>
                ))}
              </section>
            </>
          )}

          {activeTab === 'documents' && (
            <section className='details-section'>
              <h3 className='section-title'>Documents</h3>
              <p className='placeholder-text'>
                ID card, proof of address, selfie, etc. will appear here...
              </p>
            </section>
          )}

          {activeTab === 'bank' && (
            <section className='details-section'>
              <h3 className='section-title'>Bank Details</h3>
              <div className='details-grid'>
                <div className='detail-item'>
                  <label>Bank Name</label>
                  <p>{user.bankName || '—'}</p>
                </div>
                <div className='detail-item'>
                  <label>Account Number</label>
                  <p>{user.accountNumber || '—'}</p>
                </div>
                <div className='detail-item'>
                  <label>Account Name</label>
                  <p>{user.accountName || user.username || '—'}</p>
                </div>
                <div className='detail-item'>
                  <label>BVN</label>
                  <p>{user.bvn || '—'}</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'loans' && (
            <section className='details-section'>
              <h3 className='section-title'>Loans</h3>
              <p className='placeholder-text'>
                List of active / past loans, repayment status, etc.
              </p>
            </section>
          )}

          {activeTab === 'savings' && (
            <section className='details-section'>
              <h3 className='section-title'>Savings</h3>
              <p className='placeholder-text'>
                Savings wallets, targets, balances, interest earned...
              </p>
            </section>
          )}

          {activeTab === 'app' && (
            <section className='details-section'>
              <h3 className='section-title'>App and System</h3>
              <div className='details-grid'>
                <div className='detail-item'>
                  <label>Last Login</label>
                  <p>{formatDate(user.lastLogin) || '—'}</p>
                </div>
                <div className='detail-item'>
                  <label>Device</label>
                  <p>{user.device || '—'}</p>
                </div>
                <div className='detail-item'>
                  <label>App Version</label>
                  <p>{user.appVersion || '—'}</p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default UserDetails
