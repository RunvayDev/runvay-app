import { useSession } from "next-auth/react";
import { auth } from "@/lib/auth"

export default  async function Home() {
  const session = await auth()
 
  if (!session?.user) return null
    
    console.log(session.user.name);
    console.log(session.user.email);
    console.log(session.user.id);
    console.log(session.user.image);
    
}
