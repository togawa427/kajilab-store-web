import { getSalesMonth } from "@/api";
import * as PaymentComponent from "@/app/features/payment/Index"

export default async function HomePage({
  params,
}: {
  params: {year: number, month: number};
}) {
  const salesMonth = await getSalesMonth(params.year, params.month)
  return (
    <div>
      <PaymentComponent.Base year={params.year} month={params.month} salesMonth={salesMonth}/>
    </div>
  )
}
