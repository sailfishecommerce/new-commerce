import OrderSummary from '@/components/Checkout/OrderSummary'
// import AirwallexPaymentMethod from '@/components/Payment/AirwallexPaymentMethod'
import BankTransferPaymentMethod from '@/components/Payment/BankTransferPaymentMethod'
import PaymentWithStripe from '@/components/Payment/PaymentWithStripe'

export default function PaymentMethod() {
  return (
    <div className="flex flex-col lg:w-1/3 w-full">
      <div className="flex w-full flex-col bg-white rounded-md p-4 mb-2">
        <div className="payment-methods flex items-center justify-between">
          <h3 className="font-semibold text-xl mb-4">
            3.Payment method & Order Total
          </h3>{' '}
        </div>
        <p className="text-base mb-2">
          For credit/debit card, you can pay via Paypal. No Paypal account
          required.
        </p>
        <>
          <PaymentWithStripe title="Stripe" />
          {/* <AirwallexPaymentMethod /> */}
          <BankTransferPaymentMethod />
        </>
        <OrderSummary />
      </div>
    </div>
  )
}
