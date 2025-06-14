"use client"
import { KajilabpayLog} from '@/types/response';
import * as BalanceInqueryQR from "@/app/features/balanceInqueryQR/components/Index"
import React from 'react'

type KajilabpayLogsTablePropsType = {
  kajilabpayLogs: KajilabpayLog[];
}

function KajilabpayLogsTable({kajilabpayLogs}: KajilabpayLogsTablePropsType) {
  return (
    <div className="border border-gray-500 bg-white mt-3">
      {kajilabpayLogs.map((kajilabpayLog) => (
        <BalanceInqueryQR.LogPanel key={kajilabpayLog.id} log={kajilabpayLog} products={kajilabpayLog.products}/>
      ))}
    </div>
  )
}

export default KajilabpayLogsTable