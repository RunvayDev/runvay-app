interface OrderItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

export interface Order {
  _id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: string;
}
