import { Button } from '@mantine/core'
import React from 'react'
import * as KajilabPayComponent from "@/app/features/kajilabpay/components/Index"

type HaveKajilabPayCardProps = {
  handleScan: (barcodeText: string) => Promise<void>
  errorMessage: string
}

function HaveKajilabPayCard({handleScan, errorMessage}: HaveKajilabPayCardProps) {
  
  return (
    <div>
      <p>梶研Payカード裏面の精算時提示用バーコードを</p>
      <p>スマホカメラで読み取ってください</p>
      <p className='text-kirby-pink text-xs'>{errorMessage}</p>
      <KajilabPayComponent.BarcodeScanner handleScan={handleScan}/>
    </div>
  )
}

export default HaveKajilabPayCard