"use client"
import React from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import * as PaymentComponent from "@/app/features/payment/Index"


type BasePropsType = {
  year: number;
  month: number;
}

const Base = ({year, month}: BasePropsType) => {

  return (
    <div className="max-w-3xl mx-auto">
      {/* 年月日 */}
      <PaymentComponent.MonthSelector year={year} month={month}/>

      {/* 履歴 */}
      <PaymentComponent.PaymentsList/>
      
      
    </div>
  )
}

export default Base