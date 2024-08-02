"use client"
import { updateProduct } from '@/api';
import { Product } from '@/types/response';
import { Button, Card, Group, Image, Overlay, Text } from '@mantine/core'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type ProductCardInventoryProps = {
  product: Product;
}


const ProductCardInventory = ({product}: ProductCardInventoryProps) => {
  const [productStock, setProductStock] = useState(product.stock)
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const imgPath = `https://firebasestorage.googleapis.com/v0/b/kajilab-store.appspot.com/o/images%2F${product.barcode}.jpg?alt=media&token=c46357bc-f29c-4d5f-8048-33c1d4a65083`

  const addStock = () => {
    setProductStock(productStock+1)
  }

  const subtractStock = () => {
    setProductStock(productStock-1)
  }

  const confirmInventory = async() => {
    setIsLoading(true)
    if(product.stock == productStock){
      // 在庫が合っている場合
      console.log("在庫に変化なし")
    }
    else{
      // 在庫がずれていた場合
      console.log("在庫にズレがあった")
      await updateProduct(
        product.id,
        product.name,
        product.barcode,
        product.price,
        productStock,
        product.tag_id
      )
    }
    localStorage.setItem(`is_inventory_${product.barcode}`, "true")
    
    setIsChecked(true)
    setIsLoading(false)
    router.push(`/admin/inventory`)
    router.refresh()
  }

  const cancelInventory = () => {
    setIsChecked(false)
    localStorage.setItem(`is_inventory_${product.barcode}`, "false")
    router.push(`/admin/inventory`)
    router.refresh()
  }

  return (
    <Card 
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={`w-40 md:w-72 bg-slate-50 ${localStorage.getItem(`is_inventory_${product.barcode}`)=="true" ? 'text-gray-400' : ''}`}
      
      // onClick={handleClickCard}
    >
      <Card.Section>
        <Image
          src={imgPath}
          w="auto"
          fit="contain"
          alt="Norway"
          className="mx-auto h-20 md:h-40"
        />
        
      </Card.Section>

      <Group justify="space-between" mt="xs">
        <Text fw={700}>{product.name}</Text>
      </Group>

      <div>
        <text>
          値段：{product.price}<br/>
          在庫数：<br/>
          <div className="text-center text-xl mb-1">
            <Button onClick={subtractStock} size='xs' color='gray' variant="outline" className="mr-1 text-2xl">-</Button>
              {productStock}
            <Button onClick={addStock} size='xs' color='gray' variant="outline" className="ml-1 text-lg">+</Button>
          </div>
        </text>
      </div>
      {localStorage.getItem(`is_inventory_${product.barcode}`)=="true" ? (
        <Button fullWidth color='gray' onClick={cancelInventory}>
          キャンセル
        </Button>
      ) : (
        <Button fullWidth color='#25526C' onClick={confirmInventory}>
          確定
        </Button>
      )}
      {/* <Button fullWidth>
        確定
      </Button>
      <Button fullWidth color='gray'>
        キャンセル
      </Button> */}
      {/* <Overlay color='#eee' backgroundOpacity={0.5} blur={1}/> */}
    </Card>
  )
}

export default ProductCardInventory