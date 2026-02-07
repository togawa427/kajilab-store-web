"use client"
import { Button } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import * as QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import * as KajilabPayComponent from "@/app/features/kajilabpay/components/Index"
import { postKajilabPayQR } from '@/api';

type KajilabPayMobileCanvasProps = {
  userBarcode: string
  name: string
  qrcodeUrl: string
}

function KajilabPayMobileCanvas({userBarcode, name, qrcodeUrl}: KajilabPayMobileCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const barcodeRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // LocalStorage保存
  useEffect(() => {
    if (!userBarcode || !name || !qrcodeUrl) return;
    if (typeof window === "undefined") return;

    localStorage.setItem(
      "kajilabpaymobile",
      JSON.stringify({
        userBarcode,
        name,
        qrcodeUrl,
      })
    );
  }, [userBarcode, name, qrcodeUrl]);

  // Canvas作成
  useEffect(() => {
    setIsLoading(false)
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 画像サムネサイズ
    let imgWidth = 856
    let imgHeight = 593 
    // 説明グレー部分サイズ
    let detailWidth = 974
    let detailHeight = 989
    // 画像サムネと説明グレー部分が被る高さ
    let conflictHeight = 156
    // Canvas サイズ
    canvas.width = detailWidth;
    canvas.height = imgHeight + detailHeight - conflictHeight;

    // 真っ黒に塗る
    // ctx.fillStyle = "#000000";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#D9D9D9"
    ctx.beginPath()
    ctx.roundRect(0, imgHeight-conflictHeight, detailWidth, detailHeight, 50)
    ctx.fill()
    // ctx.fillRect(0, imgHeight-150, imgWidth+100, imgHeight+600)

    // 注意書き部分
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "black";
    let contentStartX = 29
    ctx.fillText("1. カードの利用は署名及び登録された本人に限ります。本人以外の使用がばれた場合商店係が怒ります。", contentStartX, imgHeight+45);
    ctx.fillText("2. カードは一人一枚の発行になります。重複発行はできません。", contentStartX, imgHeight+80)
    ctx.fillText("3. カード紛失時や不正利用発覚時は商店係に連絡してください。新しいカードと交換になります。", contentStartX, imgHeight+115)
    ctx.fillText("4. 残高の有効期限は原則卒業までです。", contentStartX, imgHeight+150)

    // お名前部分
    let nameWidth = 621
    let nameHeight = 292
    ctx.font = "48px sans-serif";
    ctx.fillText("お名前", contentStartX, imgHeight+230)
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(contentStartX, imgHeight+250, nameWidth, nameHeight)
    if(name.length>6){
      ctx.font = "60px Kosugi Maru"; // 英語10文字以下なら入る大きさ
    } else {
      ctx.font = "100px Kosugi Maru"; // 英語10文字以下なら入る大きさ
    }
    ctx.fillStyle = "#000000"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(name, contentStartX + (nameWidth/2), imgHeight+250+(nameHeight/2))

    // 残高照会QR部分
    let zandakaWidth = 277
    let zandakaHeight = nameHeight
    ctx.font = "20px sans-serif";
    ctx.textAlign = "start"
    ctx.fillText("↓スマホで読み取って残高確認", contentStartX+nameWidth+20, imgHeight+230)
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(contentStartX+nameWidth+20, imgHeight+250, zandakaWidth, zandakaHeight)
    ctx.fillStyle = "#000000"
    ctx.font = "8px sans-serif";
    ctx.textBaseline = "bottom"
    ctx.textAlign = "center"
    ctx.fillText(qrcodeUrl, contentStartX + nameWidth + 20 + (zandakaWidth/2), imgHeight+249+(zandakaHeight))
    QRCode.toDataURL(qrcodeUrl, { width: 200 }).then((url) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, contentStartX+nameWidth+20, imgHeight+250, zandakaWidth, zandakaWidth);
      };
      img.src = url;
    });

    // バーコード部分
    let barcodeWidth = 918
    let barcodeHeight = 176
    ctx.fillStyle = "#000000"
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    ctx.font = "48px sans-serif";
    ctx.fillText("精算時提示用バーコード", contentStartX, imgHeight+570)
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(contentStartX, imgHeight+630, barcodeWidth, barcodeHeight)
    const barcodeCanvas = barcodeRef.current;
    if (!barcodeCanvas) return;
    JsBarcode(barcodeCanvas, userBarcode, {
      format: "CODE128",
      width: 2,
      height: 140,
      displayValue: false,
      margin: 20,
    });
    ctx.drawImage(barcodeCanvas, contentStartX, imgHeight + 630, barcodeWidth, barcodeHeight);

    // 画像読み込み
    const img = new Image()
    img.src = "/images/kajilabpaycard.png"

    img.onload = () => {
      ctx.drawImage(img, (canvas.width-imgWidth)/2, 0, imgWidth, imgHeight);
    }
    setIsLoading(false)
  }, [userBarcode, name, qrcodeUrl]);

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "kajilabpay-card.png"; // ファイル名
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <div className='mb-2'>
        {isLoading ? (
          <>
            <div>生成中</div>
            <div className="mx-auto mt-2 animate-spin h-10 w-10 border-4 border-kirby-lightpink rounded-full border-t-transparent"></div>
          </>
        ) : (
          <Button color="#FADA0A" className='mt-1 text-gray-900' onClick={downloadCanvas}>
            ダウンロード
          </Button>
        )}
      </div>
      <canvas
        className='w-4/5 mx-auto shadow-xl border-slate-50 border-2'
        ref={canvasRef}
      />
      <canvas
        ref={barcodeRef}
        style={{ display: "none" }}
      />
      
    </div>
  )
}

export default KajilabPayMobileCanvas