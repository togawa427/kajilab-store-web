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
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { resizeImageToHeight } from '../utils';

type ProductEditorProps = {
  product: Product;
}

const ProductEditor = ({product}: ProductEditorProps) => {
  const [loading, setLoading] = useState(false)
  const [isUploaded, setUploaded] = useState(false)
  const [imgUrl] = useFirebaseStorageURL(product)
  const router = useRouter();
  const [uploadFile, setUploadFile] = useState<FileWithPath>()
  const [isUpload, setIsUpload] = useState(false)

  

  const uploadFileToFirebase = async (file: FileWithPath) => {
    if(file){
      const resizedFile = await resizeImageToHeight(file, 300)
      const storageRef = ref(storage, `images/${product.barcode}.jpg`)
      const uploadImage = uploadBytesResumable(storageRef, resizedFile);

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
          router.push("/admin/products")
          router.refresh()
        }
      )
    }
  }

  const resizeImage = async (file: FileWithPath) => {
    setUploadFile(await resizeImageToHeight(file, 300))
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
            {/* <input type="file" accept='.jpg' onChange={onFileUploadToFirebase} /> */}
            <Dropzone
              onDrop={(files) => {
                // ファイル操作
                if(files.length > 0){
                  setUploadFile(files[0])
                  setIsUpload(true)
                  uploadFileToFirebase(files[0])
                  // resizeImage(files[0])
                }
              }}
              maxSize={20 * 1024 ** 2}  // <- データサイズ上限を指定できる(20MB)
              accept={IMAGE_MIME_TYPE}  // <- 許容するファイルの拡張子を指定できる
            >
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }} className='border-2 border-slate-200 bg-slate-100'>
                <Dropzone.Accept>
                  <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <div>
                    <div>
                      {/* アイコン */}
                      <Text>
                        ファイルをドラッグ&ドロップ
                      </Text>
                    </div>
                    <div>
                      {uploadFile ? (
                        <div>
                          <Text>
                            {uploadFile.name}
                          </Text>
                          <img
                            src={URL.createObjectURL(uploadFile)}
                            alt={uploadFile.name}
                          />
                        </div>
                      ) : (
                        <Text>
                          ファイルが選択されていません
                        </Text>
                      )}
                    </div>
                  </div>
                </Dropzone.Idle>
              </Group>
            </Dropzone>

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