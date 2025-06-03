import { getAssetHistory, getCurrentAsset, getProductByBarcode } from "@/api";
import * as Admin from "@/app/features/admin/components/Index"


const AssetHome = async () => {
  let asset = await getCurrentAsset()

  return (
    <div>
      <Admin.EditAssetBase currentMoney={asset.money} currentDebt={asset.debt}/>
    </div>
  )
}

export default AssetHome