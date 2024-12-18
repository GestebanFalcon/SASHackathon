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
                <h2>{project.name}</h2>
                <h3>settings</h3>
                <ul>
                    <li className="property">
                        <p className="propertyKey">Repo</p>
                        <p className="propertyLabel">githublinkhere</p>
                    </li>
                </ul>
            </section>
            <div className="content">
                <h1>Project Dashboard</h1>
                <div className="contentPadding">

                    <section className="usersBar container">
                        <ul>
                            {users.map((user, index) => (
                                <UserCard user={user} key={index} />
                            ))}
                        </ul>
                    </section>

                    <div className="bottomDashboardLayout">
                        <section className="outer container">
                            <form action={uploadFile}>
                                <input type="file" name="file" />
                                <button type="submit">submit</button>
                            </form>
                        </section>
                        <section className="outer container">

                        </section>
                    </div>
                </div>
            </div>
        </div>
    )


}