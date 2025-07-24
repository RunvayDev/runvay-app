import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/utils/orders";

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

interface OrderDetailsProps {
  order: Order | null;
  onBack: () => void;
}

export default function OrderDetails({ order, onBack }: OrderDetailsProps) {
  if (!order) {
    return <div>No order details available.</div>;
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order Details</CardTitle>
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Order List
        </Button>
      </CardHeader>
      <CardContent>
        {/* Order Summary Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-bold text-lg mb-2">Order Information</p>
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Customer:</strong> {order.user?.name || "N/A"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Delivery Status:</strong> {order.status}
            </p>
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Payment Details</p>
            <p>
              <strong>Payment Method:</strong> {order.paymentDetails.method}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.paymentDetails.status}
            </p>
            {order.paymentDetails.transactionId && (
              <p>
                <strong>Transaction ID:</strong>{" "}
                {order.paymentDetails.transactionId}
              </p>
            )}
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Shipping Address</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.zip}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        {/* Order Items Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {item.product.images?.[0] && (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    )}
                    <span>{item.product.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.size || "N/A"}</TableCell>
                <TableCell>{item.color || "N/A"}</TableCell>
                <TableCell>{formatCurrency(item.product.price)}</TableCell>
                <TableCell>
                  {formatCurrency(item.product.price * item.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Total Amount */}
        <div className="mt-6 text-right">
          <p className="text-lg font-semibold">
            Total Amount: {formatCurrency(order.totalAmount)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
