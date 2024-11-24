import { db } from "@/lib/drizzy/db";
import { SelectUser, users } from "@/lib/drizzy/schema/users";
import { eq } from "drizzle-orm";


export default async function getUserByEmail(email: SelectUser['email']) {
    if (!email) {
        return null;
    }
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
}