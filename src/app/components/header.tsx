import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="bg-[#4C331F] text-[#F2E8DE] py-2 px-2">
      <Link href={"/admin"}>
        <div className="text-2xl">
          梶研商店
        </div>
      </Link>
    </div>
  )
}

export default Header