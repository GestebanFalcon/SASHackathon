import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzy/db";
import { accounts, sessions, users, verificationTokens } from "@/drizzy/schema/users";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { config } from "dotenv";

config({ path: ".env.local" });

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens
    }),
    providers: [MicrosoftEntraID]
});