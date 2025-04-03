"use client"
import { useFirebaseStorageURL } from '@/app/hooks/useFirebaseStorageURL';
import storage from '@/firebase';
import { Product } from '@/types/response';
import { Button, Card, FileButton, FileInput, Group, Image, MultiSelect, Text, TextInput } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

type ProductEditorProps = {
  product: Product;
}

const ProductEditor = ({product}: ProductEditorProps) => {
  const [loading, setLoading] = useState(false)
  const [isUploaded, setUploaded] = useState(false)
  const [imgUrl] = useFirebaseStorageURL(product)
  const router = useRouter();

  const onFileUploadToFirebase = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const file = e.target.files[0]
      const storageRef = ref(storage, `images/${product.barcode}.jpg`)
      const uploadImage = uploadBytesResumable(storageRef, file);

      // アップロードの状態が変わったら発火
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          setLoading(true)
        },
        (err) => {
          console.log(err)
        },
        () => {
          // 終了したら
          setLoading(false)
          setUploaded(true)
          router.push("/admin/1")
          router.refresh()
        }
      )
    }
  }
  
  return (
    <>
    {loading ? (
      <h2>アップロード中...</h2>
    ) : (
      <>
        {isUploaded ? (
          <h2> アップロード完了しました</h2>
        ): (
          <div>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="w-full bg-slate-50"
          >
            <Card.Section>
              {/* {imgUrl ? (
                <Image
                  src={imgUrl}
                  w="auto"
                  fit="contain"
                  alt="Norway"
                  className="mx-auto h-40 md:h-80"
                />
              ) : (
                <Image
                  src="/products/loader-2.png"
                  w="auto"
                  fit="contain"
                  alt="Norway"
                  className="mx-auto h-40 md:h-80 animate-spin"
                />
              )} */}
              <Image
                src={`https://firebasestorage.googleapis.com/v0/b/kajilab-store.appspot.com/o/images%2F${product.barcode}.jpg?alt=media&token=c46357bc-f29c-4d5f-8048-33c1d4a65083`}
                w="auto"
                fit="contain"
                alt="Norway"
                className="mx-auto h-40 md:h-80"
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
            <div className='mt-5'>商品画像</div>
            <input type="file" accept='.jpg' onChange={onFileUploadToFirebase} />

            <div className='mt-5'>タグ</div>
            {/* <MultiSelect
              placeholder="タグを選んでください"
              data={['お菓子', 'ドリンク']}
            /> */}
          </Card>
          </div>
        )}
      </>
    )}

    </>
  )
}

export default ProductEditor