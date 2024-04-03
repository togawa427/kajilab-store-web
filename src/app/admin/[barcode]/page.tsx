import { getProductByBarcode } from "@/api";
import * as Admin from "@/app/features/admin/components/Index"

export default async function AdminProductPage({
  params,
}: {
  params: {barcode: number};
}) {
  const product = await getProductByBarcode(params.barcode);
  return (
    <div>
      <Admin.ProductEditor product={product}/>
    </div>
  )
}