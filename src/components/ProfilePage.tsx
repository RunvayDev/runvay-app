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
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Profile Header with subtle animation */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
            <User className="w-16 h-16 text-gray-700" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">{profile.name}</h1>
          <p className="text-gray-600 font-medium">{profile.email}</p>
        </div>

        {updateMessage && (
          <Alert
            variant={updateMessage.type === "success" ? "default" : "destructive"}
            className="rounded-lg shadow-sm"
          >
            <AlertDescription className="font-medium">
              {updateMessage.message}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Card */}
          <Card className="shadow-xl rounded-xl border border-gray-100">
            <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <User className="w-6 h-6" />
                  Personal Information
                </CardTitle>
                {!isEditing && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Input Fields with enhanced focus states */}
                <div className="space-y-3">
                  <label htmlFor="name" className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <User className="w-4 h-4" /> Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={editedProfile.name || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-medium flex items-center gap-2 text-gray-700">
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
                    className="border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4" /> Phone Number
                  </label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="9999999999"
                    value={editedProfile.phoneNumber || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 h-11 rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address Card with improved grid */}
          <Card className="shadow-xl rounded-xl border border-gray-100">
            <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <MapPin className="w-6 h-6" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="street" className="text-sm font-medium text-gray-700">Street</label>
                  <Input
                    id="street"
                    name="shipping.street"
                    placeholder="1234 Main St"
                    value={editedProfile.shippingAddress?.street || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>
                  <Input
                    id="city"
                    name="shipping.city"
                    placeholder="Bengaluru"
                    value={editedProfile.shippingAddress?.city || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="zip" className="text-sm font-medium text-gray-700">ZIP Code</label>
                  <Input
                    id="zip"
                    name="shipping.zip"  // Fixed the name attribute
                    placeholder="123456"
                    value={editedProfile.shippingAddress?.zip || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="country" className="text-sm font-medium text-gray-700">Country</label>
                  <Input
                    id="country"
                    name="shipping.country"
                    placeholder="XYZ"
                    value={editedProfile.shippingAddress?.country || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 h-11 rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Section with enhanced hover states */}
          {profile.orders && profile.orders.length > 0 && (
            <Card className="shadow-xl rounded-xl border border-gray-100">
              <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Package className="w-6 h-6" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {profile.orders.map((order) => (
                    <div
                      key={order._id}
                      className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 group"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-black">
                            Order #{order._id.slice(-6).toUpperCase()}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{order.item}</p>
                        </div>
                        <p className="font-medium text-lg text-gray-900">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Enhanced Action Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditedProfile(profile);
                }}
                className="h-11 px-8 rounded-lg border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              >
                Discard Changes
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="h-11 px-8 rounded-lg bg-gray-900 hover:bg-gray-800 text-white focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
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