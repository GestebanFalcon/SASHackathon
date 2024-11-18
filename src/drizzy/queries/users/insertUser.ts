import { db } from "@/drizzy/db";
import { InsertUser, users } from "@/drizzy/schema/users";

export default async function insertUser(data: InsertUser) {
    const [user] = await db.insert(users).values(data).returning();
    return user;
}