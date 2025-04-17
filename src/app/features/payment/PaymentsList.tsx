import React from 'react'
import * as PaymentComponent from "@/app/features/payment/Index"
import { SalesDay } from '@/types/log'

type PaymentListsPropsType = {
  salesDays: SalesDay[];
  month: number;
  year: number;
}

function PaymentsList({salesDays, month, year}: PaymentListsPropsType) {
  return (
    <div className="mt-5 mb-20">
      {salesDays.map((salesDay) => (
        <PaymentComponent.PaymentByDay
          key={String(salesDay.day)}
          salesPerProducts={salesDay.Payments}
          totalSales={salesDay.total_sale}
          day={salesDay.day}
          month={month}
          year={year}
        />
      ))}
    </div>
  )
}

export default PaymentsList