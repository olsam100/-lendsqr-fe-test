import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Authenticated from './routes/authenticated'
import Unauthenticated from './routes/unauthenticated'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  )

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route
            path='/*'
            element={<Authenticated onLogout={handleLogout} />}
          />
        ) : (
          <Route
            path='/*'
            element={<Unauthenticated onLogin={handleLogin} />}
          />
        )}
      </Routes>
    </Router>
  )
}

export default App
