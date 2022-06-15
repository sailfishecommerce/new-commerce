import PolicyView from '@/components/View/PolicyView'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function ReturnrefundsPage() {
  return (
    <CustomercareLayout>
      <PolicyView dbNode="return-and-refunds" />
    </CustomercareLayout>
  )
}
