import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'

import Noticebar from '@/components/Alerts/Noticebar'
import DiscountSlider from '@/components/Slider/DiscountSlider'
import { useMediaQuery } from '@/hooks'
import useNav from '@/hooks/useNav'
import useNavStyle from '@/hooks/useNavStyle'
import { categoryDropdownAtom, noticebarAtom } from '@/lib/atomConfig'

const DynamicMobileSlideMenu = dynamic(
  () =>
    import(
      /* webpackChunkName: 'MobileSlideMenu' */ '@/components/Menu/MobileSlideMenu'
    )
)

const DynamicMenu = dynamic(
  () => import(/* webpackChunkName: 'DynamicMenu' */ '@/components/Menu')
)

const DynamicAllCategoriesDropdownView = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AllCategoriesDropdownView' */ '@/components/Dropdown/AllCategoriesDropdownView'
    )
)

export default function Header() {
  const { navStyle } = useNavStyle()
  const [noticebar, setNoticebar] = useAtom(noticebarAtom)
  const [categoryDropdown, setCategoryDropdown] = useAtom(categoryDropdownAtom)

  function toggleCategoryDropdownHandler() {
    return setCategoryDropdown((prev) => !prev)
  }

  function toggleNoticebar() {
    return setNoticebar((prevState) => !prevState)
  }
  const { mobileMenu } = useNav()
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const displayShadow = mobileWidth ? 'header' : ''

  return (
    <>
      <header
        className={`${navStyle} ${displayShadow} bg-white w-full pb-0  md:pb-2`}
      >
        <DiscountSlider />
        {noticebar && <Noticebar toggleBarVisibility={toggleNoticebar} />}
        <DynamicMenu />
        {mobileWidth && mobileMenu && <DynamicMobileSlideMenu />}
      </header>
      {categoryDropdown && !mobileWidth && (
        <DynamicAllCategoriesDropdownView
          updateDropdown={toggleCategoryDropdownHandler}
        />
      )}
    </>
  )
}
