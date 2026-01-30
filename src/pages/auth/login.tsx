import './login.css'
import SigninIcon from '../../assets/icons/signinIcon'
import PrimaryButton from '../..//components/buttons/primary'
import InputField from '../..//components/inputfield'
import { BrandIcon } from '../../assets/icons/brand'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email.trim()) {
      setError('Email is required')
      setIsLoading(false)
      return
    }

    if (!password.trim()) {
      setError('Password is required')
      setIsLoading(false)
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email.trim())

      onLogin()

      navigate('/', { replace: true })
      setIsLoading(false)
    }, 800)
  }
  return (
    <div className='logincontainer'>
      <div>
        <div className='brand'>
          <BrandIcon />
        </div>

        <div className='signinIcon'>
          <SigninIcon />
        </div>
      </div>
      <div>
        <form className='loginForm' onSubmit={handleSubmit}>
          <div className='formdetails'>
            <p className='welcome'>Welcome!</p>
            <p className=''>Enter details to login</p>
          </div>

          {error && <p className='form-error'>{error}</p>}

          <div className='formwrapper'>
            <div className='inputfields'>
              <InputField
                placeholder='Email'
                type='email'
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                required
              />
              <InputField
                type='password'
                placeholder='Password'
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className='forgotpassword'>Forgot password?</p>
            </div>
            <PrimaryButton
              title={isLoading ? 'Logging in...' : 'Log in'}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
