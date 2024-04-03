"use client"
import { Product } from '@/types/response';
import { Button, Card, FileButton, FileInput, Group, Image, Text, TextInput } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react'

type ProductEditorProps = {
  product: Product;
}

const ProductEditor = ({product}: ProductEditorProps) => {
  const [imgFile, setImgFile] = useState<Blob | null>(null);
  const imgPath = `/products/${product.barcode}.jpg`

  const form = useForm({
    initialValues: {
      image: File,
    },
  });

  // const handleSubmit  = async () => {
  //   uploadImage(product.barcode, imgFile!)
  // }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImgFile(selectedFile);
    }
  };

  // const onSubmit = async () => {
  //   if (imgFile) {
  //     console.log("送信");

  //     const name = "テストネーム"

  //     const formData = new FormData();
  //     formData.append('files' , imgFile);
      
  //     // for await(const [i, v] of Object.entries(images)) {
  //     //   formData.append('files' , v);
  //     // }
  //     formData.append("name", name || "");


  //     const post = await fetch(`${window.location.href}api/upload`, {
  //       method: "POST",
  //       body: formData,
  //     }); 

  //     console.log(await post.json());
  //   }
  // }

  const onSubmit = async () => {
    console.log("upload!!")
    if (imgFile) {
      console.log("filearu")

      // const formData = new FormData()
      // formData.append("imgFile", imgFile);

      // try {
      //   await axios.post("http://localhost:3001/api/products",
      //     formData
      //   );
      // } catch (e) {
      //   console.log(e);
      // }

      const post = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(btoa("てすとだよーー")),
      })

      console.log(await post.json())
    }
  };

  const handleUpload = async () => {
    console.log("upload!!")
    if (imgFile) {
      console.log("filearu")

      // const formData = new FormData()
      // formData.append("imgFile", imgFile);

      try {
        await axios.post("http://localhost:3001/api/products",
          "asdfa"
        );
      } catch (e) {
        console.log(e);
      }

      // const post = await fetch("/api/products", {
      //   method: "POST",
      //   body: JSON.stringify(btoa("てすとだよーー")),
      // })

      // console.log(await post.json())
    }
  }

  // const handleUpload = async () => {
  //   if (file) {
  //     console.log("投稿するよ")
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     try {
  //       const response = await fetch('/api/upload', {
  //         method: 'POST',
  //         body: formData,
  //       });
  //       if (response.ok) {
  //         console.log('File uploaded successfully');
  //       } else {
  //         console.error('Failed to upload file:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Failed to upload file:', error);
  //     }
  //   }
  // };

  // const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("送信");

  //   const name = ""

  //   const formData = new FormData();
    
  //   for await(const [i, v] of Object.entries(file)) {
  //     formData.append('files' , v);
  //   }
  //   formData.append('files', file)
  //   formData.append("name", name || "");


  //   const post = await fetch(`${window.location.href}api/upload`, {
  //     method: "POST",
  //     body: formData,
  //   }); 

  //   console.log(await post.json());
  // };
  
  return (
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
          src={imgPath}
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

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {/* <div>
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
        {file && (
          <div>
            <Text size="sm" mt="sm">
              選択画像: {file.name}
            </Text>
            <Button onClick={handleUpload}>
              登録する
            </Button>
          </div>
        )}
        </div>*/}

      <form onSubmit={onSubmit} encType='multipart/form-data'>
        <label htmlFor="postName">名前</label>
        <TextInput
          type="text"
          id="postName"
          placeholder="Name"
          size="lg"
        />
        <label htmlFor="postImages">画像</label>
        <input type="file" onChange={handleFileChange} />
        {/* <FileInput
          id="postImages"
          multiple
          accept="image/*,.png,.jpg,.jpeg,.gif"
          onChange={() => handleFileChange}
        /> */}
        <Button type="submit" value="送信">送信</Button>
      </form> 
    </Card>
    </div>
  )
}

export default ProductEditor