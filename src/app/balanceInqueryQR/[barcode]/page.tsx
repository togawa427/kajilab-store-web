import { getUserByKajilabPay } from "@/api";
import Base from "@/app/features/balanceInqueryQR/components/Base";

export default async function BalanceInQueryQRPage({
  params,
}: {
  params: {barcode: string};
}) {
  const user = await getUserByKajilabPay(params.barcode);
  return (
    <div>
      <Base user={user}/>
    </div>
  )
}