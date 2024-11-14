import { db } from "@/drizzy/db";
import { InsertUser, users } from "@/drizzy/schema";

export default async function insertUser(data: InsertUser) {
    await db.insert(users).values(data);
}