import { getPaymentMonth } from "@/api";
import * as PaymentComponent from "@/app/features/payment/Index"

export default async function HomePage({
  params,
}: {
  params: {year: number, month: number};
}) {
  const paymentMonth = await getPaymentMonth(params.year, params.month)
  return (
    <div>
      <PaymentComponent.Base year={params.year} month={params.month} paymentMonth={paymentMonth}/>
    </div>
  )
}
