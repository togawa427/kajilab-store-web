import { getProductByBarcode } from "@/api";
import * as Admin from "@/app/features/admin/components/Index"

export default async function AdminProductPage({
  params,
}: {
  params: {page: number};
}) {
  return (
    <div>
      <Admin.Base page={params.page}/>
    </div>
  )
}