import { cn } from '@/utilities/cn'
import styles from './form-error.module.css'

type Props = {
  message?: string
  as?: 'p' | 'span'
  className?: string
}

export const FormError: React.FC<Props> = ({ message, as, className }) => {
  const Element = as || 'p'

  if (!message) {
    return null
  }

  return <Element className={cn(styles.error, className)}>{message}</Element>
}
