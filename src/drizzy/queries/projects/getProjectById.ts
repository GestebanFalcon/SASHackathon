import { db } from "@/drizzy/db";
import { projects, SelectProject } from "@/drizzy/schema";
import { eq } from "drizzle-orm";

export default async function getProjectById(id: SelectProject["id"]) {
    const user = db.select().from(projects).where(eq(projects.id, id));
}