import { auth } from "@/lib/drizzy/auth";
import getUserById from "@/lib/drizzy/queries/users/getUserById";
import { redirect, RedirectType } from "next/navigation";
import Profile from "../components/profile";

export default async function Page() {
    const session = await auth();
    const id = session?.user?.id;
    if (!id) {
        console.log("crud")
        redirect("/auth/login");
    }
    const user = await getUserById(id);

    return (
        <div className="flexy outer">
            <Profile user={user}></Profile>
        </div>)


}