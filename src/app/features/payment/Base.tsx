"use client"
import React from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import * as PaymentComponent from "@/app/features/payment/Index"
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { SalesMonth } from '@/types/response';


type BasePropsType = {
  year: number;
  month: number;
  salesMonth: SalesMonth;
}

const Base = ({year, month, salesMonth}: BasePropsType) => {

  return (
    <div className="max-w-3xl mx-auto">
      {/* 年月日 */}
      <PaymentComponent.MonthSelector year={year} month={month} salesMonth={salesMonth.total_month_sale}/>

      {/* 履歴 */}
      <PaymentComponent.PaymentsList
        salesDays={salesMonth.sales}
        month={salesMonth.month}
        year={salesMonth.year}
      />
      
      
    </div>
  )
}

export default Base