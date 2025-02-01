"use client"
import { Button, Menu, Text } from '@mantine/core'
import { IconMenu, IconMenu2 } from '@tabler/icons-react'
import { useRouter } from 'next/navigation';
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
    router.push(`/admin/1`)
    router.refresh()
  }

  const handleUrlAdminAsset = () => {
    router.push(`/admin/asset`)
    router.refresh()
  }

  const handleUrlAdminInventory = () => {
    router.push(`/admin/inventory`)
    router.refresh()
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="transparent" color="rgba(255, 255, 255, 1)"><IconMenu2 /></Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={handleUrlIndex} className="text-lg font-semibold">
          商品在庫一覧
        </Menu.Item>
        <Menu.Item onClick={handleUrlPaymentMonth} className="text-lg font-semibold">
          月間売上
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label className="text-lg">↓商店係専用</Menu.Label>
        <Menu.Item onClick={handleUrlAdminIndex} className="text-lg text-red-800 font-semibold">
          商品一覧
        </Menu.Item>
        <Menu.Item onClick={handleUrlAdminAsset} className="text-lg text-red-800 font-semibold">
          資産推移グラフ
        </Menu.Item>
        <Menu.Item onClick={handleUrlAdminInventory} className="text-lg text-red-800 font-semibold">
          棚卸し
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default LinkSelect