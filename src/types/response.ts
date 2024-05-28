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