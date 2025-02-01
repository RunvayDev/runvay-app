import { connectToDataBase} from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function getUserFromDb(email: string) {
  try {
    await connectToDataBase();
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    throw new Error("Unable to fetch user.");
  }
}
