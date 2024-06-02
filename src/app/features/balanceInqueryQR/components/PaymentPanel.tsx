"use client"
import { Payment, PaymentProduct } from '@/types/response';
import React from 'react'

type PaymentPanelPropsType = {
  payment: Payment;
  products: PaymentProduct[];
}

function PaymentPanel({payment, products}: PaymentPanelPropsType) {
  return (
    <div className="border-b border-gray-400">
        <div className="flex bg-gray-200" key={payment.id}>
          <div>
            {new Date(payment.pay_at).getFullYear()}/{new Date(payment.pay_at).getMonth()+1}/{new Date(payment.pay_at).getDate()}
          </div>
          <div className="ml-auto">
            {payment.price}円
          </div>
        </div>
        <div className="bg-gray-white">
          {products.map((product) => (
            <div key={product.id} className="flex">
              <div>
                {product.name}　
              </div>
              <div>
                x　{product.quantity}
              </div>
              <div className="ml-auto">
                {product.unit_price * product.quantity}円
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default PaymentPanel