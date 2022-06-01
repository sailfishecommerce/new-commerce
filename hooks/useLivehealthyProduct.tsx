import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'

export default function useLiveHealthyProduct(): any {
  const queryClient = useQueryClient()
  function fetchLiveHealthyProducts() {
    return axios.get('/api/get-livehealthy-product')
  }
  const { data, status, error } = useQuery(
    'fetchLiveHealthyProducts',
    fetchLiveHealthyProducts,
    {
      staleTime: Infinity,
      placeholderData: () =>
        queryClient.getQueryData('fetchLiveHealthyProducts'),
    }
  )

  return [data?.data, status, error]
}

type queryDataType = { query: any; id: string }

export function useProductInRange(queryData: queryDataType) {
  const { id, query } = queryData
  const queryClient = useQueryClient()

  function getProductInRange() {
    return axios.post('/api/get-products-by-ratings', { query })
  }

  const { data, status, error } = useQuery(
    `getProductInRange-${id}`,
    getProductInRange,
    {
      staleTime: Infinity,
      placeholderData: () =>
        queryClient.getQueryData(`getProductInRange-${id}`),
    }
  )

  return [data?.data, status, error]
}

type useGetProductType = {
  query: { [key: string]: string }
  limit: number
  key: string
}

export function useGetProduct(queryData: useGetProductType) {
  const queryClient = useQueryClient()

  function getProductInRange() {
    return axios.post('/api/get-products', queryData)
  }

  const { data, status, error } = useQuery(
    `getProducts-${queryData.key}`,
    getProductInRange,
    {
      staleTime: Infinity,
      placeholderData: () =>
        queryClient.getQueryData(`getProducts-${queryData.key}`),
    }
  )

  return [data?.data, status, error]
}
