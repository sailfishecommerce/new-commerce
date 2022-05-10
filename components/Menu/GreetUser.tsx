import { useQuery } from 'react-query'

import { useAccount } from '@/hooks'
import greetUser from '@/lib/greetUser'

export default function GreetUser() {
  const { getUserAccount } = useAccount()
  const { data: userDetails } = useQuery('userdetails', getUserAccount, {
    staleTime: Infinity,
  })

  return (
    <div className="cart mountain-green font-bold text-xs">
      {userDetails !== null ? (
        <p className="text-xs md:text-sm text-right">
          {greetUser()}, {userDetails?.name}{' '}
        </p>
      ) : (
        <p className="text-xs md:text-sm text-right">{greetUser()}, Guest</p>
      )}
    </div>
  )
}