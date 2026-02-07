"use client"
import { Badge, Button, Card, Group, Image, Pagination, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import * as HomeCompont from "@/app/features/home/components/Index"
import { getPageProducts } from '@/api'
import { Product, Products } from '@/types/response'
import Loading from '@/app/components/Loading'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { IconArrowRight } from '@tabler/icons-react'
import { useGetAPI } from '@/app/hooks/useGetAPI'
import { PageTitle } from '@/app/components/PageTitle'
import ProductsFilter from '@/app/components/ProductsFilter'

const Base = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams();
  const paramPage = searchParams.get("page");
  const router = useRouter()

  const limit = 20
  const updatedDays = 30
  const {data: products, isLoading: loading, error} = useGetAPI<Products>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?limit=${limit}&&offset=${limit*(currentPage-1)}&&updated_days=${updatedDays}`
  )

  console.log("APIでしゅとく")
  console.log(products?.total_count)

  // ページが変わったタイミング
  useEffect(() => {
    const tmpParams = new URLSearchParams()
    if(currentPage){
      tmpParams.set("page", String(currentPage))
    }
    router.push(`/?${tmpParams.toString()}`)
    router.refresh()
  }, [currentPage, router])

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
      
      {/* <div className="flex justify-center">
        <Pagination 
          value={currentPage}
          onChange={setCurrentPage}
          total={(products.total_count/20)+1}
          size="lg"
          color="#FD8AB9"
        />
      </div> */}
      <>
        {/* <div className="flex flex-wrap justify-center">
          {products.products.map((product) => (
            <div key={product.id} className="mx-1 my-1">
              <HomeCompont.ProductCard
                product={product}
              />
            </div>
          ))}
        </div> */}
        {/* <div className="flex justify-center">
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={(products.total_count/20)+1}
            size="lg"
            color="#FD8AB9"
          />
        </div> */}
      </>
    </div>
  )
}

export default Base