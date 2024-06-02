"use client"
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import * as HomeCompont from "@/app/features/home/components/Index"
import { getPageProducts } from '@/api'
import { Product } from '@/types/response'
import Link from 'next/link'

type BasePropsType = {
  page: number;
}

const Base = ({page}: BasePropsType) => {
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
    <div>
      <div className="text-center">
        {page > 1 && (
          <Link href={`/${(page-1)}`} className="mr-10">
            <Button>
              前へ
            </Button>
          </Link>
        )}
        {products.length == 20 && (
          <Link href={`/${(Number(page)+Number(1))}`} className="ml-10">
            <Button>
              次へ
            </Button>
          </Link>
        )}
      </div>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
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
            <Button>
              前へ
            </Button>
          </Link>
        )}
        {products.length == 20 && (
          <Link href={`/${(Number(page)+Number(1))}`} className="ml-10">
            <Button>
              次へ
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Base