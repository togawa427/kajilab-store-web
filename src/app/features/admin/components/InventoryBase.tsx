"use client"
import React from 'react'
import * as Admin from "@/app/features/admin/components/Index"
import Link from 'next/link'
import { Product } from '@/types/response'

type InventoryBasePropsType = {
  products: Product[]
}

const InventoryBase = ({products}: InventoryBasePropsType) => {
  // const [products, setProducts] = useState<Product[]>([])

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          // 棚卸し完了していない商品
          localStorage.getItem(`is_inventory_${product.barcode}`) != "true" && (
            <div key={product.id} className="mx-1 my-1">
              <Admin.ProductCardInventory product={product}/>
            </div>
          )
        ))}
        {products.map((product) => (
          // 棚卸し完了した商品
          localStorage.getItem(`is_inventory_${product.barcode}`) == "true" && (
            <div key={product.id} className="mx-1 my-1">
              <Admin.ProductCardInventory product={product}/>
            </div>
          )
        ))}
      </div>
    </>
  )
}

export default InventoryBase