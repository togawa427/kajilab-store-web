import { NavLink } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import LinkSelect from './LinkSelect'
import Image from 'next/image'

const Header = () => {
  return (
    // <div className="bg-[#4C331F] text-[#F2E8DE] py-2 px-2">
    // <div className="bg-[#55441E] text-white py-2 px-2">
    // <div className="bg-[url('https://www.kirby.jp/images/0427/bg-deeppink-stripe.png')] text-white py-2 px-2">
    // <div className="bg-[url('/header-bgblue.jpg')] text-white py-2 px-2 flex">
    <div className="bg-kirby-blue text-white py-3 md:py-4 px-2 flex fixed top-0 left-0 w-full z-50">
      <Link href={"/"} className="flex-auto">
        <div className="pl-0 md:pl-10">
          <Image src='/images/syouten-header.png' width={260} height={38} alt='logo' className='pl-2 h-[40px] w-auto md:h-[53px]'/>
        </div>
      </Link>
      <div className="mr-1 md:mr-5">
        <LinkSelect />
      </div>
    </div>
  )
}

export default Header