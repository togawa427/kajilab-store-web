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
      </Menu.Dropdown>
    </Menu>
  )
}

export default LinkSelect