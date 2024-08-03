"use client"
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import * as Admin from "@/app/features/admin/components/Index"
import { getPageProducts, getProducts } from '@/api'
import { Asset, Product } from '@/types/response'
import Link from 'next/link'

type BasePropsType = {
  page: number;
  currentAsset: Asset;
}

const Base = ({page, currentAsset}: BasePropsType) => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPageProducts(page)
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, [page]);

  return (
    <>
      <Link href={`/admin/asset`} className="text-end">
        <div>
          <div className="text-lg">商店残高（現金）：{currentAsset.money}円</div>
          <div className="text-lg">商店負債（梶研Pay）：{currentAsset.debt}円</div>
        </div>
      </Link>
    
      <div className="text-center">
        {page > 1 && (
          <Link href={`/admin/${(page-1)}`} className="mr-10">
            <Button color='#25526C' variant='outline'>
              前へ
            </Button>
          </Link>
        )}
        {products.length == 20 && (
          <Link href={`/admin/${(Number(page)+Number(1))}`} className="ml-10">
            <Button color='#25526C' variant='outline'>
              次へ
            </Button>
          </Link>
        )}
      </div>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <div key={product.id} className="mx-1 my-1">
            <Admin.ProductCardAdmin
              product={product}
            />
          </div>
        ))}
      </div>
      <div className="text-center">
        {page > 1 && (
          <Link href={`/admin/${(page-1)}`} className="mr-10">
            <Button color='#25526C' variant='outline'>
              前へ
            </Button>
          </Link>
        )}
        {products.length == 20 && (
          <Link href={`/admin/${(Number(page)+Number(1))}`} className="ml-10">
            <Button color='#25526C' variant='outline'>
              次へ
            </Button>
          </Link>
        )}
      </div>
    </>
  )
}

export default Base