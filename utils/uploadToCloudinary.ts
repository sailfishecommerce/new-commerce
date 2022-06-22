/* eslint-disable no-console */
import axios from 'axios'
import type { MutableRefObject } from 'react'

import firebaseDatabase from '@/lib/firebaseDatabase'

export default function uploadLogotoCloudinary(
  logo: any,
  toastID: MutableRefObject<null>,
  toastNotification: {
    loadingToast: (toastID: MutableRefObject<null>) => void
    updateToast: (
      toastID: MutableRefObject<null>,
      info: string,
      message: string
    ) => void
  },
  setIsUploadSuccessful: any
) {
  toastNotification.loadingToast(toastID)

  const formData = new FormData()
  formData.append('file', logo)
  formData.append('upload_preset', 'live_healthy_store')
  formData.append('api_key', `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`)

  return axios
    .post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    )
    .then((response) => {
      console.log('upload-response', response)
      toastNotification.updateToast(
        toastID,
        'success',
        'Logo upload successful'
      )
      const { writeData } = firebaseDatabase()
      writeData('logo', JSON.stringify(response.data.url))
      setIsUploadSuccessful(true)
    })
    .catch((err) => {
      console.log('image-upload-err', err)
      setIsUploadSuccessful(false)
      return toastNotification.updateToast(toastID, 'error', 'upload error')
    })
}
