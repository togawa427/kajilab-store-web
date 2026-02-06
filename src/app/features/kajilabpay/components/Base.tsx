"use client"
import { Button, SegmentedControl } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import * as QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import * as KajilabPayComponent from "@/app/features/kajilabpay/components/Index"
import { postKajilabPayQR } from '@/api';

const Base = () => {
  const [haveKajilabPayCard, setHaveKajilabPayCard] = useState(false)
  const [userBarcode, setUserBarcode] = useState('')
  const [userName, setUserName] = useState('')
  const [userQRCodeURL, setUserQRCodeURL] = useState('')
  

  return (
    <div>
      <div className='text-2xl font-black text-center my-2'>梶研Payモバイル登録</div>
      <div className='text-1xl font-bold text-center text-white mx-auto px-10 bg-kirby-pink w-fit rounded-full'>
        Kajilab Pay Mobile
      </div>

      <div className='bg-white text-sm text-center font-semibold mt-8 mb-10 rounded-lg shadow-xl pb-3'>
        <div className='flex mb-3'>
          {haveKajilabPayCard ? (
            // 梶研Payカードを持っている場合
            <>
            <button onClick={() => setHaveKajilabPayCard(false)} className='flex-1 text-slate-500 text-xs bg-slate-200 py-1'>梶研Payカードを持っていない</button>
            <button onClick={() => setHaveKajilabPayCard(true)} className='flex-1 text-black text-xs bg-white py-1'>梶研Payカードを持っている</button>
            </>
          ) : (
            // 梶研Payカードを持っていない場合
            <>
            <button onClick={() => setHaveKajilabPayCard(false)} className='flex-1 text-black text-xs bg-white py-1'>梶研Payカードを持っていない</button>
            <button onClick={() => setHaveKajilabPayCard(true)} className='flex-1 text-slate-500 text-xs bg-slate-200 py-1'>梶研Payカードを持っている</button>
            </>
          )}
        </div>

        {userBarcode != '' ? (
          // バーコードを既に生成済み
          <KajilabPayComponent.KajilabPayMobileDownload
            userBarcode={userBarcode}
            name={userName}
            qrcodeUrl={userQRCodeURL}
          />
        ) : haveKajilabPayCard ? (
          // 梶研Payカードを持っている場合
          <KajilabPayComponent.NotHaveKajilabPayCard/>
        ) : (
          // 梶研Payカードを持っていない場合
          <KajilabPayComponent.HaveKajilabPayCard
            setUserBarcode={setUserBarcode}
            setName={setUserName}
            setQRcodeUrl={setUserQRCodeURL}
          />
        ) }
        
        {/* <KajilabPayComponent.NotHaveKajilabPayCard/> */}
        {/* <KajilabPayComponent.HaveKajilabPayCard/> */}
        {/* <KajilabPayComponent.KajilabPayMobileDownload/> */}
      </div>
      
      {/* <Button onClick={() => createKajilabPayCardImage("1080123456788")}>
        画像を生成
      </Button> */}

      {/* <canvas
        ref={canvasRef}
        className="border border-gray-300 w-60"
      />

      <canvas
        ref={barcodeRef}
        width={918}
        height={176}
        style={{ display: "none" }}
      /> */}
    </div>
  )
}

export default Base