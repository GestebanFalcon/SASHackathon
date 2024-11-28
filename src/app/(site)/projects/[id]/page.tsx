import getProjectById from "@/lib/drizzy/queries/projects/getProjectById";
import { redirect } from "next/navigation";
import "./projectsStyles.css";
import getUsersByProjectId from "@/lib/drizzy/queries/users/getUsersByProjectId";
import UserCard from "./userCard";
import { Paper } from "@mui/material";
import uploadFile from "@/actions/uploadFile";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

    const projectId = (await params).id;
    const project = await getProjectById(projectId);
    if (!project) {
        redirect('/projects');
    }
    const users = await getUsersByProjectId(projectId);

    return (
        <div className="base">
            <section className="sidebar">
                <Paper className="sidebarPaper" elevation={2}>
                    <h2>{project.name}</h2>
                    <ul>
                        <li className="property">
                            <p className="propertyKey">Repo</p>
                            <p className="propertyLabel">githublinkhere</p>
                        </li>
                    </ul>
                </Paper>
            </section>
            <div className="content">

                <section className="usersBar">
                    <ul>
                        {users.map((user, index) => (
                            <UserCard user={user} key={index} />
                        ))}
                    </ul>
                </section>
                <form action={uploadFile}>
                    <input type="file" name="file" />
                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )


}