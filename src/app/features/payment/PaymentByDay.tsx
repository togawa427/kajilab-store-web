import { PaymentDay } from '@/types/log'
import React from 'react'

type PaymentByDayPropsType = {
  paymentDay: PaymentDay
}

function PaymentByDay({paymentDay}: PaymentByDayPropsType) {
  const jpDate = new Date(paymentDay.payDay.getTime())

  return (
    <div className="bg-gray-50 mb-3">
      <div className="flex px-3 py-1 text-lg md:text-2xl border-b">
        <div className="font-bold flex-auto">{jpDate.getDate()}日({jpDate.toLocaleDateString('ja', {weekday: 'short', timeZone: 'Asia/Tokyo'})})</div>
        <div className="text-blue-800">¥ {paymentDay.sales}</div>
      </div>
      <div>
        {paymentDay.payments.map((payment) => (
          <div key={jpDate + payment.name} className="flex px-3 py-1 text-sm md:text-xl">
            <div className="flex-auto">{payment.name} x {payment.quantity}</div>
            <div>¥ {payment.price * payment.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentByDay