export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  item: Product;
  quantity: number;
}

export interface Cart {
  subTotal: number;
  products: CartItem[];
}
