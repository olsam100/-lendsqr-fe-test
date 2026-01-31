import { useState, type FC } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Dashboard from '../pages/landing/dashboard'
import { LogoIcon } from '../assets/icons/brand'
import SearchBar from '../components/search'
import {
  ArrowDown,
  BriefcaseIcon,
  DownAarrowIcon,
  NotificationIcon,
} from '../assets/icons/dashboard-icons/dashboard'
import { sidebarItems } from '../utils/navItems'
import avatar from '../assets/icons/ava.png'
import { searchBus } from '../utils/searchBus'
import Users from '../pages/landing/user'
import UserDetails from '../components/userdetails'

interface AuthenticatedProps {
  onLogout: () => void
}

const Authenticated: FC<AuthenticatedProps> = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const isUsersPage = location.pathname.startsWith('/users')

  const userEmail = localStorage.getItem('userEmail') || 'User'

  const username = userEmail.split('@')[0]
  const displayUsername = username.charAt(0).toUpperCase() + username.slice(1)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (isUsersPage) {
      searchBus.publish(value)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <div className='container'>
        <header className='header'>
          <div className='headerleft'>
            <div className='header-brand-menu'>
              <button className='mobile-menu-btn' onClick={toggleSidebar}>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                >
                  <path
                    d='M3 12h18M3 6h18M3 18h18'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </button>
              <NavLink to='/' className='brandIconbox'>
                <LogoIcon />
              </NavLink>
            </div>

            <div className='search-wrapper'>
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={
                  isUsersPage ? 'Search users...' : 'Search for anything'
                }
              />
            </div>
          </div>

          <div className='headerright'>
            <div className='headerrightleft'>
              <NavLink to='/docs' className='docslink'>
                Docs
              </NavLink>
              <NotificationIcon />
            </div>

            <div className='headerrightright'>
              <div className='avatar'>
                <img src={avatar} alt='user avatar' />
              </div>
              <div className='username'>
                <span>{displayUsername}</span>
                <ArrowDown />
              </div>
            </div>
            <button
              onClick={onLogout}
              className='logout-btn'
              style={{
                marginLeft: '1.6rem',
                padding: '0.8rem 1.6rem',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.4rem',
                fontFamily: 'Work Sans',
              }}
            >
              Logout
            </button>
          </div>
        </header>
        <div className='main'>
          {isSidebarOpen && (
            <div className='sidebar-overlay' onClick={toggleSidebar} />
          )}

          <nav className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className='sidebar-header'>
              <button className='sidebar-close' onClick={toggleSidebar}>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                >
                  <path
                    d='M18 6L6 18M6 6l12 12'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </button>
            </div>
            <ul className='navItems'>
              <div className='switch'>
                <BriefcaseIcon />
                <p>Switch Organization</p>
                <DownAarrowIcon />
              </div>
              {sidebarItems.map((section, sectionIndex) => (
                <li key={sectionIndex} className='navItem'>
                  {section.title && (
                    <p className='navSectionTitle'>{section.title}</p>
                  )}

                  {section.items.map((item) => (
                    <NavLink
                      key={item.link}
                      to={item.link}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                      end={item.link === '/'}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className='icon'>{item.icon}</span>
                      <p>{item.name}</p>
                    </NavLink>
                  ))}
                </li>
              ))}
            </ul>
          </nav>
          <main className='content-wrapper'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/:userId' element={<UserDetails />} />
            </Routes>
          </main>
        </div>
      </div>

      <style>{`
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #213f7d;
          padding: 0.5rem;
        }

        .header-brand-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .sidebar-overlay {
          display: none;
        }

        .sidebar-header {
          display: none;
        }

        .sidebar-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #213f7d;
          padding: 1rem;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          .sidebar {
            position: fixed;
            left: -100%;
            top: 0;
            height: 100vh;
            z-index: 1000;
            transition: left 0.3s ease;
            box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
          }

          .sidebar-open {
            left: 0;
          }

          .sidebar-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }

          .sidebar-header {
            display: flex;
            justify-content: flex-end;
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
          }
        }
      `}</style>
    </>
  )
}

export default Authenticated
