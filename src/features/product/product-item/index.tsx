import { Media } from '@/components/common/media'
import { OrderStatus } from '@/features/account/order-status'
import { Price } from '@/components/common/price'
import { Button } from '@/components/ui/button'
import { Media as MediaType, Order, Product, Variant } from '@/payload-types'
import { formatDateTime } from '@/utilities/format-date-time'
import Link from 'next/link'
import styles from './product-item.module.css'

type Props = {
  product: Product
  style?: 'compact' | 'default'
  variant?: Variant
  quantity?: number
  currencyCode?: string
}

export const ProductItem: React.FC<Props> = ({
  product,
  style = 'default',
  quantity,
  variant,
  currencyCode,
}) => {
  const { title } = product

  const metaImage =
    product.meta?.image && typeof product.meta?.image !== 'string' ? product.meta.image : undefined

  const firstGalleryImage =
    typeof product.gallery?.[0]?.image !== 'string' ? product.gallery?.[0]?.image : undefined

  let image = firstGalleryImage || metaImage

  const isVariant = Boolean(variant) && typeof variant === 'object'

  if (isVariant) {
    const imageVariant = product.gallery?.find((item) => {
      if (!item.variantOption) return false
      const variantOptionID =
        typeof item.variantOption === 'object' ? item.variantOption.id : item.variantOption

      const hasMatch = variant?.options?.some((option) => {
        if (typeof option === 'object') return option.id === variantOptionID
        else return option === variantOptionID
      })

      return hasMatch
    })

    if (imageVariant && typeof imageVariant.image !== 'string') {
      image = imageVariant.image
    }
  }

  const itemPrice = variant?.priceInUSD || product.priceInUSD
  const itemURL = `/products/${product.slug}${variant ? `?variant=${variant.id}` : ''}`

  return (
    <div className={styles.item}>
      <div className={styles.thumb}>
        <div className={styles['thumb-inner']}>
          {image && typeof image !== 'string' && (
            <Media fill imgClassName={styles['thumb-image']} resource={image} />
          )}
        </div>
      </div>
      <div className={styles.meta}>
        <div className={styles.info}>
          <p className={styles.title}>
            <Link href={itemURL}>{title}</Link>
          </p>
          {variant && (
            <p className={styles.variant}>
              {variant.options
                ?.map((option) => {
                  if (typeof option === 'object') return option.label
                  return null
                })
                .join(', ')}
            </p>
          )}
          <div>
            {'x'}
            {quantity}
          </div>
        </div>

        {itemPrice && quantity && (
          <div className={styles.subtotal}>
            <p className={styles['subtotal-label']}>Subtotal</p>
            <Price
              className={styles['subtotal-price']}
              amount={itemPrice * quantity}
              currencyCode={currencyCode}
            />
          </div>
        )}
      </div>
    </div>
  )
}
