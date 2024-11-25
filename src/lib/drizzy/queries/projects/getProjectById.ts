import { db } from "@/lib/drizzy/db";
import { projects, SelectProject } from "@/lib/drizzy/schema/projects";
import { eq } from "drizzle-orm";

export default async function getProjectById(id: SelectProject["id"]) {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
}