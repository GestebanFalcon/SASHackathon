"use client"
import { auth } from "@/lib/drizzy/auth";
import getUserById from "@/lib/drizzy/queries/users/getUserById";
import { redirect, RedirectType } from "next/navigation";
import Profile from "../components/profile";
import AuthWrapper from "@/components/authWrapper";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ExtendedUser } from "@/next-auth";

export default function Page() {
    const { data: session, update } = useSession();

    const [user, setUser] = useState<ExtendedUser>({});
    useEffect(() => {
        if (session && session.user) {
            setUser(session.user);
        }
    }, [session])

    console.log(session);
    const id = session?.user?.id;
    // if (!id) {
    //     console.log("crud")
    //     redirect("/auth/login");
    // }
    return (
        session &&
        <div className="flexy outer">
            <Profile userData={user} setUserData={setUser} update={update} />
        </div>)


}