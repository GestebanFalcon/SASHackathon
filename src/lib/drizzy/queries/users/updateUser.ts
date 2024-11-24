import { db } from "@/lib/drizzy/db";
import { SelectUser, users } from "@/lib/drizzy/schema/users";
import { eq } from "drizzle-orm";

export default async function updateUser(id: SelectUser["id"], updatedUser: Partial<Omit<SelectUser, "id">>) {
    const [user] = await db.update(users).set(updatedUser).where(eq(users.id, id)).returning();
    return user;
}