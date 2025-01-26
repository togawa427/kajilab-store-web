import { Button } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

type MonthSelectorPropsType = {
  year: number;
  month: number;
  salesMonth: number;
}

function MonthSelector({year, month, salesMonth}: MonthSelectorPropsType) {
  const router = useRouter();

  const prevMonth = () => {
    const currentDate = new Date(year, month-1);
    const prevMonthDate = new Date(currentDate);
    prevMonthDate.setMonth(currentDate.getMonth() - 1);
    router.push(`/log/payment/${prevMonthDate.getFullYear()}/${prevMonthDate.getMonth()+1}`)
    router.refresh()
  }

  const nextMonth = () => {
    const currentDate = new Date(year, month-1);
    console.log(currentDate.getMonth())
    const prevMonthDate = new Date(currentDate);
    prevMonthDate.setMonth(currentDate.getMonth()+1);
    console.log(prevMonthDate.getMonth())
    console.log(prevMonthDate)
    router.push(`/log/payment/${prevMonthDate.getFullYear()}/${prevMonthDate.getMonth()+1}`)
    router.refresh()
  }

  return (
    <div className="text-2xl flex justify-center">
      <Button variant="transparent" onClick={prevMonth}><IconChevronLeft size={60} color='blue'/></Button>
      <div className='w-1/3 text-center'>
        <div>{year}年{month}月</div>
        <div className="text-blue-800 font-bold">収入：¥ {salesMonth}</div>
      </div>
      <Button variant="transparent" onClick={nextMonth}><IconChevronRight size={60} color='blue'/></Button>
    </div>
  )
}

export default MonthSelector