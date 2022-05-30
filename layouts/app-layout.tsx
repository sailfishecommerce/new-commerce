import dynamic from 'next/dynamic'
import Head from 'next/head'
import type { PropsWithChildren } from 'react'

import Header from '@/components/Header'

// const Header = dynamic(
//   () => import(/* webpackChunkName: 'Header' */ '@/components/Header'),
//   {
//     ssr: false,
//   }
// )

const Footer = dynamic(
  () => import(/* webpackChunkName: 'Footer' */ '@/components/Footer'),
  {
    ssr: false,
  }
)

interface Props {
  title: string
}

export default function Applayout({
  children,
  title,
}: PropsWithChildren<Props>) {
  return (
    <>
      <Head>
        <title>{title} | Sailfish e-commerce online store </title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"
        />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  )
}
