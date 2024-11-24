import { db } from "@/lib/drizzy/db";
import { InsertUser, users } from "@/lib/drizzy/schema/users";

export default async function insertUser(data: InsertUser) {
    const [user] = await db.insert(users).values(data).returning();
    return user;
}