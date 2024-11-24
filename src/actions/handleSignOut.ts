"use server"
import { signOut } from "@/lib/drizzy/auth";

const handleSignOut = async () => {

    await signOut();
}

export default handleSignOut;