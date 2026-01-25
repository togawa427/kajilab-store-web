"use client"
import { Button } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import * as QRCode from "qrcode";
import JsBarcode from "jsbarcode";

const Base = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const barcodeRef = useRef<HTMLCanvasElement | null>(null);

  const handleClick = (qrcodeUrl: string, barcodeText: string) => {
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
    ctx.font = "100px Kosugi Maru"; // 英語10文字以下なら入る大きさ
    ctx.fillStyle = "#000000"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("togawa", contentStartX + (nameWidth/2), imgHeight+250+(nameHeight/2))

    // 残高照会QR部分
    let zandakaWidth = 277
    let zandakaHeight = nameHeight
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(contentStartX+nameWidth+20, imgHeight+250, zandakaWidth, zandakaHeight)
    ctx.fillStyle = "#000000"
    ctx.font = "12px sans-serif";
    ctx.textBaseline = "bottom"
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
    JsBarcode(barcodeCanvas, barcodeText, {
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
  };

  return (
    <div>
      <Button onClick={() => handleClick("https://kjlbstore.kajilab.dev", "1088153966793")}>
        白い画像を生成
      </Button>

      <canvas
        ref={canvasRef}
        className="border border-gray-300 w-96"
      />

      <canvas
        ref={barcodeRef}
        width={918}
        height={176}
        style={{ display: "none" }}
      />
    </div>
  )
}

export default Base