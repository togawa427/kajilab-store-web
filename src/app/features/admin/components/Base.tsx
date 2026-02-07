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

type BasePropsType = {
  currentAsset: Asset;
}

const Base = ({currentAsset}: BasePropsType) => {
  const [resProducts, setResProducts] = useState<Products>()
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>();
  const searchParams = useSearchParams();
  const paramPage = searchParams.get("page");
  const router = useRouter()

  // ページが変わったタイミング
    useEffect(() => {
      const tmpParams = new URLSearchParams()
      if(currentPage){
        tmpParams.set("page", String(currentPage))
        console.log(tmpParams)
      }
      router.push(`/admin/products?${tmpParams.toString()}`)
      router.refresh()
    }, [currentPage, router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data
        setIsLoading(true)
        if(paramPage){
          data = await getPageProducts(parseInt(paramPage))
        } else {
          data = await getPageProducts(1)
        }
        setResProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsError(true)
      }
      setIsLoading(false)
    };
    fetchData();
  }, [paramPage]);

  if(resProducts == null)  return(<Loading message='商品情報取得中'/>)
  if(isError) return(<div>読み込み失敗</div>)
  return (
    <div className='mb-10 md:pt-5 pt-0'>
      <AdminPageTitle
        title='管理者用商品一覧'
        subtitle='Protucts'
      />
      <Link href={`/admin/asset`} className="text-end">
        <div>
          <div className="text-lg">商店残高（現金）：{currentAsset.money}円</div>
          <div className="text-lg">商店負債（梶研Pay）：{currentAsset.debt}円</div>
        </div>
      </Link>
    
      <div className="flex justify-center">
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={(resProducts.total_count/20)+1}
          size="lg"
          color="#FD8AB9"
        />
      </div>
      {isLoading ? (
        <Loading message='商品情報取得中' />
      ) : (
        <>
          <div className="flex flex-wrap justify-center">
            {resProducts.products.map((product) => (
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
              total={(resProducts.total_count/20)+1}
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