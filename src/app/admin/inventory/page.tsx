import { getAllProducts, getProductByBarcode, getProducts } from "@/api";
import * as Admin from "@/app/features/admin/components/Index"

export default async function AdminProductPage() {
  const products = await getAllProducts()
  return (
    <div>
      <Admin.InventoryBase products={products.products}/>
    </div>
  )
}