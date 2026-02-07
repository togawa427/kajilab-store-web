"use client"
import { Badge, Button, Card, Group, Image, Pagination, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import * as Admin from "@/app/features/admin/components/Index"
import { getPageProducts, getProducts } from '@/api'
import { Asset, Product, Products } from '@/types/response'
import Link from 'next/link'
import Loading from '@/app/components/Loading'
import { useRouter, useSearchParams } from 'next/navigation'
import { PageTitle } from '@/app/components/PageTitle'
import { AdminPageTitle } from '@/app/components/AdminPageTitle'
import { useGetAPI } from '@/app/hooks/useGetAPI'

const Base = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter()

  const limit = 20
  const updatedDays = 30
  const {data: products, isLoading: productsLoading, error: productsError} = useGetAPI<Products>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?limit=${limit}&&offset=${limit*(currentPage-1)}&&updated_days=${updatedDays}`
  )
  const {data: asset, isLoading: assetLoading, error: assetError} = useGetAPI<Asset>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/assets`
  )
  
  
  console.log("APIでしゅとく")
  console.log(products?.total_count)

  // ページが変わったタイミング
  useEffect(() => {
    const tmpParams = new URLSearchParams()
    if(currentPage){
      tmpParams.set("page", String(currentPage))
    }
    router.push(`/admin/products?${tmpParams.toString()}`)
    router.refresh()
  }, [currentPage, router])

  if(productsLoading || assetLoading) return(<Loading message='商品情報取得中'/>)
  if(productsError || assetError || !asset || !products) return(<div>読み込み失敗</div>)
  return (
    <div className='mb-10 md:pt-5 pt-0'>
      <AdminPageTitle
        title='管理者用商品一覧'
        subtitle='Protucts'
      />
      <Link href={`/admin/asset`} className="text-end">
        <div>
          <div className="text-lg">商店残高（現金）：{asset.money}円</div>
          <div className="text-lg">商店負債（梶研Pay）：{asset.debt}円</div>
        </div>
      </Link>
    
      <div className="flex justify-center">
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={(products.total_count/20)+1}
          size="lg"
          color="#FD8AB9"
        />
      </div>
      {isLoading ? (
        <Loading message='商品情報取得中' />
      ) : (
        <>
          <div className="flex flex-wrap justify-center">
            {products.products.map((product) => (
              <div key={product.id} className="mx-1 my-1">
                <Admin.ProductCardAdmin
                  product={product}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Pagination
              value={currentPage}
              onChange={setCurrentPage}
              total={(products.total_count/20)+1}
              size="lg"
              color="#FD8AB9"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Base