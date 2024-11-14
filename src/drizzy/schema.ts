import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('user', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    campus: text('campus').notNull(),
    email: text('email').notNull().unique(),
    hashedPassword: text('hashed_password').notNull(),
    projectId: integer('project_id').references(() => projects.id)

});

export const projects = pgTable('project', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});

export const projectRelations = relations(projects, ({ many }) => ({
    members: many(users)
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertProject = typeof users.$inferInsert;
export type SelectProject = typeof users.$inferSelect;