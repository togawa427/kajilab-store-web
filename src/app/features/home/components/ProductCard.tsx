import { Product } from '@/types/response';
import { Card, Group, Image, Text } from '@mantine/core'
import React from 'react'

type ProductCardListProps = {
  product: Product;
}

const ProductCard = ({product}: ProductCardListProps) => {
  const imgPath = `products/${product.barcode}.jpg`
  return (
    <Card 
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="w-40 md:w-72 bg-slate-50"
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
          在庫数：{product.stock}
        </text>
      </div>
    </Card>
  )
}

export default ProductCard