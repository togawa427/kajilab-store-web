import { PaymentByProduct, PaymentDay, PaymentMonth, PaymentYear } from "./types/log";
import { Asset, AssetHistory, Payment, Product, User, PaymentProduct } from "./types/response";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllProducts = async (): Promise<Product[]> => {
  //const res = await fetch("http://localhost:8080/api/v1/products/buy/logs?limit=5", {cache: "no-store"})  // SSR
  const res = await fetch(`${baseURL}/api/v1/products?limit=1000&&offset=0`, {cache: "no-store"})  // SSR
  console.log(res)

  const products = await res.json()
  return products
}

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
  const res = await fetch(`${baseURL}/api/v1/users/${barcode}`, {cache: "no-store"})

  const user = await res.json()
  return user
}

export const getPaymentByUserId = async (userId: number, limit: number, offset: number): Promise<Payment[]> => {
  // const res = await fetch(`${baseURL}/api/v1/products/buy/logs/user/${userId}?limit=${limit}&&offset=${offset}`, {cache: "no-store"})
  const res = await fetch(`${baseURL}/api/v1/products/buy/logs/user/${userId}?limit=${limit}&&offset=${offset}`, {cache: "no-store"})
  console.log(res)

  const payments = await res.json()
  return payments
}

export const getPaymentMonth = async (year: number, month: number): Promise<PaymentMonth> => {
  // const res = await fetch(`${baseURL}/api/v1/products/buy/logs/user/${userId}?limit=${limit}&&offset=${offset}`, {cache: "no-store"})
  const res = await fetch(`${baseURL}/api/v1/products/buy/logs?year=${year}&&month=${month}`, {next: {revalidate: 3600}})
  console.log(res)
  const payments:Payment[] = await res.json()

  let paymentMonth: PaymentMonth;
  let paymentsDay: PaymentDay[] = []
  let salesMonth = 0
  payments.map((payment) => {
    salesMonth += payment.price
    let paymentDay = paymentsDay.find(tmpPaymentDay => tmpPaymentDay.payDay.getDate() === new Date(payment.pay_at).getDate())
    if(paymentDay) {
      // 既にその日が存在する場合
      payment.products.map((product) => {
        let paymentByProduct = paymentDay.payments.find(tmpPaymentByProduct => tmpPaymentByProduct.name === product.name)
        if(paymentByProduct) {
          // 既にその商品が存在する場合
          paymentByProduct.quantity += product.quantity
        } else {
          // その商品がまだ存在しない場合
          paymentDay.payments.push({
            name: product.name,
            quantity: product.quantity,
            price: product.unit_price
          })
        }
      })
      paymentDay.sales += payment.price
      
    } else {
      // 新しい日付の場合
      let tmpProducts: PaymentByProduct[] = []
      payment.products.map((product) => {
        tmpProducts.push({
          name: product.name,
          quantity: product.quantity,
          price: product.unit_price * product.quantity
        })
      })
      paymentsDay.push({
        payDay: new Date(payment.pay_at),
        sales: payment.price,
        payments: tmpProducts
      })
    }
  })
  // console.log(paymentsDay)
  paymentMonth = {
    payMonth: new Date(year, month),
    sales: salesMonth,
    paymentsDay: paymentsDay
  }

  return paymentMonth
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

// export const deletePayment = async (id: number) => {
//   const res = await fetch(`${baseURL}/api/v1/products/buy/${id}`, {method: "DELETE"});

//   if(res.ok){
//       console.log("削除に成功")
//   }

//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   return
// }