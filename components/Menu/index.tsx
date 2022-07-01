import dynamic from 'next/dynamic'
import { memo } from 'react'

import PrimaryMenu from '@/components/Menu/PrimaryMenu'
import { useMediaQuery } from '@/hooks'
import useNav from '@/hooks/useNav'

const DynamicSecondaryMenu = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SecondaryMenu' */ '@/components/Menu/SecondaryMenu'
    ),
  { ssr: false }
)

const DynamicMobileSearchbar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'MobileSearchbar' */ '@/components/Search/MobileSearchbar'
    )
)

function MenuComponent() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { showMobileSearch } = useNav()

  return (
    <nav className="nav mx-auto container px-4 pb-3 md:pb-0">
      <PrimaryMenu />
      {!mobileWidth && <DynamicSecondaryMenu />}
      {mobileWidth && showMobileSearch && <DynamicMobileSearchbar />}
    </nav>
  )
}
const Menu = memo(MenuComponent)

export default Menu
