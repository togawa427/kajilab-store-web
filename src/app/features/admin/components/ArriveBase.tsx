"use client"
import { AdminPageTitle } from '@/app/components/AdminPageTitle'
import Loading from '@/app/components/Loading'
import { useGetAPI } from '@/app/hooks/useGetAPI'
import { GetArrive } from '@/types/response'
import React from 'react'
import { ArriveLogList } from './ArriveLogList'

export const ArriveBase = () => {
  const {data: arrives, isLoading, error} = useGetAPI<GetArrive[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/arrive/logs?limit=30`
  )

  if(!arrives || isLoading) return <Loading message=''/>
  if(error) return <>サーバエラー</>
  return (
    <div className='mb-10 md:pt-5 pt-0'>
      <AdminPageTitle
        title='入荷履歴'
        subtitle='Arrive Log'
      />
      <div className='max-w-[800px] min-w-[350px] mx-auto'>
        <p className='text-end text-sm md:text-xl text-gray-600'>（最新30件）</p>
        <ArriveLogList arrives={arrives}/>
      </div>
    </div>
  )
}
