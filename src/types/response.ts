export type Product = {
  id: number;
  name: string;
  barcode: number;
  price: number;
  stock: number;
  tag_id: number;
  image_path: string;
}

export type User = {
  id: number;
  name: string;
  debt: number;
  barcode: string;
}

export type Asset = {
  money: number;
  debt: number;
}

export type Payment = {
  id: number;
  price: number;
  pay_at: Date;
  method: string;
  user_name: string;
  products: PaymentProduct[];
}

export type PaymentProduct = {
  id: number;
  name: string;
  barcode: number;
  quantity: number;
  unit_price: number;
}