import { db } from "@/drizzy/db";
import { projects, SelectProject } from "@/drizzy/schema/projects";
import { eq } from "drizzle-orm";

export default async function getProjectById(id: SelectProject["id"]) {
    const project = db.select().from(projects).where(eq(projects.id, id));
}