/* eslint-disable no-unneeded-ternary */
import axios from 'axios'
import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { formatIntentData } from '@/lib/formatAirwallex'
import type { cartType } from '@/types'

type airwallexType = {
  clientSecret: string
  paymentIntentId: string
}

export default function useAirwallexPayment() {
  const router = useRouter()
  const disableBtn = router.pathname.includes('checkout') ? true : false
  const airwallexAtom = atom<airwallexType | null>(null)
  const [airwallexState, setAirwallexState] = useAtom(airwallexAtom)

  function createAccessToken() {
    return axios.request({
      url: `/api/get-payment-token`,
      method: 'get',
    })
  }

  function createPaymentIntent(requestBody: any) {
    return axios.request({
      url: `/api/create-payment-intent`,
      method: 'post',
      data: requestBody,
    })
  }

  function checkoutHandler(cart: cartType, paymentForm: any) {
    const paymentDetails = formatIntentData(cart, paymentForm)
    createAccessToken()
      .then(({ data }) => {
        return createPaymentIntent({
          auth: data.token,
          paymentDetails,
        })
      })
      .then(({ data }: any) => {
        setAirwallexState({
          clientSecret: data.client_secret,
          paymentIntentId: data.id,
        })
      })
      .catch((error) => {
        toast.error(error.response?.data?.message)
      })
  }

  return {
    createAccessToken,
    createPaymentIntent,
    checkoutHandler,
    disableBtn,
  }
}