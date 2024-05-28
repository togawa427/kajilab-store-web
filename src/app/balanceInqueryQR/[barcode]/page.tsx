import { getProductByBarcode, getUserByBarcode } from "@/api";
import * as Admin from "@/app/features/admin/components/Index"

export default async function AdminProductPage({
  params,
}: {
  params: {barcode: string};
}) {
  const user = await getUserByBarcode(params.barcode)
  console.log(user)
  return (
    <div>

      <div>
        <div className="text-3xl text-center">ユーザ名：{user.name}</div>
        <div className=" text-3xl text-center">残高：{user.debt}</div>
        <hr />
      </div>
      <div>
        <div className="text-3xl">利用明細</div>
      </div>
      {user.name}
      {user.debt}
      {/* <Admin.ProductEditor product={product}/> */}

    </div>
  )
}