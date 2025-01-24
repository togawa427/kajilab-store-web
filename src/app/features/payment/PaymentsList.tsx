import React from 'react'
import * as PaymentComponent from "@/app/features/payment/Index"

function PaymentsList() {
  return (
    <div className="mt-5 mb-20">
      <PaymentComponent.PaymentByDay />
      <PaymentComponent.PaymentByDay />
    </div>
  )
}

export default PaymentsList