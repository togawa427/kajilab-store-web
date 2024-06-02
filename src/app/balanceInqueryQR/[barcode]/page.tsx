import { getUserByBarcode } from "@/api";
import Base from "@/app/features/balanceInqueryQR/components/Base";

export default async function BalanceInQueryQRPage({
  params,
}: {
  params: {barcode: string};
}) {
  const user = await getUserByBarcode(params.barcode);
  console.log(user)
  return (
    <div>
      <Base user={user}/>
    </div>
  )
}