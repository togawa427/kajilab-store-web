import { Button } from '@mantine/core'
import React from 'react'
import * as KajilabPayComponent from "@/app/features/kajilabpay/components/Index"

type KajilabPayMobileDownloadProps = {
  userBarcode: string
  name: string
  qrcodeUrl: string
}

export default function KajilabPayMobileDownload({userBarcode, name, qrcodeUrl}: KajilabPayMobileDownloadProps) {
  return (
    <div>
      <p>下の画像をダウンロードして完了です</p>
      <p className='mb-2'>次回以降の会計も梶研Payカードは使用できます</p>
      <KajilabPayComponent.KajilabPayMobileCanvas
        userBarcode={userBarcode}
        name={name}
        qrcodeUrl={qrcodeUrl}
      />

    </div>
  )
}
