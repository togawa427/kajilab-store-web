import * as HomeCompont from "@/app/features/home/components/Index"

export default async function HomePage({
  params,
}: {
  params: {page: number};
}) {
  return (
    <div>
      <HomeCompont.Base page={params.page}/>
    </div>
  )
}
