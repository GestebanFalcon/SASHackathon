import { db } from "@/drizzy/db";
import { InsertProject, projects } from "@/drizzy/schema";

export default async function insertProject(data: InsertProject) {
    await db.insert(projects).values(data);
}
