import { Product, User } from "./types/response";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getProducts = async (): Promise<Product[]> => {
  //const res = await fetch("http://localhost:8080/api/v1/products/buy/logs?limit=5", {cache: "no-store"})  // SSR
  const res = await fetch(`${baseURL}/api/v1/products?limit=20&&offset=0`, {cache: "no-store"})  // SSR
  console.log(res)

  const products = await res.json()
  return products
}

export const getPageProducts = async (page: number): Promise<Product[]> => {
  //const res = await fetch("http://localhost:8080/api/v1/products/buy/logs?limit=5", {cache: "no-store"})  // SSR
  const limit = 20
  const offset = limit*(page-1)
  const res = await fetch(`${baseURL}/api/v1/products?limit=${limit}&&offset=${offset}`, {cache: "no-store"})  // SSR
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

export const getUserByBarcode = async (barcode: string): Promise<User> => {
  const res = await fetch(`${baseURL}/api/v1/users/${barcode}`)

  const user = await res.json()
  return user
}