import { useAtom } from 'jotai'
import { BiLogOut } from 'react-icons/bi'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

import Modal from '@/components/Modal'
import { useAccount, useMediaQuery } from '@/hooks'
import { modalAtom } from '@/lib/atomConfig'
import type { modalType } from '@/lib/atomConfigType'

interface Props {
  show: boolean
  onHide: () => void
}

export default function LogoutModal({ show, onHide }: Props) {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { getUserAccount, logoutUser } = useAccount()
  const [, setModal]: any = useAtom<modalType>(modalAtom)
  // const { useLogout } = useAuthTemp()
  const { data } = useQuery('userDetails', getUserAccount)
  const iconSize = mobileWidth ? 16 : 22
  // const logout = useLogout()

  function logoutHandler() {
    logoutUser()
      .then(() => {
        toast.success('Logout successful')
        setModal('MODAL_LOGOUT')
      })
      .catch((error) => {
        toast.error(`unable to logout user, ${error}`)
      })
  }

  // const toastId = logout.isLoading ? isLoading() : ''

  return (
    <Modal
      modalHeaderClassName="absolute z-40 -right-5 -top-5"
      modal={show}
      modalHandler={onHide}
    >
      <div className="logoutModal">
        <h1 className="text-center text-xl">
          Thanks for shopping with{' '}
          <span className="mountain-green mx-2">Live Healthy Stores</span>
        </h1>
        <h3 className="my-2">
          Hello{' '}
          <span className="mountain-green font-semibold">{data?.name}</span>,
          are you sure you want to logout?
        </h3>
        <button
          type="button"
          className="mt-6 flex items-center text-white  px-4 py-1 rounded-xl mx-auto bg-mountain-green"
          onClick={logoutHandler}
        >
          <BiLogOut
            className="lg:mr-2 mr-0 hover:text-green-500"
            size={iconSize}
          />
          Logout
        </button>
      </div>
    </Modal>
  )
}
