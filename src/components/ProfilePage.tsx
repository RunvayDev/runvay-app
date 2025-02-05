"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface ShippingAddress {
  street?: string;
  city?: string;
  zip?: string;
  country?: string;
}

interface OrderData {
  _id: string;
  item: string;
  totalAmount: number;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
}

interface ProfileData {
  _id: string;
  user: UserData;
  name: string; // flattened from user.name in GET response
  email: string; // flattened from user.email in GET response
  phoneNumber: string;
  shippingAddress?: ShippingAddress;
  orders: OrderData[];
}

interface ProfilePageProps {
  name: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ name }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<ProfileData>>({});
  const [updateMessage, setUpdateMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<ProfileData>(
        `/api/profile?name=${encodeURIComponent(name)}`,
        {
          headers: { "Cache-Control": "no-store" },
        },
      );
      setProfile(data);
      setEditedProfile(data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("shipping.")) {
      const field = name.split(".")[1];
      setEditedProfile((prev) => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value,
        },
      }));
    } else {
      setEditedProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Build the update payload with a stable userId
      const updatePayload = {
        userId: profile?.user._id, // stable identifier for the backend
        name: editedProfile.name,
        email: editedProfile.email,
        phoneNumber: editedProfile.phoneNumber,
        shippingAddress: editedProfile.shippingAddress,
      };

      const { data } = await axios.put<ProfileData>(
        "/api/profile",
        updatePayload,
      );
      setProfile(data);
      setIsEditing(false);
      setUpdateMessage({
        type: "success",
        message: "Profile updated successfully!",
      });
      // Clear success message after 3 seconds
      setTimeout(() => setUpdateMessage(null), 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setUpdateMessage({
          type: "error",
          message: err.response?.data?.message || "Failed to update profile",
        });
      } else {
        setUpdateMessage({
          type: "error",
          message: "An unexpected error occurred",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile || {});
    setUpdateMessage(null);
  };

  if (loading && !profile) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Alert>
          <AlertDescription>No profile data available.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">My Profile</h1>

      {updateMessage && (
        <Alert
          variant={updateMessage.type === "success" ? "default" : "destructive"}
        >
          <AlertDescription>{updateMessage.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={editedProfile.name || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editedProfile.email || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={editedProfile.phoneNumber || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="street" className="text-sm font-medium">
                Street
              </label>
              <Input
                id="street"
                name="shipping.street"
                value={editedProfile.shippingAddress?.street || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <Input
                id="city"
                name="shipping.city"
                value={editedProfile.shippingAddress?.city || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="zip" className="text-sm font-medium">
                ZIP Code
              </label>
              <Input
                id="zip"
                name="shipping.zip"
                value={editedProfile.shippingAddress?.zip || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">
                Country
              </label>
              <Input
                id="country"
                name="shipping.country"
                value={editedProfile.shippingAddress?.country || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          {!isEditing ? (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={loading}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </>
          )}
        </div>
      </form>

      {/* Orders Section */}
      {profile.orders && profile.orders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.orders.map((order) => (
                <div
                  key={order._id}
                  className="p-4 rounded-lg border bg-background"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #{order._id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.item}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;
