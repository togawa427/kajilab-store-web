"use client"
import React from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import * as PaymentComponent from "@/app/features/payment/Index"
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { PaymentMonth } from '@/types/log';


type BasePropsType = {
  year: number;
  month: number;
  paymentMonth: PaymentMonth;
}

const Base = ({year, month, paymentMonth}: BasePropsType) => {

  return (
    <div className="max-w-3xl mx-auto">
      {/* 年月日 */}
      <PaymentComponent.MonthSelector year={year} month={month} salesMonth={paymentMonth.sales}/>

      {/* 履歴 */}
      <PaymentComponent.PaymentsList/>
      
      
    </div>
  )
}

export default Base