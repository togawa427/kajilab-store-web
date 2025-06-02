import { KajilabpayLog, PaymentProduct } from '@/types/response';
import * as BalanceInqueryQR from "@/app/features/balanceInqueryQR/components/Index"
import React from 'react'

type LogPanelPropsType = {
  log: KajilabpayLog;
  products: PaymentProduct[];
}

export default function LogPanel({log, products}: LogPanelPropsType) {
  if(log.price > 0) {
    return(
      <BalanceInqueryQR.PaymentLogPanel key={log.id} log={log} products={log.products}/>
    )
  } else {
    return (
      <BalanceInqueryQR.ChargeLogPanel key={log.id} log={log} products={log.products}/>
    )
  }
}
