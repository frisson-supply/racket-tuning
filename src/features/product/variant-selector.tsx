'use client'

import { Button } from '@/components/ui/button'
import type { Product } from '@/payload-types'

import { createUrl } from '@/utilities/create-url'
import { cn } from '@/utilities/cn'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import styles from './product.module.css'

export function VariantSelector({ product }: { product: Product }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const variants = product.variants?.docs
  const variantTypes = product.variantTypes
  const hasVariants = Boolean(product.enableVariants && variants?.length && variantTypes?.length)

  if (!hasVariants) {
    return null
  }

  return variantTypes?.map((type) => {
    if (!type || typeof type !== 'object') return <></>

    const options = type.options?.docs

    if (!options || !Array.isArray(options) || !options.length) return <></>

    return (
      <dl className={styles['variant-group']} key={type.id}>
        <dt className={styles['variant-label']}>{type.label}</dt>
        <dd className={styles['variant-options']}>
          <React.Fragment>
            {options?.map((option) => {
              if (!option || typeof option !== 'object') return <></>

              const optionID = option.id
              const optionKeyLowerCase = type.name

              const optionSearchParams = new URLSearchParams(searchParams.toString())
              optionSearchParams.delete('variant')
              optionSearchParams.delete('image')
              optionSearchParams.set(optionKeyLowerCase, String(optionID))

              const currentOptions = Array.from(optionSearchParams.values())

              let isAvailableForSale = true

              if (variants) {
                const matchingVariant = variants
                  .filter((variant) => typeof variant === 'object')
                  .find((variant) => {
                    if (!variant.options || !Array.isArray(variant.options)) return false

                    return variant.options.every((variantOption) => {
                      if (typeof variantOption !== 'object')
                        return currentOptions.includes(String(variantOption))
                      return currentOptions.includes(String(variantOption.id))
                    })
                  })

                if (matchingVariant) {
                  optionSearchParams.set('variant', String(matchingVariant.id))
                  isAvailableForSale = !!(
                    matchingVariant.inventory && matchingVariant.inventory > 0
                  )
                }
              }

              const optionUrl = createUrl(pathname, optionSearchParams)

              const isActive =
                Boolean(isAvailableForSale) &&
                searchParams.get(optionKeyLowerCase) === String(optionID)

              return (
                <Button
                  variant="ghost"
                  aria-disabled={!isAvailableForSale}
                  className={cn(styles['variant-btn'], isActive && styles['variantBtn--active'])}
                  disabled={!isAvailableForSale}
                  key={option.id}
                  onClick={() => {
                    router.replace(`${optionUrl}`, { scroll: false })
                  }}
                  title={`${option.label} ${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                >
                  {option.label}
                </Button>
              )
            })}
          </React.Fragment>
        </dd>
      </dl>
    )
  })
}
