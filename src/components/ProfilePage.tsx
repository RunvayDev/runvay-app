"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, User, MapPin, Package, Phone, Mail, Edit2 } from "lucide-react";

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
  name: string;
  email: string;
  phoneNumber: string;
  shippingAddress?: ShippingAddress;
  orders: OrderData[];
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<ProfileData>>({});
  const [updateMessage, setUpdateMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // ... keeping all the existing handlers and useEffect ...
  // (Previous functionality remains the same)

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/profile");
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
  }, []);

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
      const updatePayload = {
        userId: profile?.user._id,
        name: editedProfile.name,
        email: editedProfile.email,
        phoneNumber: editedProfile.phoneNumber,
        shippingAddress: editedProfile.shippingAddress,
      };

      const { data } = await axios.put("/api/profile", updatePayload);
      setProfile(data);
      setIsEditing(false);
      setUpdateMessage({
        type: "success",
        message: "Profile updated successfully!",
      });
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

  if (loading && !profile) {
    return null;
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="mb-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-12 h-12 text-gray-600" />
          </div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">{profile.email}</p>
        </div>

        {updateMessage && (
          <Alert
            variant={updateMessage.type === "success" ? "default" : "destructive"}
            className="mb-6"
          >
            <AlertDescription>{updateMessage.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                {!isEditing && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" /> Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={editedProfile.name || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-200 focus:ring-black"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="abc@sample.com"
                    value={editedProfile.email || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-200 focus:ring-black"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="9999999999"
                    value={editedProfile.phoneNumber || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-200 focus:ring-black"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="street" className="text-sm font-medium">Street</label>
                  <Input
                    id="street"
                    name="shipping.street"
                    placeholder="1234 Main St"
                    value={editedProfile.shippingAddress?.street || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-200 focus:ring-black"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">City</label>
                  <Input
                    id="city"
                    name="shipping.city"
                    placeholder="Bengaluru"
                    value={editedProfile.shippingAddress?.city || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-200 focus:ring-black"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
                  <Input
                    id="zip"
                    name="Pincode"
                    placeholder="123456"
                    value={editedProfile.shippingAddress?.zip || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-200 focus:ring-black"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium">Country</label>
                  <Input
                    id="country"
                    name="shipping.country"
                    placeholder="XYZ"
                    value={editedProfile.shippingAddress?.country || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-200 focus:ring-black"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Section */}
          {profile.orders && profile.orders.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {profile.orders.map((order) => (
                    <div
                      key={order._id}
                      className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Order #{order._id}</p>
                          <p className="text-sm text-gray-600">{order.item}</p>
                        </div>
                        <p className="font-medium text-lg">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditedProfile(profile);
                }}
                className="border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-black hover:bg-gray-900 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;