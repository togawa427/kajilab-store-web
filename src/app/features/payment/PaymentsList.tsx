import React from 'react'
import * as PaymentComponent from "@/app/features/payment/Index"
import { PaymentDay, PaymentMonth } from '@/types/log'

type PaymentListsPropsType = {
  paymentsDay: PaymentDay[];
}

function PaymentsList({paymentsDay}: PaymentListsPropsType) {
  return (
    <div className="mt-5 mb-20">
      {paymentsDay.map((paymentDay) => (
        <PaymentComponent.PaymentByDay key={String(paymentDay.payDay)} paymentDay={paymentDay}/>
      ))}
    </div>
  )
}

export default PaymentsList