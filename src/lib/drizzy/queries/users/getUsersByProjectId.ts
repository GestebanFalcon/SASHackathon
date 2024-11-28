import { eq } from "drizzle-orm";
import { db } from "../../db";
import { SelectUser, users } from "../../schema/users";
import { SelectProject } from "../../schema/projects";

export default async function getUsersByProjectId(projectId: SelectProject["id"]) {
    const userList = await db.select().from(users).where(() => eq(users.projectId, projectId));
    return userList;
}