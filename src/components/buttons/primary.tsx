import type { FC, ButtonHTMLAttributes } from 'react'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ title, ...rest }) => {
  return (
    <button className='primaryCta' {...rest}>
      {title}
    </button>
  )
}

export default PrimaryButton
