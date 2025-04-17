import React from 'react'
import * as PaymentComponent from "@/app/features/payment/Index"
import { SalesDay } from '@/types/log'

type PaymentListsPropsType = {
  salesDays: SalesDay[];
  month: number;
  year: number;
  responseDate: Date;
}

function PaymentsList({salesDays, month, year, responseDate}: PaymentListsPropsType) {
  return (
    <div className="mt-5 mb-20">
      <div className='text-end md:text-base text-sm'>更新日時：{responseDate.getFullYear()}年{responseDate.getMonth()}月{String(responseDate.getDate()).padStart(2, '0')}日 {String(responseDate.getHours()).padStart(2, '0')}:{String(responseDate.getMinutes()).padStart(2, '0')}:{String(responseDate.getSeconds()).padStart(2, '0')}</div>
      <div className='text-end md:text-base text-sm'>（更新頻度：約1時間）</div>
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