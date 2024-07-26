import { getProductByBarcode } from "@/api";
import * as Admin from "@/app/features/admin/components/Index"


export default function AssetHome({
  params,
}: {
  params: {page: number};
}) {
  return (
    <div>
      <Admin.AssetBase/>
    </div>
  )
}
