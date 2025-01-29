import { Product } from '@/types/response';
import { Card, Group, Image, Text, useMatches } from '@mantine/core'
import Link from 'next/link';
import React from 'react'

type ProductCardAdminProps = {
  product: Product;
}

const ProductCardAdmin = ({product}: ProductCardAdminProps) => {

  const pdSize = useMatches({
    base: 'xs',
    md: 'lg',
  })

  const handleClickCard = () => {
    console.log(product.barcode)
  }

  const imgPath = `https://firebasestorage.googleapis.com/v0/b/kajilab-store.appspot.com/o/images%2F${product.barcode}.jpg?alt=media&token=c46357bc-f29c-4d5f-8048-33c1d4a65083`
  return (
    <Link href={`/admin/product/${product.barcode}`}>
    <Card 
      shadow="sm"
      padding={pdSize}
      radius="md"
      withBorder
      className="w-40 md:w-72 bg-slate-50 text-xs md:text-base"
      onClick={handleClickCard}
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
        <Text fw={700} className='text-xs md:text-base'>{product.name}</Text>
      </Group>

      <div>
        <text>
          値段：{product.price}<br/>
          在庫数：{product.stock}
        </text>
      </div>
    </Card>
    </Link>
  )
}

export default ProductCardAdmin