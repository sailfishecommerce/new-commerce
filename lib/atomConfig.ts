import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import type { typeModal } from '@/types'

// ui
export const appModalAtom = atom<{
  active?: boolean
  type: typeModal | null
  data?: string | null
}>({
  active: false,
  type: null,
  data: null,
})
export const modalAtom = atom(null)
export const slidingTabAtom = atom(null)
export const noticebarAtom = atomWithStorage('noticebar', true)
export const seemoreAtom = atom(null)
export const activeProductSlideAtom = atom(null)
export const appLoadingAtom = atom(false)
export const categoryDropdownAtom = atom(false)
export const selectedCategoryAtom = atom('Beauty')
export const mobileSlideMenuViewAtom = atom('LINK')
export const mobileViewAtom = atom({
  mobileMenu: false,
  showMobileSearch: false,
})
// form
export const paymentFormAtom = atomWithStorage<{
  form: any
  completed: boolean
} | null>('paymentForm', null)
export const completeOrderAtom = atom(false)
export const countryAtom = atom<{ country: string } | null>(null)
export const userAddressAtom = atom(null)

// airwallex
export const airwallexAtom = atom<{
  clientSecret: string | null
  paymentIntentId: string | null
}>({
  clientSecret: null,
  paymentIntentId: null,
})

// order
export const sendProductReviewAtom = atom<boolean | null>(null)
export const submitOrderAtom = atom<{
  account: null
  orderNumber: null
  products: null
} | null>(null)

// auth
export const authAtom = atom<{
  loading: boolean | null
  authorized: any | null
  userDetail: any | null
  error: boolean | null
} | null>(null)