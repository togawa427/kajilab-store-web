import * as PaymentComponent from "@/app/features/payment/Index"

export default async function HomePage({
  params,
}: {
  params: {year: number, month: number};
}) {
  return (
    <div>
      <PaymentComponent.Base year={params.year} month={params.month}/>
    </div>
  )
}
