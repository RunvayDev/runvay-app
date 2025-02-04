"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface OrderData {
  _id: string;
  item: string;
  totalAmount: number;
}

interface ShippingAddress {
  street?: string;
  city?: string;
  zip?: string;
  country?: string;
}

interface ProfileData {
  user: string;
  phoneNumber: string;
  shippingAddress?: ShippingAddress;
  orders: OrderData[];
}

interface ProfilePageProps {
  name: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ name }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get<ProfileData>(
          `/api/profile?name=${encodeURIComponent(name)}`,
          {
            headers: {
              "Cache-Control": "no-store", // Disable caching
            },
          },
        );
        setProfile(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-red-500">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
        <p>No profile data available for {name}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Profile for {name}
      </h1>

      {/* Contact Information */}
      <section className="mb-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-700">
          <span className="font-medium">Phone:</span> {profile.phoneNumber}
        </p>
      </section>

      {/* Shipping Address */}
      {profile.shippingAddress && (
        <section className="mb-8 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
          <p className="text-gray-700">
            {profile.shippingAddress.street && (
              <span>{profile.shippingAddress.street}, </span>
            )}
            {profile.shippingAddress.city && (
              <span>{profile.shippingAddress.city}, </span>
            )}
            {profile.shippingAddress.zip && (
              <span>{profile.shippingAddress.zip}, </span>
            )}
            {profile.shippingAddress.country}
          </p>
        </section>
      )}

      {/* Past Orders */}
      <section className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Past Orders</h2>
        {profile.orders && profile.orders.length > 0 ? (
          <ul className="space-y-4">
            {profile.orders.map((order) => (
              <li
                key={order._id}
                className="p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <p className="text-gray-700">
                  <span className="font-medium">Order ID:</span> {order._id}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Total:</span> $
                  {order.totalAmount.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No past orders found.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
