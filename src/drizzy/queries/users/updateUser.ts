import { db } from "@/drizzy/db";
import { SelectUser, users } from "@/drizzy/schema/users";
import { eq } from "drizzle-orm";

export default async function updateUser(id: SelectUser["id"], updatedUser: Partial<Omit<SelectUser, "id">>) {
    await db.update(users).set(updatedUser).where(eq(users.id, id));
}