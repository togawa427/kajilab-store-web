"use client"
import React from 'react'
import * as Admin from "@/app/features/admin/components/Index"
import Link from 'next/link'
import { Product } from '@/types/response'
import { Button } from '@mantine/core'
import { useRouter } from 'next/navigation'

type InventoryBasePropsType = {
  products: Product[]
}

const InventoryBase = ({products}: InventoryBasePropsType) => {
  // const [products, setProducts] = useState<Product[]>([])
  const router = useRouter();

  const resetInventory = () => {
    localStorage.clear()
    router.push(`/admin/inventory`)
    router.refresh()
  }

  return (
    <>
      <Button color='red' onClick={resetInventory}>棚卸し状態をリセットする</Button>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          // 棚卸し完了していない商品
            <div key={product.id}>
              <Admin.ProductCardInventory product={product} displayIsInventory={false}/>
            </div>
        ))}
        {products.map((product) => (
          // 棚卸し完了した商品
            <div key={product.id}>
              <Admin.ProductCardInventory product={product} displayIsInventory={true}/>
            </div>
        ))}
      </div>
    </>
  )
}

export default InventoryBase