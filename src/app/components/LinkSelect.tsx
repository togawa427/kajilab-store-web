"use client"
import { Button, Menu, Text, UnstyledButton } from '@mantine/core'
import { IconMenu, IconMenu2 } from '@tabler/icons-react'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import React from 'react'

function LinkSelect() {
  const router = useRouter();

  const handleUrlIndex = () => {
    router.push(`/`)
    router.refresh()
  }

  const handleUrlPaymentMonth = () => {
    const currentDate = new Date()
    console.log(currentDate)
    router.push(`/log/payment/${currentDate.getFullYear()}/${currentDate.getMonth()+1}`)
    router.refresh()
  }

  const handleUrlAdminIndex = () => {
    router.push(`/admin/products`)
    router.refresh()
  }

  const handleUrlAdminAsset = () => {
    router.push(`/admin/asset`)
    router.refresh()
  }

  const handleUrlAdminEditAsset = () => {
    router.push(`/admin/edit_asset`)
    router.refresh()
  }

  const handleUrlAdminInventory = () => {
    router.push(`/admin/inventory`)
    router.refresh()
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton
          style={{
            // width: 41,
            height: '100%',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/images/syouten-menu.png"
            alt="menu"
            width={53}
            height={53}
            className='h-[40px] w-auto md:h-[53px]'
          />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className='w-fit px-5 py-5 bg-kirby-blue bg-opacity-90 rounded-xl border-2 border-gray-300'>
        <div className=''>
        <Menu.Item color='black' onClick={handleUrlIndex} className="text-lg font-semibold text-white hover:bg-kirby-blue underline-offset-4 hover:underline hover:decoration-white">
          商品在庫一覧
        </Menu.Item>
        <Menu.Item color='black' onClick={handleUrlPaymentMonth} className="text-lg font-semibold text-white hover:bg-kirby-blue underline-offset-4 hover:underline hover:decoration-white">
          月間売上
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label className="text-lg">
          <div className='bg-kirby-pink px-1 py-1 rounded-full text-white'>
            ↓商店係専用
          </div>
        </Menu.Label>
        <Menu.Item color='black' onClick={handleUrlAdminIndex} className="text-lg text-kirby-star font-semibold hover:bg-kirby-blue underline-offset-4 hover:underline hover:decoration-white">
          商品一覧
        </Menu.Item>
        <Menu.Item color='black' onClick={handleUrlAdminAsset} className="text-lg text-kirby-star font-semibold hover:bg-kirby-blue underline-offset-4 hover:underline hover:decoration-white">
          資産推移グラフ
        </Menu.Item>
        <Menu.Item color='black' onClick={handleUrlAdminEditAsset} className="text-lg text-kirby-star font-semibold hover:bg-kirby-blue underline-offset-4 hover:underline hover:decoration-white">
          残高修正
        </Menu.Item>
        </div>
      </Menu.Dropdown>
    </Menu>
  )
}

export default LinkSelect