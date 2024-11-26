import { db } from "../../db";
import { projects } from "../../schema/projects";

export default async function getProjects() {
    const projectList = await db.select().from(projects);
    return projectList;
}