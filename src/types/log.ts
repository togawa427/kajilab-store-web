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