'use client'

import { Price } from '@/components/common/price'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

import { DeleteItemButton } from './delete-item-button'
import { EditItemQuantityButton } from './edit-item-quantity-button'
import { OpenCartButton } from './open-cart'
import { Button } from '@/components/ui/button'
import { Product, VariantOption } from '@/payload-types'
import styles from './cart.module.css'

export function CartModal() {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const totalQuantity = useMemo(() => {
    if (!cart || !cart.items || !cart.items.length) return undefined
    return cart.items.reduce((quantity, item) => (item.quantity || 0) + quantity, 0)
  }, [cart])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <OpenCartButton quantity={totalQuantity} />
      </SheetTrigger>

      <SheetContent className={styles.sheetContent}>
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
          <SheetDescription>Manage your cart here, add items to view the total.</SheetDescription>
        </SheetHeader>

        {!cart || cart?.items?.length === 0 ? (
          <div className={styles.emptyState}>
            <ShoppingCart className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>Your cart is empty.</p>
          </div>
        ) : (
          <div className={styles.cartBody}>
            <div className={styles.cartInner}>
              <ul className={styles.itemList}>
                {cart?.items?.map((item, i) => {
                  const product = item.product
                  const variant = item.variant

                  if (typeof product !== 'object' || !item || !product || !product.slug)
                    return <React.Fragment key={i} />

                  const metaImage =
                    product.meta?.image && typeof product.meta?.image === 'object'
                      ? product.meta.image
                      : undefined

                  const firstGalleryImage =
                    typeof product.gallery?.[0]?.image === 'object'
                      ? product.gallery?.[0]?.image
                      : undefined

                  let image = firstGalleryImage || metaImage
                  let price = product.priceInUSD

                  const isVariant = Boolean(variant) && typeof variant === 'object'

                  if (isVariant) {
                    price = variant?.priceInUSD

                    const imageVariant = product.gallery?.find((galleryItem: NonNullable<Product['gallery']>[number]) => {
                      if (!galleryItem.variantOption) return false
                      const variantOptionID =
                        typeof galleryItem.variantOption === 'object'
                          ? galleryItem.variantOption.id
                          : galleryItem.variantOption

                      const hasMatch = variant?.options?.some(
                        (option: number | VariantOption) => {
                          if (typeof option === 'object') return option.id === variantOptionID
                          else return option === variantOptionID
                        },
                      )

                      return hasMatch
                    })

                    if (imageVariant && typeof imageVariant.image === 'object') {
                      image = imageVariant.image
                    }
                  }

                  return (
                    <li className={styles.item} key={i}>
                      <div className={styles.itemRow}>
                        <div className={styles.deleteWrap}>
                          <DeleteItemButton item={item} />
                        </div>
                        <Link
                          className={styles.itemLink}
                          href={`/products/${(item.product as Product)?.slug}`}
                        >
                          <div className={styles.itemImage}>
                            {image?.url && (
                              <Image
                                alt={image?.alt || product?.title || ''}
                                className={styles.itemImageEl}
                                height={94}
                                src={image.url}
                                width={94}
                              />
                            )}
                          </div>

                          <div className={styles.itemInfo}>
                            <span>{product?.title}</span>
                            {isVariant && variant ? (
                              <p className={styles.itemVariant}>
                                {variant.options
                                  ?.map((option: number | VariantOption) => {
                                    if (typeof option === 'object') return option.label
                                    return null
                                  })
                                  .join(', ')}
                              </p>
                            ) : null}
                          </div>
                        </Link>
                        <div className={styles.itemActions}>
                          {typeof price === 'number' && (
                            <Price amount={price} className={styles.itemPrice} />
                          )}
                          <div className={styles.quantityRow}>
                            <EditItemQuantityButton item={item} type="minus" />
                            <p className={styles.quantityCount}>
                              <span className={styles.quantityCountText}>{item.quantity}</span>
                            </p>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className={styles.cartFooter}>
                <div className={styles.cartSummary}>
                  {typeof cart?.subtotal === 'number' && (
                    <div className={styles.subtotalRow}>
                      <p>Total</p>
                      <Price amount={cart?.subtotal} className={styles.subtotalPrice} />
                    </div>
                  )}

                  <Button asChild>
                    <Link className={styles.checkoutLink} href="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
