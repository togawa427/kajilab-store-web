import { Button } from '@mantine/core'
import React from 'react'

function NotHaveKajilabPayCard() {
  return (
    <div>
      <p>梶研Payカード裏面の精算時提示用バーコードを</p>
      <p>スマホカメラで読み取ってください</p>
      <Button color="#FADA0A" className='mt-1 text-gray-900'>
        カメラを起動
      </Button>
      {/* <KajilabPayComponent.BarcodeScanner handleScan={createKajilabPayCardImage}/> */}
    </div>
  )
}

export default NotHaveKajilabPayCard