import { NavLink } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import LinkSelect from './LinkSelect'

const Header = () => {
  return (
    // <div className="bg-[#4C331F] text-[#F2E8DE] py-2 px-2">
    // <div className="bg-[#55441E] text-white py-2 px-2">
    // <div className="bg-[url('https://www.kirby.jp/images/0427/bg-deeppink-stripe.png')] text-white py-2 px-2">
    <div className="bg-[url('/header-bgblue.jpg')] text-white py-2 px-2 flex">
      <Link href={"/"} className="flex-auto">
        <div className="text-2xl">
          梶研商店
        </div>
      </Link>
      <div className="mr-5">
        <LinkSelect />
      </div>
    </div>
  )
}

export default Header