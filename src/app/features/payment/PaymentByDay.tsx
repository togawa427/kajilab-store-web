import React from 'react'

function PaymentByDay() {
  return (
    <>
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
    </>
  )
}

export default PaymentByDay