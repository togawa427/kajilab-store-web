import { Button, Space } from '@mantine/core'
import React from 'react'
import * as KajilabPayComponent from "@/app/features/kajilabpay/components/Index"

type KajilabPayMobileDownloadProps = {
  userBarcode: string
  name: string
  qrcodeUrl: string
}

export default function KajilabPayMobileDownload({userBarcode, name, qrcodeUrl}: KajilabPayMobileDownloadProps) {
  // LocalStorageの削除
  // const removeLocalStorage = () => {
  //   localStorage.removeItem("kajilabpaymobile")
  //   window.location.reload()
  // }
  return (
    <div>
      <p>下の画像をダウンロードして完了です</p>
      <p className='mb-2'>商店レジで残高チャージしてからお使いください</p>
      <KajilabPayComponent.KajilabPayMobileCanvas
        userBarcode={userBarcode}
        name={name}
        qrcodeUrl={qrcodeUrl}
      />
      <Space h='10px'/>

      {/* <Button color="#FADA0A" className='mt-10 text-gray-900' onClick={removeLocalStorage}>
        作成しなおす
      </Button> */}

    </div>
  )
}
