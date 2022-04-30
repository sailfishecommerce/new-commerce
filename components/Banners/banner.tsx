import classNames from 'classnames'
import type { ImageProps } from 'next/image'
import Image from 'next/image'
import { useCallback, useState } from 'react'

import { Container } from '@/components/Container'
import { DummyWrapper } from '@/components/dummy-wrapper/dummy-wrapper'
import { useIsMounted } from '@/hooks/useIsMounted'

export type BannerSize = 'l' | 'm' | 's' | 'xl' | 'xs-large' | 'xs-small'

export type BannerProps = {
  size: BannerSize
  title?: string
  subtitle?: string
  description?: string
  image?: ImageProps['src']
  imageAlt?: string
  overlay?: boolean
  gradient?: boolean
  fullWidth?: boolean
  className?: string
  classNameTitle?: string
  classNameSubtitle?: string
  classNameDescription?: string
  children?: React.ReactNode
}

export function Banner({
  size,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  overlay = false,
  gradient = false,
  fullWidth = false,
  className,
  classNameTitle,
  classNameSubtitle,
  classNameDescription,
  children,
}: BannerProps) {
  const [loaded, setLoaded] = useState(false)
  const isMounted = useIsMounted()

  const handleLoadingComplete = useCallback(
    () => (isMounted() ? setLoaded(true) : null),
    [isMounted]
  )

  if (!size) return null

  const Wrapper = fullWidth ? DummyWrapper : Container

  return (
    <>
      <Wrapper
        className={classNames(
          'relative text-white',
          {
            'bg-brand-black text-center py-1 px-4': size?.startsWith('xs'),
            'text-sm': size === 'xs-large',
            'text-xs font-bold uppercase': size === 'xs-small',

            'h-24': size === 's',

            'h-36 lg:h-40': size === 'm',

            'h-44 lg:h-56': size === 'l',

            'h-48 lg:h-96': size === 'xl',
          },
          className
        )}
      >
        {image && (
          <Image
            src={image}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className={classNames('transition-opacity', {
              '!opacity-0': !loaded,
            })}
            priority={true}
            onLoadingComplete={handleLoadingComplete}
          />
        )}

        {overlay && (
          <div className="absolute inset-0 bg-neutral-darkest opacity-40" />
        )}

        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-l from-brand-black" />
        )}

        {!children && (
          <header className="absolute inset-0 flex flex-col justify-center p-6 text-shadow-medium gap-2 lg:gap-0 lg:flex-row lg:items-center lg:p-12">
            <div
              className={classNames(
                'flex flex-col  gap-2 lg:gap-4',
                description ? 'w-full lg:w-3/6' : 'w-full',
                { uppercase: size !== 's' }
              )}
            >
              {title && (
                <h1
                  className={classNames(
                    'heading-2 lg:heading-1',
                    {
                      'label-semibold lg:subhead': size === 's',
                      'heading-3': size === 'm',
                    },
                    classNameTitle
                  )}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
              {subtitle && (
                <p
                  className={classNames(
                    {
                      'text-sm font-bold lg:text-3xl': size !== 's',
                      'body-regular': size === 's',
                    },
                    classNameSubtitle
                  )}
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                />
              )}
            </div>

            {description && (
              <p
                className={classNames(
                  'w-full lg:w-3/6 font-bold hidden lg:block',
                  {
                    'text-xl': size === 'xl',
                  },
                  classNameDescription
                )}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </header>
        )}

        {children}
      </Wrapper>

      {description && (
        <p
          className={classNames('block mt-4 lg:hidden', classNameDescription)}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </>
  )
}