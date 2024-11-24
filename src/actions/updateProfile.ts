"use server"
import { auth } from "@/lib/drizzy/auth";
import updateUser from "@/lib/drizzy/queries/users/updateUser";
import { ExtendedUser } from "@/next-auth";
import { redirect } from "next/navigation";

export const updateProfile = async ({ id, name, email }: ExtendedUser) => {


    const session = await auth()
    const sessionId = session?.user?.id;

    if (!session) redirect("/auth/login");
    if (!sessionId) redirect("/auth/register");

    //authenticate provided user against authenticated user
    if (sessionId !== id) redirect("/auth/login");





    const newUser = await updateUser(id, { name, email });


    //dont want to give away spooky dangerous fields;
    return { email: newUser.email, campus: newUser.campus, name: newUser.name }
}