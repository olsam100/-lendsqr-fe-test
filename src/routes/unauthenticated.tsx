import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '..//pages/auth/login'

const Unauthenticated = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <Routes>
      <Route path='/' element={<Login onLogin={onLogin} />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default Unauthenticated
