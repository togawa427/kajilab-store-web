"use client";
import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Button } from "@mantine/core";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";

type BarcodeScannerProps = {
  handleScan: (barcodeText: string) => Promise<void>
}

export default function BarcodeScanner({handleScan}: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);

  const startScan = async () => {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.ITF,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ]);

    const codeReader = new BrowserMultiFormatReader(hints);

    const constraints: MediaStreamConstraints = {
      video: {
        facingMode: { ideal: "environment" }, // 背面カメラ
        width: { ideal: 1920 },               // フルHD
        height: { ideal: 1080 },
        // focusMode: "continuous",              // 対応端末のみ
      },
      audio: false,
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    codeReader.decodeFromVideoDevice(
      undefined, // デフォルトカメラ
      videoRef.current!,
      (result, error) => {
        if (result) {
          console.log("読み取り結果:", result.getText());
          handleScan(result.getText())
          controlsRef.current?.stop();
          stream.getTracks().forEach(track => track.stop())
        }
      }
    )
    .then((controls) => {
      controlsRef.current = controls
    })

    return () => {
      controlsRef.current?.stop();
    };
  }

  return (
    <div>
      <Button color="#FADA0A" className='mt-1 text-gray-900' onClick={startScan} >カメラ起動</Button>
      <video ref={videoRef} className="w-full h-full object-cover" playsInline/>
    </div>
  )  
}