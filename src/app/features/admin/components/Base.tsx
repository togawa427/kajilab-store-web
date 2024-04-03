"use client"
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import * as Admin from "@/app/features/admin/components/Index"
import { getProducts } from '@/api'
import { Product } from '@/types/response'

const Base = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <div key={product.id} className="mx-1 my-1">
          <Admin.ProductCardAdmin
            product={product}
          />
        </div>
      ))}
    </div>
  )
}

export default Base