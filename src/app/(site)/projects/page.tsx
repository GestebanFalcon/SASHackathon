import getProjects from "@/lib/drizzy/queries/projects/getProjects";
import ProjectsList from "./projectsList";
import Link from "next/link";

export default async function Page() {
    const projects = await getProjects();

    return (
        <div className="outer flexy">
            <Link href="/projects/create">Create Project</Link>
            <ProjectsList projects={projects} />
        </div>
    )

}