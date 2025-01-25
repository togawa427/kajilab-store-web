import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

type MonthSelectorPropsType = {
  year: number;
  month: number;
  salesMonth: number;
}

function MonthSelector({year, month, salesMonth}: MonthSelectorPropsType) {
  return (
    <div className="text-2xl flex justify-center">
      <Link href={`/log/payment/2024/12`}><IconChevronLeft size={60} color='blue'/></Link>
      <div className='w-1/3 text-center'>
        <div>{year}年{month}月</div>
        <div className="text-blue-800 font-bold">収入：¥ {salesMonth}</div>
      </div>
      <Link href={`/log/payment/2025/1`}><IconChevronRight size={60} color='blue'/></Link>
    </div>
  )
}

export default MonthSelector