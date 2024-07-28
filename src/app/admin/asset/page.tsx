import { getAssetHistory, getProductByBarcode } from "@/api";
import * as Admin from "@/app/features/admin/components/Index"


const AssetHome = async ({params}: {params: {page: number};}) => {
  let assetByOneMonth = await getAssetHistory(365)

  return (
    <div>
      <Admin.AssetBase assetsHistory={assetByOneMonth}/>
    </div>
  )
}

export default AssetHome
