"use client"
import { auth } from "@/lib/drizzy/auth";
import getUserById from "@/lib/drizzy/queries/users/getUserById";
import { redirect, RedirectType } from "next/navigation";
import Profile from "../components/profile";
import AuthWrapper from "@/components/authWrapper";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ExtendedUser } from "@/next-auth";
import ProjectPreview from "../components/projectPreview";
import Link from "next/link";

export default function Page() {
    const { data: session, update } = useSession();

    const [user, setUser] = useState<ExtendedUser>({});
    useEffect(() => {
        if (session && session.user) {
            setUser(session.user);
        }
    }, [session])

    const id = session?.user?.id;
    // if (!id) {
    //     console.log("crud")
    //     redirect("/auth/login");
    // }
    return (
        session &&
        <div className=" outer flexgap">
            <Profile userData={user} setUserData={setUser} update={update} />
            {
                session.user.projectId ? (
                    <ProjectPreview projectId={session.user.projectId}></ProjectPreview>
                ) : (
                    <section className="paper flexy col">
                        <h1>Group</h1>
                        <div className="projectPadding">
                            <h3>You are currently not a member of a group</h3>
                            <Link href="/projects"><i>Browse Groups</i></Link>
                        </div>
                    </section>
                )
            }

        </div>


    )


}