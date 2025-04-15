"use client"
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import * as HomeCompont from "@/app/features/home/components/Index"
import { getPageProducts } from '@/api'
import { Product, Products } from '@/types/response'
import Link from 'next/link'
import Loading from '@/app/components/Loading'

type BasePropsType = {
  page: number;
}

const Base = ({page}: BasePropsType) => {
  const [resProducts, setResProducts] = useState<Products | null>(null)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPageProducts(page)
        setResProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsError(true)
      }
    };
    fetchData();
  }, [page]);

  if(resProducts == null)  return(<Loading message='商品情報取得中'/>)
  if(isError) return(<div>読み込み失敗</div>)

  return (
    <div className="mb-10">
      <div className="text-center">
        {page > 1 && (
          <Link href={`/${(page-1)}`} className="mr-10">
            <Button color='#25526C' variant='outline'>
              前へ
            </Button>
          </Link>
        )}
        {resProducts.products.length == 20 && (
          <Link href={`/${(Number(page)+Number(1))}`} className="ml-10">
            <Button color='#25526C' variant='outline'>
              次へ
            </Button>
          </Link>
        )}
      </div>
      <div className="flex flex-wrap justify-center">
        {resProducts.products.map((product) => (
          <div key={product.id} className="mx-1 my-1">
            <HomeCompont.ProductCard
              product={product}
            />
          </div>
        ))}
      </div>
      <div className="text-center">
        {page > 1 && (
          <Link href={`/${(page-1)}`} className="mr-10">
            <Button color='#25526C' variant='outline'>
              前へ
            </Button>
          </Link>
        )}
        {resProducts.products.length == 20 && (
          <Link href={`/${(Number(page)+Number(1))}`} className="ml-10">
            <Button color='#25526C' variant='outline'>
              次へ
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Base