import { db } from "@/lib/drizzy/db";
import { InsertProject, projects } from "@/lib/drizzy/schema/projects";

export default async function insertProject(data: InsertProject) {
    const [project] = await db.insert(projects).values(data).returning();
    return project;
}
