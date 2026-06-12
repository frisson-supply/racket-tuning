import { cn } from '@/utilities/cn'
import styles from './form-item.module.css'

type Props = {
  className?: string
  children?: React.ReactNode
}

export const FormItem: React.FC<Props> = ({ className, children }) => {
  return <div className={cn(styles.item, className)}>{children}</div>
}
