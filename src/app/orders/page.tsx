import { Suspense } from "react";
import OrdersList from "@/components/OrdersList";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Order History</h1>
      </div>
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersList />
      </Suspense>
    </div>
  );
}

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}
