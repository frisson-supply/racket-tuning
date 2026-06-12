import { OrderStatus as StatusOptions } from '@/payload-types'
import { cn } from '@/utilities/cn'
import styles from './order-status.module.css'

type Props = {
  status: StatusOptions
  className?: string
}

export const OrderStatus: React.FC<Props> = ({ status, className }) => {
  return (
    <div
      className={cn(
        styles.status,
        status === 'processing' && styles.processing,
        status === 'completed' && styles.completed,
        className,
      )}
    >
      {status}
    </div>
  )
}
