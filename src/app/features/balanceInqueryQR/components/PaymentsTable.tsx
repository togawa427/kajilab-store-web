"use client"
import { Payment } from '@/types/response';
import * as BalanceInqueryQR from "@/app/features/balanceInqueryQR/components/Index"
import React from 'react'

type PaymentsTablePropsType = {
  payments: Payment[];
}

function PaymentsTable({payments}: PaymentsTablePropsType) {
  return (
    <div className="border border-gray-500 bg-white mt-3">
      {payments.map((payment) => (
        <BalanceInqueryQR.PaymentPanel key={payment.id} payment={payment} products={payment.products}/>
      ))}
    </div>
  )
}

export default PaymentsTable