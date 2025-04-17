import { SalesPerProduct } from '@/types/log'
import React from 'react'

type PaymentByDayPropsType = {
  salesPerProducts: SalesPerProduct[]
  totalSales: number
  day: number
  month: number
  year: number
}

function PaymentByDay({salesPerProducts, totalSales, day, month, year}: PaymentByDayPropsType) {
  const date = new Date(year, month-1, day)

  return (
    <div className="bg-gray-50 mb-3">
      <div className="flex px-3 py-1 text-lg md:text-2xl border-b">
        <div className="font-bold flex-auto">{date.getDate()}日({date.toLocaleDateString('ja', {weekday: 'short', timeZone: 'Asia/Tokyo'})})</div>
        <div className="text-blue-800">¥ {totalSales}</div>
      </div>
      <div>
        {salesPerProducts.map((salesPerProduct) => (
          <div key={date + salesPerProduct.name} className="flex px-3 py-1 text-sm md:text-xl">
            <div className="flex-auto">{salesPerProduct.name} x {salesPerProduct.quantity}</div>
            <div>¥ {salesPerProduct.unit_price * salesPerProduct.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentByDay