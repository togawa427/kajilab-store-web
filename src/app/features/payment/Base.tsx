"use client"
import React from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';


type BasePropsType = {
  year: number;
  month: number;
}

const Base = ({year, month}: BasePropsType) => {

  return (
    <div className="max-w-3xl mx-auto">
      {/* 年月日 */}
      <div className="text-2xl flex justify-center">
        <Link href={`/log/payment/2024/12`}><IconChevronLeft size={60} color='blue'/></Link>
        <div className='w-1/3 text-center'>
          <div>{year}年{month}月</div>
          <div className="text-blue-800 font-bold">収入：¥ 9010</div>
        </div>
        <Link href={`/log/payment/2025/2`}><IconChevronRight size={60} color='blue'/></Link>
      </div>

      {/* 履歴 */}
      <div className="mt-5 mb-20">
        <div className="bg-gray-50 text-xl border-b">
          <div className="flex px-3 py-1 text-2xl">
            <div className="font-bold flex-auto">24日(金)</div>
            <div className="text-blue-800">¥610</div>
          </div>
        </div>
        <div className="bg-gray-50 mb-3">
          <div className="flex px-3 py-1 text-xl">
            <div className="flex-auto">ポテチ塩 x 2</div>
            <div>¥ 200</div>
          </div>
          <div className="flex px-3 py-1 text-xl">
            <div className="flex-auto">パックごはん200g x 1</div>
            <div>¥ 100</div>
          </div>
          <div className="flex px-3 py-1 text-xl">
            <div className="flex-auto">赤いきつね x 2</div>
            <div>¥ 300</div>
          </div>
          <div className="flex px-3 py-1 text-xl">
            <div className="flex-auto">ハイチュウグレープ x 2</div>
            <div>¥ 240</div>
          </div>
        </div>

        <div className="bg-gray-50 text-xl border-b">
          <div className="flex px-3 py-1 text-2xl">
            <div className="font-bold flex-auto">23日(木)</div>
            <div className="text-blue-800">¥610</div>
          </div>
        </div>
        <div className="bg-gray-50">
          <div className="flex px-3 py-1 text-xl">
            <div className="flex-auto">ポテチ塩 x 2</div>
            <div>¥ 200</div>
          </div>
          <div className="flex px-3 py-1 text-xl">
            <div className="flex-auto">パックごはん200g x 1</div>
            <div>¥ 100</div>
          </div>
          <div className="flex px-3 py-1 text-xl">
            <div className="flex-auto">赤いきつね x 2</div>
            <div>¥ 300</div>
          </div>
          <div className="flex px-3 py-1 text-xl">
            <div className="flex-auto">ハイチュウグレープ x 2</div>
            <div>¥ 240</div>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default Base