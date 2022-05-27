/* eslint-disable jsx-a11y/alt-text */
import { Text, View, Image } from '@react-pdf/renderer'

import { itemStyles } from '@/components/Invoice/invoice-style'
import FormattedPrice from '@/components/Price/FormattedPrice'
import invoiceProducts from '@/json/invoice-product.json'

export default function InvoiceListPdf({ quantity, currency, productId }: any) {
  const invoiceProduct: any = invoiceProducts.filter(
    (product) => product?.id === productId
  )[0]

  const productImage =
    typeof invoiceProduct?.images[0] === 'string'
      ? invoiceProduct?.images[0]
      : invoiceProduct?.images[0].file.url

  return (
    <View style={itemStyles.itemRow}>
      <View style={itemStyles.row}>
        <View style={itemStyles.imageRow}>
          <Image src={productImage} style={itemStyles.image} />
          <View>
            <Text style={itemStyles.text} wrap={true}>
              {invoiceProduct?.name}
            </Text>
            <Text style={itemStyles.text}>SKU {invoiceProduct?.sku}</Text>
          </View>
        </View>
        <View>
          <Text>
            {invoiceProduct.price ? (
              <FormattedPrice
                price={invoiceProduct.price}
                className="text-md font-bold strike-through"
                currency={currency}
              />
            ) : null}
          </Text>
          <Text>
            <FormattedPrice
              currency={currency}
              price={invoiceProduct.sale_price}
              className="text-md font-thin"
            />
          </Text>
        </View>
        <View>
          <Text>{quantity}</Text>
        </View>
        <View>
          <Text>
            <FormattedPrice
              className="text-md font-thin"
              price={invoiceProduct.sale_price}
              currency={currency}
            />
          </Text>
        </View>
      </View>
    </View>
  )
}