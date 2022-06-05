import { useQuery } from 'react-query'

import ShippingMethodTag from '@/components/Tag/ShippingMethodTag'
import useShipping, { useShippingMutation } from '@/hooks/useShipping'

interface Props {
  shippingMethod: string
}

export default function ShippingMethod({ shippingMethod }: Props) {
  const { useUpdateShippingRate } = useShippingMutation()
  const updateShippingRate = useUpdateShippingRate()

  function updateShippingMethod(value: string) {
    updateShippingRate.mutate(value)
  }
  const { getShippingRates } = useShipping()

  const { data, status } = useQuery('getShippingRate', getShippingRates)

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-3">Shipping method</h4>
      <div className="shipping-methods flex flex-col">
        {status === 'success' &&
          data?.services?.map((shippingMethodItem: any) => (
            <ShippingMethodTag
              key={shippingMethodItem.id}
              content={shippingMethodItem}
              shippingMethod={shippingMethod}
              updateShippingMethod={updateShippingMethod}
            />
          ))}
      </div>
    </div>
  )
}
