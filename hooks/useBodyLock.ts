/* eslint-disable consistent-return */
import { useEffect, useState } from 'react'

import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

type ReturnType = [boolean, (locked: boolean) => void]

function useBodyLock(initialLocked = false): ReturnType {
  const [locked, setLocked] = useState(initialLocked)

  // Do the side effect before render
  useIsomorphicLayoutEffect(() => {
    if (!locked) {
      return
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    // Get the scrollBar width
    const root = document.getElementById('__next') // or root
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow

      if (scrollBarWidth) {
        return (document.body.style.paddingRight = originalPaddingRight)
      }
    }
  }, [locked])

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked])

  console.log('locked-useBodyLock', locked)

  return [locked, setLocked]
}

export default useBodyLock
