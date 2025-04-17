"use client"
import Loading from '@/app/components/Loading';
import { Button } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type MonthSelectorPropsType = {
  year: number;
  month: number;
  salesMonth: number;
}

function MonthSelector({year, month, salesMonth}: MonthSelectorPropsType) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const prevMonth = () => {
    setIsLoading(true)
    const currentDate = new Date(year, month-1);
    const prevMonthDate = new Date(currentDate);
    prevMonthDate.setMonth(currentDate.getMonth() - 1);
    router.push(`/log/payment/${prevMonthDate.getFullYear()}/${prevMonthDate.getMonth()+1}`)
    router.refresh()
    setIsLoading(false)
  }

  const nextMonth = () => {
    setIsLoading(true)
    const currentDate = new Date(year, month-1);
    const prevMonthDate = new Date(currentDate);
    prevMonthDate.setMonth(currentDate.getMonth()+1);
    router.push(`/log/payment/${prevMonthDate.getFullYear()}/${prevMonthDate.getMonth()+1}`)
    router.refresh()
    setIsLoading(false)
  }

  if(isLoading) return(<Loading message="読み込み中"/>)
  return (
    <div className="text-lg md:text-2xl flex justify-center">
      <Button variant="transparent" onClick={prevMonth}><IconChevronLeft size={60} color='blue'/></Button>
      <div className='w-1/2 md:w-1/3 text-center'>
        <div>{year}年{month}月</div>
        <div className="text-blue-800 font-bold">収入：¥ {salesMonth}</div>
      </div>
      <Button variant="transparent" onClick={nextMonth}><IconChevronRight size={60} color='blue'/></Button>
    </div>
  )
}

export default MonthSelector