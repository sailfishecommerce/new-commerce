import ShoppingBagIcon from '@material-design-icons/svg/outlined/shopping_bag.svg'
import SyncIcon from '@material-design-icons/svg/outlined/sync.svg'
import type { MouseEventHandler } from 'react'
import { useCallback, useState } from 'react'

import { ProductDescription } from '@/components/Product/product-description'
import { ProductFavorite } from '@/components/Product/product-favorite'
import { ProductImage } from '@/components/Product/product-image'
import { ProductLabel } from '@/components/Product/product-label'
import type { ProductPriceCurrency } from '@/components/Product/product-price'
import { ProductPrice } from '@/components/Product/product-price'
import { ProductRating } from '@/components/Product/product-rating'
import type { ProductSizeType } from '@/components/Product/product-sizes'
import { ProductSizes } from '@/components/Product/product-sizes'
import type { ProductTagType } from '@/components/Product/product-tag'
import { ProductTag } from '@/components/Product/product-tag'
import { ProductTitle } from '@/components/Product/product-title'
import { Button } from '@ui/button/button'
import { IconLabel } from '@ui/icon-label/icon-label'

export type ProductDetailProps = {
  image?: string
  label?: string
  title?: string
  description?: string
  tags?: ProductTagType[]
  rating?: number
  reviews?: number
  available?: boolean
  sizes?: ProductSizeType[]
  price?: any | number
  originalPrice?: number
  currency?: ProductPriceCurrency
  popular?: boolean
  onCheckoutClick?: MouseEventHandler<HTMLButtonElement>
}

export type ProductDetailRatingProps = Pick<ProductDetailProps, 'reviews'>

function ProductDetailRating({ reviews }: ProductDetailRatingProps) {
  return (
    <a href="#reviews" className="body-bold underline">
      ({reviews} reviews)
    </a>
  )
}

export function ProductDetail({
  image,
  label,
  title,
  description,
  tags,
  rating,
  reviews,
  available,
  sizes,
  price,
  originalPrice,
  currency,
  popular,
  onCheckoutClick,
}: ProductDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const handleFavoriteClick = useCallback(
    () => setIsFavorite((favorite) => !favorite),
    []
  )

  const handleCheckoutClick = useCallback(
    (e) => {
      if (typeof onCheckoutClick === 'function') onCheckoutClick(e)
    },
    [onCheckoutClick]
  )

  return (
    <div className="flex flex-col gap-6 mb-12 lg:my-8 lg:flex-row">
      <div className="lg:w-8/12">
        <div className="flex flex-col items-center bg-brand-black lg:min-h-[500px]">
          {image && (
            <ProductImage src={image} alt={title} className="w-3/5 lg:w-2/5" />
          )}
        </div>
      </div>

      <div className="lg:w-4/12">
        {label && (
          <ProductLabel className="label-semibold">{label}</ProductLabel>
        )}
        {title && (
          <ProductTitle className="heading-4 mt-1">{title}</ProductTitle>
        )}
        {typeof rating !== 'undefined' && (
          <ProductRating
            rating={rating}
            reviews={reviews}
            reviewComponent={ProductDetailRating}
            className="mt-4"
            classNameStar="w-5 h-5"
          />
        )}
        {description && (
          <ProductDescription className="body-regular mt-6">
            {description}
          </ProductDescription>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-col items-start gap-1 mt-6">
            {tags.map((tag) => (
              <ProductTag key={tag.label} label={tag.label} theme={tag.theme} />
            ))}
          </div>
        )}
        {price && (
          <ProductPrice
            price={price}
            originalPrice={originalPrice}
            currency={currency}
            className="flex-row-reverse items-center justify-end gap-4 not-italic font-bold mt-3"
            classNamePrice="heading-4"
            classNameOriginalPrice="text-xl"
          />
        )}
        {sizes && sizes.length > 0 && <ProductSizes sizes={sizes} />}
        <Button
          type="primary"
          size="large"
          className="w-full mt-6"
          disabled={!available}
          onClick={handleCheckoutClick}
        >
          <IconLabel
            icon={ShoppingBagIcon}
            label="Add to Cart"
            labelPosition="right"
            className="gap-3"
            classNameLabel="btn-bold"
          />
        </Button>
        {popular && (
          <div className="mt-2">
            Hurry! This item is{' '}
            <span className="text-brand-nebula font-bold">selling fast</span>
          </div>
        )}
        <ul className="flex flex-col gap-3 mt-6">
          <li>
            <ProductFavorite
              layout="icon-label"
              isFavorite={isFavorite}
              onClick={handleFavoriteClick}
            />
          </li>
          <li>
            <IconLabel
              icon={SyncIcon}
              label="90 days return policy"
              labelPosition="right"
              className="gap-2 text-neutral-dark"
              classNameLabel=""
              classNameIcon="w-4 h-4"
            />
          </li>
          <li>
            <IconLabel
              icon={ShoppingBagIcon}
              label="Free shipping for loyalty club members"
              labelPosition="right"
              className="gap-2 text-neutral-dark"
              classNameLabel=""
              classNameIcon="w-4 h-4"
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
