import { eq } from "drizzle-orm";
import { db } from "../../db";
import { InsertToken, SelectToken, SelectUser, tokens } from "../../schema/users";

export const getTokenByEmail = async (email: SelectToken["email"]) => {
    const [token] = await db.select().from(tokens).where(() => eq(tokens.email, email));
    return token;
}
export const deleteTokenByEmail = async (email: SelectToken["email"]) => {
    await db.delete(tokens).where(eq(tokens.email, email));
}

export const insertToken = async (data: InsertToken) => {
    const [token] = await db.insert(tokens).values(data).returning();
    return token;
}

export default async function generateToken(email: SelectToken["email"]) {

    const existingToken = await getTokenByEmail(email);
    if (existingToken) {
        await deleteTokenByEmail(email);
    }

    const expiresTime = new Date().getTime() + 1000 * 60 * 60 * 24 // one day
    const expires = new Date(expiresTime);

    const token = await insertToken({ expires, email });

    return token;
}