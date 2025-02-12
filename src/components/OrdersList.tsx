"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency } from "@/utils/orders";
import OrderDetails from "./OrderDetails";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
}

interface Order {
  _id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  items: Array<{
    product: Product;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  paymentDetails: {
    method: string;
    status: string;
    transactionId?: string;
  };
  user: {
    name: string;
  };
}

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        if (err instanceof Error) {
          setError("Failed to load orders. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (isLoading) return;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
      {selectedOrder ? (
        <OrderDetails
          order={selectedOrder}
          onBack={() => setSelectedOrder(null)}
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Order #{order._id.slice(-6)}</span>
                  <span className="text-sm font-normal">
                    {formatDate(order.createdAt)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {formatCurrency(order.totalAmount)}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {order.status}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
