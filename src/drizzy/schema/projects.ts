import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const projects = pgTable('projects', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    repo: text('repo'),
    description: text('description'),
})

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;