"use client"
import React, { useState } from 'react'
import * as PaymentComponent from "@/app/features/payment/Index"
import { SalesDay } from '@/types/log'
import { SalesMonth } from '@/types/response';
import { SegmentedControl } from '@mantine/core';

type PaymentListsPropsType = {
  salesMonth: SalesMonth;
  month: number;
  year: number;
  responseDate: Date;
}

function PaymentsList({salesMonth, month, year, responseDate}: PaymentListsPropsType) {
  const flag = 0
  const [showMode, setShowMode] = useState('graph');

  const handleSelectDay = async (mode: string) => {
    setShowMode(mode)
  }
  return (
    <div className="mt-5 mb-20">
      <div className='flex'>
        <div className='flex-auto'>
          <SegmentedControl
            value={String(salesMonth)}
            onChange={handleSelectDay}
            data={[
              { label: 'グラフ', value: 'graph' },
              { label: 'リスト', value: 'list' },
            ]}
          />
        </div>
        <div className=''>
          <div className='text-end md:text-base text-sm'>更新日時：{responseDate.getFullYear()}年{responseDate.getMonth()+1}月{String(responseDate.getDate()).padStart(2, '0')}日 {String(responseDate.getHours()).padStart(2, '0')}:{String(responseDate.getMinutes()).padStart(2, '0')}:{String(responseDate.getSeconds()).padStart(2, '0')}</div>
          <div className='text-end md:text-base text-sm'>（更新頻度：約1時間）</div>
        </div>
      </div>
      {showMode === "graph" ? (
        /** グラフ表示 */
        <PaymentComponent.SalesGraph salesMonth={salesMonth}/>
      ) : (
        /** リスト表示 */
        salesMonth.sales.map((salesDay) => (
          <PaymentComponent.PaymentByDay
            key={String(salesDay.day)}
            salesPerProducts={salesDay.Payments}
            totalSales={salesDay.total_sale}
            day={salesDay.day}
            month={month}
            year={year}
          />
        ))
      )}
    </div>
  )
}

export default PaymentsList