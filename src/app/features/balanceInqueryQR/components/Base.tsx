"use client"
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import * as BalanceInqueryQR from "@/app/features/balanceInqueryQR/components/Index"
import { getKajilabpayLogsByUserId} from '@/api'
import { KajilabpayLog, User } from '@/types/response'
import Link from 'next/link'

type BasePropsType = {
  user: User;
}

const Base = ({user}: BasePropsType) => {

  const [kajilabpayLog, setKajilabpayLogs] = useState<KajilabpayLog[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKajilabpayLogsByUserId(user.id, 20, 0);
        setKajilabpayLogs(data);
      } catch (error) {
        console.error('Error fetching kajilabpaylog:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mb-20">
      <div className="mb-6">
        <div className="text-xl text-gray-500 text-right">{user.name}</div>
        <div className="text-2xl border-b-4 border-gray-700">残高</div>
        <div className="text-center text-2xl">{user.debt}円</div>
      </div>
      <div className="flex items-end border-b-4 border-gray-700">
        <div className="text-2xl">利用明細</div>
        <div className="ml-auto">（最新20件）</div>
      </div>
      <BalanceInqueryQR.PaymentsTable kajilabpayLogs={kajilabpayLog}/>

    </div>
  )
}

export default Base