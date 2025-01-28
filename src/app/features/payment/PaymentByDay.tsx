import { PaymentDay } from '@/types/log'
import React from 'react'

type PaymentByDayPropsType = {
  paymentDay: PaymentDay
}

function PaymentByDay({paymentDay}: PaymentByDayPropsType) {
  return (
    <div className="bg-gray-50 text-xl mb-3">
      <div className="flex px-3 py-1 text-2xl border-b">
        <div className="font-bold flex-auto">{new Date(paymentDay.payDay).getDate()}日({String(new Date(paymentDay.payDay).toLocaleDateString('ja', {weekday: 'short'}))})</div>
        <div className="text-blue-800">¥ {paymentDay.sales}</div>
      </div>
      <div>
        {paymentDay.payments.map((payment) => (
          <div key={paymentDay.payDay + payment.name} className="flex px-3 py-1 text-xl">
            <div className="flex-auto">{payment.name} x {payment.quantity}</div>
            <div>¥ {payment.price * payment.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentByDay