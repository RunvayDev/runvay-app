import { NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongodb";
import User from "@/models/User";
import { generateSalt, hashPassword } from "@/utils/password";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    await connectToDataBase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Generate salt and hashed password
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    // Save the user in the database
    const newUser = await User.create({
      email,
      salt,
      hashedPassword,
      name,
      oauthProvider: "credentials",
    });

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
