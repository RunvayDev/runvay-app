  import { NextRequest, NextResponse } from "next/server";
  import connectMongo from "@/lib/mongoose";
  import Order from "@/models/Order";
  import Profile from "@/models/Profile";
  import User from "@/models/User";
   import { auth } from "@/lib/auth";

  // Handle GET Request
  export async function GET(req: NextRequest) {
    try {
      await connectMongo();

      const session= await auth();

      if (!session) {
        return NextResponse.json(
          { error: "SessionId header is missing" },
          { status: 400 }
        );
      }
  
       const user = await User.findOne( {email: session?.user?.email});
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      const profile = await Profile.findOne({ user: user._id })
        .populate("user", "name email")
        .populate({
          path: "orders",
          model: Order,
        });

      if (!profile) {
        return NextResponse.json(
          { message: "Profile not found" },
          { status: 404 }
        );
      }

      // Flatten the response so the client gets top-level name and email
      const profileObj = profile.toObject();
      profileObj.name = profile.user.name;
      profileObj.email = profile.user.email;

      return NextResponse.json(profileObj);
    } catch (error) {
      console.error("Profile fetch error:", error);
      return NextResponse.json(
        { message: "Failed to fetch profile" },
        { status: 500 }
      );
    }
  }

  // Handle PUT Request
  export async function PUT(req: NextRequest) {
    try {
      await connectMongo();
      const session = await auth();
      
      
      if (!session) {
        return NextResponse.json(
          { message: "Invalid or expired sessionId" },
          { status: 401 }
        );
      }

      const updateData = await req.json();
      const { name, email, phoneNumber, shippingAddress } = updateData;

      const user = await User.findOne({ email: session?.user?.email });
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      // Update user information
      if (name) user.name = name;
      if (email && email !== user.email) {
        // Check if email is already taken by another user
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== user._id.toString()) {
          return NextResponse.json(
            { message: "Email already in use" },
            { status: 400 }
          );
        }
        user.email = email;
      }

      await user.save();

      // Update profile information
      let profile = await Profile.findOne({ user: user._id });
      if (!profile) {
        profile = new Profile({
          user: user._id,
          email: email || user.email,
          phoneNumber,
          shippingAddress,
        });
      } else {
        if (email) profile.email = email;
        if (phoneNumber) profile.phoneNumber = phoneNumber;
        if (shippingAddress) profile.shippingAddress = shippingAddress;
      }

      await profile.save();

      // Return updated profile with populated user fields
      const updatedProfile = await Profile.findOne({ user: user._id })
        .populate("user", "name email")
        .populate({
          path: "orders",
          model: Order,
        });

      // Flatten the profile response
      const profileObj = updatedProfile?.toObject();
      if (profileObj && updatedProfile.user) {
        profileObj.name = updatedProfile.user.name;
        profileObj.email = updatedProfile.user.email;
      }

      return NextResponse.json(profileObj);
    } catch (error) {
      console.error("Profile update error:", error);
      return NextResponse.json(
        { message: "Failed to update profile" },
        { status: 500 }
      );
    }
  }
