import { useEffect, useState } from 'react'

import FooterLinkGroup from '@/components/Footer/FooterLinkGroup'
import useCategoryData from '@/hooks/useCategoryData'
import footerLinks from '@/json/footer.json'

export default function FooterLink() {
  const [data, status] = useCategoryData()
  const categories = status === 'success' ? data?.results.slice(12, 20) : []

  const shortLinkArray = categories.slice(0, 5)
  const [viewMore, setViewMore] = useState(true)
  const [linkArray, setLinkArray] = useState([])

  useEffect(() => {
    if (linkArray.length === 0) {
      setLinkArray(shortLinkArray)
    }
  }, [])

  const tagText = !viewMore ? 'Show Less' : 'View All'

  function updateLinkList() {
    setViewMore(!viewMore)
    if (viewMore) {
      setLinkArray(categories)
    } else {
      setLinkArray(shortLinkArray)
    }
  }

  return (
    <div className="pl-0 md:pl-12 order-2 md:order-1 flex items-start justify-around flex flex-col md:grid grid-cols-2 w-full md:w-2/4">
      <FooterLinkGroup title="About LiveHealthy" linkGroup={footerLinks} />
      {status === 'success' ? (
        <FooterLinkGroup
          title="Categories"
          tag={tagText}
          linkGroup={linkArray}
          onViewLinks={updateLinkList}
        />
      ) : (
        'loading'
      )}
    </div>
  )
}
