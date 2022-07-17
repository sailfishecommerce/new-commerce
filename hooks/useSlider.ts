/* eslint-disable no-nested-ternary */
import memoize from 'memoize-one'

import { useMediaQuery } from '@/hooks'

export default function useSlider() {
  const memoisedData = memoize((selectedProducts: any) => selectedProducts)
  const mobile = useMediaQuery('(max-width:426px)')
  const laptop = useMediaQuery('(max-width:1440px)')
  const midLaptop = useMediaQuery('(max-width:1024px)')
  const tablet = useMediaQuery('(max-width:768px)')

  const deviceWidth = mobile
    ? { size: 190, height: 300, width: 400 }
    : tablet
    ? { size: 220, height: 400, width: 720 }
    : midLaptop
    ? { size: 240, height: 400, width: 900 }
    : laptop
    ? { size: 260, height: 400, width: 1200 }
    : { size: 270, height: 400, width: 1450 }

  return { memoisedData, deviceWidth }
}