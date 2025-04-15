import { getCurrentAsset, getProductByBarcode } from "@/api";
import * as Admin from "@/app/features/admin/components/Index"

export default async function AdminProductPage({
  params,
}: {
  params: {page: number};
}) {
  const currentAsset = await getCurrentAsset()
  return (
    <div>
      <Admin.Base currentAsset={currentAsset}/>
    </div>
  )
}