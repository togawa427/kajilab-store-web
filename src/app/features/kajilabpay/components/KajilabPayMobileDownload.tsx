import { Button } from '@mantine/core'
import React from 'react'
import * as KajilabPayComponent from "@/app/features/kajilabpay/components/Index"

type KajilabPayMobileDownloadProps = {
  userBarcode: string
  name: string
  qrcodeUrl: string
}

export default function KajilabPayMobileDownload({userBarcode, name, qrcodeUrl}: KajilabPayMobileDownloadProps) {
  // LocalStorageの削除
  const removeLocalStorage = () => {
    localStorage.removeItem("kajilabpaymobile")
    window.location.reload()
  }
  return (
    <div>
      <p>下の画像をダウンロードして完了です</p>
      <p className='mb-2'>引き続き梶研Payカードは利用可能です</p>
      <KajilabPayComponent.KajilabPayMobileCanvas
        userBarcode={userBarcode}
        name={name}
        qrcodeUrl={qrcodeUrl}
      />

      <Button color="#FADA0A" className='mt-10 text-gray-900' onClick={removeLocalStorage}>
        作成しなおす
      </Button>

    </div>
  )
}
