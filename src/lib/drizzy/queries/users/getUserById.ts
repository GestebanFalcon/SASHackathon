import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzy/db";
import { SelectUser, users } from "@/lib/drizzy/schema/users";

export default async function getUserById(id: SelectUser['id']) {

    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;

}