import type { Locale } from './localized-path'

export { locales, defaultLocale } from './localized-path'
export type { Locale } from './localized-path'

type Dictionary = {
  account: Record<'addresses' | 'createAccount' | 'logIn' | 'logOut' | 'manageAccount' | 'orders', string>
  cart: Record<'addToCart' | 'checkout' | 'empty', string>
  shop: Record<'allProducts' | 'relatedProducts', string>
}

const dictionary: Record<Locale, Dictionary> = {
  nl: {
    account: {
      addresses: 'Adressen',
      createAccount: 'Account aanmaken',
      logIn: 'Inloggen',
      logOut: 'Uitloggen',
      manageAccount: 'Account beheren',
      orders: 'Bestellingen',
    },
    cart: {
      addToCart: 'Toevoegen aan winkelwagen',
      checkout: 'Afrekenen',
      empty: 'Je winkelwagen is leeg',
    },
    shop: {
      allProducts: 'Alle producten',
      relatedProducts: 'Gerelateerde producten',
    },
  },
  en: {
    account: {
      addresses: 'Addresses',
      createAccount: 'Create an account',
      logIn: 'Log in',
      logOut: 'Log out',
      manageAccount: 'Manage account',
      orders: 'Orders',
    },
    cart: {
      addToCart: 'Add to cart',
      checkout: 'Checkout',
      empty: 'Your cart is empty',
    },
    shop: {
      allProducts: 'All products',
      relatedProducts: 'Related products',
    },
  },
}

type Namespace = keyof Dictionary
type Key<N extends Namespace> = keyof Dictionary[N]

export function t<N extends Namespace>(locale: Locale, namespace: N, key: Key<N>): string {
  const entry = dictionary[locale][namespace] as Record<string, string>
  return entry[key as string]
}
