import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '@/lib/swellNode'

export default async function getAvailableDiscountHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  switch (req.method) {
    case 'GET': {
      return await swell
        .get('/coupons', {
          where: { active: true },
        })
        .then((response: any) => {
          return res.status(200).send(response.results)
        })
    }
    default:
      return null
  }
}
