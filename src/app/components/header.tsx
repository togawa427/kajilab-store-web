import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    // <div className="bg-[#4C331F] text-[#F2E8DE] py-2 px-2">
    // <div className="bg-[#55441E] text-white py-2 px-2">
    // <div className="bg-[url('https://www.kirby.jp/images/0427/bg-deeppink-stripe.png')] text-white py-2 px-2">
    <div className="bg-[url('/header-bgblue.jpg')] text-white py-2 px-2">
      <Link href={"/admin/1"}>
        <div className="text-2xl">
          梶研商店
        </div>
      </Link>
    </div>
  )
}

export default Header