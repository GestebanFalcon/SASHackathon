import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzy/db";
import { accounts, users } from "@/drizzy/schema/users";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { config } from "dotenv";
import Credentials from "next-auth/providers/credentials";
import getUserByEmail from "./queries/users/getUserByEmail";
import bcrypt from "bcrypt";
import getUserById from "./queries/users/getUserById";

config({ path: ".env.local" });

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
    }),
    session: {
        strategy: "jwt"
    },
    providers: [
        MicrosoftEntraID,
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                console.log(`${email} - ${password}`);

                if (typeof email !== "string" || typeof password !== "string") {
                    throw new Error("Invalid credentials");
                }

                const user = await getUserByEmail(email);
                if (!user?.hashedPassword) {
                    console.log("aww man")
                    throw new Error("Invalid credentials");
                }
                if (!bcrypt.compare(password, user.hashedPassword)) {
                    console.log("Aww man")
                    throw new Error("Invalid credentials");
                }
                console.log("awesome")

                return user;
            }
        })

    ],
    callbacks: {
        async jwt({ token }) {

            if (!token.sub) return token;
            const id = token.sub;

            const user = await getUserById(id);

            if (user.campus) token.campus = user.campus;
            if (user.projectId) token.projectId = user.projectId;
            if (user.projectAdmin) token.projectAdmin = user.projectAdmin;

            return token;

        },
        async session({ token, session }) {
            console.log(token);
            if (token.id && session.user) {
                session.user.id = token.id as string;
            }

            return session;
        }
    }
});