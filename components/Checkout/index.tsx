import Breadcrumb from '@/components/Breadcrumb'
import DeliveryAddress from '@/components/Checkout/DeliveryAddress'
import PaymentMethod from '@/components/Checkout/PaymentMethod'
import ReviewOrder from '@/components/Checkout/ReviewOrder'
import breadcrumbContent from '@/json/breadcrumb.json'

export default function index() {
  return (
    <div className="w-full bg-gray-100 mx-auto p-4 pb-8">
      <div className="container flex flex-col mx-auto">
        <Breadcrumb breadcrumbItems={breadcrumbContent.checkout} />
        <div className="content flex flex-col md:flex-row md:flex-wrap w-full mx-auto">
          <ReviewOrder />
          <DeliveryAddress />
          <PaymentMethod />
        </div>
      </div>
    </div>
  )
}
