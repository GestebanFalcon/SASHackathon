import {
    boolean,
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    uuid
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccount } from "next-auth/adapters"
import { projects } from "./projects"
import { db } from "../db"


export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    campus: text("campus"),
    hashedPassword: text("hashed_password"),

    projectId: uuid('project_id').references(() => projects.id),
    projectAdmin: boolean('project_admin'),
})

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<any>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

// export const sessions = pgTable("session", {
//     sessionToken: text("sessionToken").primaryKey(),
//     userId: text("userId")
//         .notNull()
//         .references(() => users.id, { onDelete: "cascade" }),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
// })

// export const verificationTokens = pgTable(
//     "verificationToken",
//     {
//         identifier: text("identifier").notNull(),
//         token: text("token").notNull(),
//         expires: timestamp("expires", { mode: "date" }).notNull(),
//     },
//     (verificationToken) => ({
//         compositePk: primaryKey({
//             columns: [verificationToken.identifier, verificationToken.token],
//         }),
//     })
// )

// export const authenticators = pgTable(
//     "authenticator",
//     {
//         credentialID: text("credentialID").notNull().unique(),
//         userId: text("userId")
//             .notNull()
//             .references(() => users.id, { onDelete: "cascade" }),
//         providerAccountId: text("providerAccountId").notNull(),
//         credentialPublicKey: text("credentialPublicKey").notNull(),
//         counter: integer("counter").notNull(),
//         credentialDeviceType: text("credentialDeviceType").notNull(),
//         credentialBackedUp: boolean("credentialBackedUp").notNull(),
//         transports: text("transports"),
//     },
//     (authenticator) => ({
//         compositePK: primaryKey({
//             columns: [authenticator.userId, authenticator.credentialID],
//         }),
//     })
// )


export type SelectUser = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert