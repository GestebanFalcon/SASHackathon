import { db } from "@/drizzy/db";
import { InsertProject, projects } from "@/drizzy/schema/projects";

export default async function insertProject(data: InsertProject) {
    const [project] = await db.insert(projects).values(data).returning();
    return project;
}
