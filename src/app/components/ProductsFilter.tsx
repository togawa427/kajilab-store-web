"use client"
import { TextInput } from '@/app/components/TextInput'
import { useGetAPI } from '@/app/hooks/useGetAPI'
import { Product, Products } from '@/types/response'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import Link from 'next/link'
import Loading from './Loading'

type ProductsFilterProps = {
  editable: boolean
}

export default function ProductsFilter({editable}: ProductsFilterProps) {
  const [filterText, setFilterText] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const limit = 999
  const updatedDays = 30
  const {data: products, isLoading: loading, error} = useGetAPI<Products>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?limit=${limit}&&updated_days=${updatedDays}`
  )

  const toHiragana = (str: string): string => {
    return str.replace(/[\u30a1-\u30f6]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) - 0x60)
    )
  }

  const filterProductsByName = (products: Product[], query: string): Product[] => {
    if (!query) return products

    const normalizedQuery = toHiragana(query.trim()).toLowerCase()  // フィルターのテキストをカタカナ＆ひらがなをひらがなに統一

    return products.filter(product => {
      const normalizedName = toHiragana(product.name).toLowerCase() // 商品名をカタカナ＆ひらがなをひらがなに統一
      return normalizedName.includes(normalizedQuery)
    })
  }


  // フィルターの文字が変わったタイミングでフィルターをかける
  useEffect(() => {
    if(!products) return
    // console.log(filterProductsByName(products.products, filterText))
    setFilteredProducts(filterProductsByName(products.products, filterText))
  }, [filterText, products]);


  if(loading) return(<Loading message='商品情報取得中'/>)
  if(error || !products) return(<div>読み込み失敗</div>)
  return (
    <div>
      <div className='w-fit mx-auto'>
        <input
          type='text'
          placeholder="商品名で検索"
          className='py-[1px] px-2 border md:w-80 md:text-xl text-base border-gray-300 rounded-md text-center focus:outline-none focus:border-kirby-lightpink focus:border-2 focus:py-0'
          onChange={(e) => {
            const v = e.target.value;
            setFilterText(v)
          }}
        />
        <p className='text-center md:text-lg text-sm text-slate-500'>該当件数：{filteredProducts.length}件</p>
      </div>
      <div>
        <div className="flex flex-wrap justify-center">
          {filteredProducts.map((product) => (
            <div key={product.id} className="mx-1 my-1">
              {editable ? (
                <Link href={`/admin/product/${product.barcode}`}>
                  <ProductCard
                    product={product}
                  />
                </Link>
              ): (
                <ProductCard
                  product={product}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
