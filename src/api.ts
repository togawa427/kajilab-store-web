import { Asset, AssetHistory, Product, User, PaymentProduct, Products, SalesMonth, KajilabpayLog, KajilabPayMobile } from "./types/response";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const jstOffset = (new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000;

export const getAllProducts = async (): Promise<Products> => {
  //const res = await fetch("http://localhost:8080/api/v1/products/buy/logs?limit=5", {cache: "no-store"})  // SSR
  const res = await fetch(`${baseURL}/api/v1/products?limit=1000&&offset=0`, {cache: "no-store"})  // SSR

  const products = await res.json()
  return products
}

export const getProducts = async (): Promise<Products> => {
  //const res = await fetch("http://localhost:8080/api/v1/products/buy/logs?limit=5", {cache: "no-store"})  // SSR
  const res = await fetch(`${baseURL}/api/v1/products?limit=20&&offset=0`, {cache: "no-store"})  // SSR
  console.log(res)

  const products = await res.json()
  return products
}

export const getPageProducts = async (page: number): Promise<Products> => {
  //const res = await fetch("http://localhost:8080/api/v1/products/buy/logs?limit=5", {cache: "no-store"})  // SSR
  const limit = 20
  const offset = limit*(page-1)
  const updatedDays = 30
  const res = await fetch(`${baseURL}/api/v1/products?limit=${limit}&&offset=${offset}&&updated_days=${updatedDays}`, {cache: "no-store"})  // SSR
  console.log(res)

  const products = await res.json()
  return products
}

export const getProductByBarcode = async (barcode: number): Promise<Product> => {
  //const res = await fetch(`http://localhost:8080/api/v1/products/134912341232`, {cache: "no-store"})
  // const res = await fetch(`http://localhost:8080/api/v1/products/${barcode}`, {cache: "no-store"})
  const res = await fetch(`${baseURL}/api/v1/products/${barcode}`, {cache: "no-store"})
  console.log(res)

  const product = await res.json()
  return product
}



export const getUserByKajilabPay = async (qrPayload: string): Promise<User> => {
  const res = await fetch(`${baseURL}/api/v1/users/kajilabpayqr/${qrPayload}`, {cache: "no-store"})

  const user = await res.json()
  return user
}

export const getKajilabpayLogsByUserId = async (userId: number, limit: number, offset: number): Promise<KajilabpayLog[]> => {
  // const res = await fetch(`${baseURL}/api/v1/products/buy/logs/user/${userId}?limit=${limit}&&offset=${offset}`, {cache: "no-store"})
  const res = await fetch(`${baseURL}/api/v1/products/buy/logs/user/${userId}?limit=${limit}&&offset=${offset}`, {cache: "no-store"})
  console.log(res)

  const payments:KajilabpayLog[] = await res.json()
  return payments
}

export const getSalesMonth = async (year: number, month: number): Promise<SalesMonth> => {
  const res = await fetch(`${baseURL}/api/v1/sales?year=${year}&&month=${month}`, {next: {revalidate: 3600}})
  // const res = await fetch(`${baseURL}/api/v1/sales?year=${year}&&month=${month}`, {cache: "no-store"})
  const salesMonth:SalesMonth = await res.json()
  return salesMonth
}

export const getCurrentAsset = async (): Promise<Asset> => {
  const res = await fetch(`${baseURL}/api/v1/assets`, {cache: "no-store"})
  console.log(res)

  const asset = await res.json()
  return asset
}

export const getAssetHistory = async (day: number): Promise<AssetHistory[]> => {
  const res = await fetch(`${baseURL}/api/v1/assets/history?day=${day}`, {next: {revalidate: 10800}})
  
  const assetHistory = await res.json()
  return assetHistory
}

export const putAsset = async (money: number): Promise<number> => {
  let requestAsset: PutAssetType = {
    money: money
  }
  const res = await fetch(`${baseURL}/api/v1/assets`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(requestAsset)
  })

  console.log(res.status)
  return res.status
}

export const updateProduct = async (id: number, name: string, barcode: number, price: number, stock: number, tagId: number): Promise<number> => {
  let requestProduct: UpdateProductType = {
      id: id,
      name: name,
      barcode: barcode,
      price: price,
      stock: stock,
      tag_id: tagId, 
  }

  const res = await fetch(`${baseURL}/api/v1/products`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(requestProduct)
  })

  console.log(res.status)
  return res.status
}

export const postKajilabPayQR = async (barcode: string): Promise<KajilabPayMobile> => {
  const res = await fetch(`${baseURL}/api/v1/users/kajilabpayqr`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        barcode: barcode
      })
  })

  const kajilabpay = await res.json()
  return kajilabpay
}