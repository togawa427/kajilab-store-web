import Image from "next/image";
import * as HomeCompont from "@/app/features/home/components/Index"

export default function Home() {
  return (
    <div>
      <HomeCompont.Base page={1}/>
    </div>
  )
}
