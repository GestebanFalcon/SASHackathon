"use server"
import { getTokenByToken } from "@/lib/drizzy/queries/tokens/generateToken"
import getUserByEmail from "@/lib/drizzy/queries/users/getUserByEmail";
import updateUser from "@/lib/drizzy/queries/users/updateUser";

export const verifyToken = async (token: string) => {
    const verificationToken = await getTokenByToken(token);

    if (!verificationToken) {
        return { error: "Invalid token", redirect: "/auth/verify" };
    }

    const currentDate = new Date();
    if (verificationToken.expires < currentDate) {
        return { error: "Expired", redirect: "/auth/verify" };
    }

    const email = verificationToken.email;
    const user = await getUserByEmail(email);

    if (!user) {
        return { error: "User does not exist", redirect: "/auth/register" };
    }

    await updateUser(user?.id, { emailVerified: currentDate });

    return { success: "Email verified" };

}

