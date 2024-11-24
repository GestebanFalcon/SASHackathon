import { auth } from "@/lib/drizzy/auth";
import getUserById from "@/lib/drizzy/queries/users/getUserById";
import { redirect, RedirectType } from "next/navigation";
import Profile from "../components/profile";
import AuthWrapper from "@/components/authWrapper";

export default async function Page() {
    const session = await auth();
    const id = session?.user?.id;
    if (!id) {
        console.log("crud")
        redirect("/auth/login");
    }

    return (
        <div className="flexy outer">
            <AuthWrapper><Profile /></AuthWrapper>
        </div>)


}