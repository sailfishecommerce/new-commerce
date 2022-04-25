/* eslint-disable no-else-return */
import { QueryClient, useQuery } from 'react-query'

import { useAppSelector } from '@/hooks/useRedux'
import useSwell from '@/hooks/useSwell'

export default function useCurrency() {
  const { swellInit } = useSwell()

  const { currency } = useAppSelector((state) => state.currencyLanguage)

  async function listEnabledCurrencies() {
    const { swell } = await swellInit()
    return await swell.currency.list()
  }

  async function selectCurrencies(currencyVal: string) {
    const { swell } = await swellInit()
    return await swell.currency.select(currencyVal)
  }

  async function getSelectedCurrencies() {
    const { swell } = await swellInit()
    return await swell.currency.selected()
  }

  return {
    listEnabledCurrencies,
    selectCurrencies,
    getSelectedCurrencies,
    currency,
  }
}

export function currencySymbolFormatter(currency: {
  symbol: string
  code: string
}) {
  const currencyCode = currency ? currency.code : ''
  if (currency.symbol === '$' && currency.code !== 'USD') {
    return `${currencyCode} ${currency.symbol}`
  } else {
    return currency.symbol
  }
}

export function useCurrencies() {
  const { listEnabledCurrencies } = useCurrency()

  const { data: currencyList, status } = useQuery(
    'useCurrencies',
    listEnabledCurrencies
  )

  return { currencyList, status }
}

export async function getCurrencies(listEnabledCurrencies: any) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })

  return await queryClient.fetchQuery('currencies', listEnabledCurrencies)
}
