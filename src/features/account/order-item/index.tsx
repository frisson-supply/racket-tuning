import { OrderStatus } from '@/features/account/order-status'
import { Price } from '@/components/common/price'
import { Button } from '@/components/ui/button'
import { Order } from '@/payload-types'
import { formatDateTime } from '@/utilities/format-date-time'
import Link from 'next/link'
import styles from './order-item.module.css'

type Props = {
  order: Order
}

export const OrderItem: React.FC<Props> = ({ order }) => {
  const itemsLabel = order.items?.length === 1 ? 'Item' : 'Items'

  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <h3 className={styles['order-id']}>{`#${order.id}`}</h3>

        <div className={styles['date-row']}>
          <p className={styles.date}>
            <time dateTime={order.createdAt}>
              {formatDateTime({ date: order.createdAt, format: 'MMMM dd, yyyy' })}
            </time>
          </p>

          {order.status && <OrderStatus status={order.status} />}
        </div>

        <p className={styles.summary}>
          <span>
            {order.items?.length} {itemsLabel}
          </span>
          {order.amount && (
            <>
              <span>•</span>
              <Price as="span" amount={order.amount} currencyCode={order.currency ?? undefined} />
            </>
          )}
        </p>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" asChild>
          <Link href={`/orders/${order.id}`}>View Order</Link>
        </Button>
      </div>
    </div>
  )
}
