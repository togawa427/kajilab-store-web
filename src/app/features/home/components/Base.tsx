"use client"
import React, { useEffect, useState } from 'react'
import { Product, Products } from '@/types/response'
import Loading from '@/app/components/Loading'
import { useGetAPI } from '@/app/hooks/useGetAPI'
import { PageTitle } from '@/app/components/PageTitle'
import ProductsFilter from '@/app/components/ProductsFilter'

const Base = () => {
  const limit = 20
  const updatedDays = 30
  const {data: products, isLoading: loading, error} = useGetAPI<Products>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?limit=${limit}&&updated_days=${updatedDays}`
  )

  if(loading) return(<Loading message='商品情報取得中'/>)
  if(error || !products) return(<div>読み込み失敗</div>)
  return (
    <div className="mb-10 md:pt-5 pt-0">
      <PageTitle
        title='商品在庫一覧'
        subtitle='Products Stock'
      />

      <div className='my-5'>
        <ProductsFilter
          editable={false}
        />
      </div>
    </div>
  )
}

export default Base