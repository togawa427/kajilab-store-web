import { GetArrive } from '@/types/response'
import { IconX } from '@tabler/icons-react'
import dayjs from 'dayjs'
import React from 'react'

type ArriveLogListProps = {
  arrives: GetArrive[]
}

export const ArriveLogList = ({arrives}: ArriveLogListProps) => {
  const daysList = ["日", "月", "火", "水", "木", "金", "土"]
  return (
    <div className=''>
      {arrives.map((arrive) => (
        <div className='bg-white rounded my-3'>
          <div>
            <div className='
              font-bold flex
              px-1 py-0.5 md:px-2 md:py-1
              md:text-2xl text-base
            '>
              {/* <p>2025年10月12日(水)</p> */}
              <p>{dayjs(arrive.arrive_at).locale("ja").format("M月D日")}({daysList[dayjs(arrive.arrive_at).day()]})</p>
              <p className='text-end ml-auto font-bold text-red-600'>入荷原価：¥ {arrive.money}</p>
            </div>
          </div>
          <div className='h-0.5 bg-gray-200'/>
          <div className='px-1 md:px-2 text-sm md:text-xl'>
            {arrive.products.map((product) => (
              <div className='flex'>
                <p>{product.name} x {product.quantity}</p>
                <p className='ml-auto'>¥ {product.value * product.quantity}</p>
              </div>
            ))}
            <p className='
              text-end font-bold
              py-0.5 md:py-1
              text-base md:text-2xl
            '>
              総販売価格：¥ {arrive.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
