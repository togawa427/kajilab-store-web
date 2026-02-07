"use client"
import React from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import * as PaymentComponent from "@/app/features/payment/Index"
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { SalesMonth } from '@/types/response';
import dayjs from "dayjs"
import { PageTitle } from '@/app/components/PageTitle';


type BasePropsType = {
  year: number;
  month: number;
  salesMonth: SalesMonth;
}

const Base = ({year, month, salesMonth}: BasePropsType) => {
  console.log(salesMonth)
  return (
    <div className='md:pt-5 pt-0'>
      <PageTitle
        title='月間売上'
        subtitle='Monthly Sales'
      />
      <div className="max-w-3xl mx-auto">
        {/* 年月日 */}
        <PaymentComponent.MonthSelector year={year} month={month} salesMonth={salesMonth.total_month_sale}/>

        {/* 履歴 */}
        <PaymentComponent.PaymentsList
          salesMonth={salesMonth}
          month={salesMonth.month}
          year={salesMonth.year}
          responseDate={dayjs(salesMonth.response_date, 'YYYY-MM-DD HH:mm:ss').toDate()}
        />
        
      </div>
     </div>
  )
}

export default Base