import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzy/db";
import { accounts, sessions, users, verificationTokens } from "@/drizzy/schema/users";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { config } from "dotenv";
import Credentials from "next-auth/providers/credentials";
import getUserByEmail from "./queries/users/getUserByEmail";
import bcrypt from "bcrypt";

config({ path: ".env.local" });

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens
    }),
    providers: [
        MicrosoftEntraID,
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                if (typeof email !== "string" || typeof password !== "string") {
                    throw new Error("Invalid credentials");
                }

                const user = await getUserByEmail(email);

                if (!user?.hashedPassword) {
                    throw new Error("Invalid credentials");
                }
                if (!bcrypt.compare(password, user.hashedPassword)) {
                    throw new Error("Invalid credentials");
                }

                return user;
            }
        })

    ]
});