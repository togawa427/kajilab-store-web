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

export type SalesPerProduct = {
  name: string;
  quantity: number;
  unit_price: number;
}

export type SalesDay = {
  day: number;
  total_sale: number;
  Payments: SalesPerProduct[];
}

export type SalesProduct = {
  name: string;
  quantity: number;
  price: number;
}