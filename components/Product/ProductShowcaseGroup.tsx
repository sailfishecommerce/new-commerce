import { useAtom } from 'jotai'

import ProductShowcase from '@/components/Product/ProductShowcase'
import { selectedVendorAtom } from '@/lib/atomConfig'

interface Props {
  group: Array<{
    category: string
    tabColor: string
  }>
}

export default function ProductShowcaseGroup({ group }: Props) {
  const [selectedVendor, setSelectedVendor] = useAtom(selectedVendorAtom)

  function updateVendor(vendor: string, index: number) {
    setSelectedVendor({ vendor, index })
  }

  return (
    <>
      {group.map((groupItem, index) => (
        <ProductShowcase
          index={index}
          key={groupItem.category}
          category={groupItem.category}
          tabColor={groupItem.tabColor}
          updateVendor={updateVendor}
          selectedVendor={selectedVendor}
        />
      ))}
    </>
  )
}