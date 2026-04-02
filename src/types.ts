export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
  image: string;
}

export interface ExpertTip {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: 'product' | 'service';
}
