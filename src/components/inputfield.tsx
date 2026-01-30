import React, { useRef, useState } from 'react'
import type { ChangeEventHandler, FocusEventHandler } from 'react'
import '../styles/input.scss'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  touched?: boolean
  error?: string
  hasBoxShadow?: boolean
  handleChange?: ChangeEventHandler<HTMLInputElement>
  handleBlur?: FocusEventHandler<HTMLInputElement>
  children?: React.ReactNode
}

const InputField: React.FC<InputFieldProps> = ({
  children,
  value,
  touched,
  error,
  name,
  handleChange,
  handleBlur,
  disabled,
  type,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const theme = true

  const handleContainerClick = () => {
    if (!disabled) {
      inputRef.current?.focus()
    }
  }

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPassword(!showPassword)
  }

  const getInputClasses = () => {
    let classes = 'input-field'
    if (touched && error) classes += ' input-field--error'
    if (disabled) classes += ' input-field--disabled'
    classes += theme ? ' input-field--light' : ' input-field--dark'
    return classes
  }

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type

  return (
    <div className='input-container'>
      <div className='input-wrapper' onClick={handleContainerClick}>
        <input
          ref={inputRef}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          autoComplete='off'
          onBlur={handleBlur}
          className={getInputClasses()}
          disabled={disabled}
          type={inputType}
          {...props}
        />

        {type === 'password' && (
          <button
            type='button'
            className='password-toggle'
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
        )}

        {children}
      </div>
      {touched && error && (
        <div className='input-error'>
          <div className='input-error-text'>{error}</div>
        </div>
      )}
    </div>
  )
}

export default InputField
