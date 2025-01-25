export type PaymentYear = {
  payYear: Date
  sales: number
  paymentsMonth: PaymentMonth[]
}

export type PaymentMonth = {
  payMonth: Date
  sales: number
  paymentsDay: PaymentDay[]
}

export type PaymentDay = {
  payDay: Date
  sales: number
  payments: PaymentByProduct[]
}

export type PaymentByProduct = {
  name: string;
  quantity: number;
  price: number;
}