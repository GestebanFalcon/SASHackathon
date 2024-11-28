import { auth } from "@/lib/drizzy/auth";
import insertProject from "@/lib/drizzy/queries/projects/insertProject";
import updateUser from "@/lib/drizzy/queries/users/updateUser";
import { createProjectSchema } from "@/lib/zod";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation"

const createProject = async (formData: FormData) => {
    "use server"

    const session = await auth();
    const id = session?.user?.id;
    if (!id) { redirect("/auth/login") }

    const projectId = session.user.projectId;
    if (projectId) { redirect(`/projects/${projectId}`) }
    const name = formData.get("name");

    const validatedFields = createProjectSchema.safeParse({ name });
    if (!validatedFields.success) { redirect("/projects/create?error=invalid") }

    try {
        console.log(name);
        const project = await insertProject({ name: validatedFields.data.name });
        const newUser = await updateUser(id, { projectId: project.id, projectAdmin: true });
        redirect(`/projects/${project.id}`);
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        console.error(error);
    }


}

export default createProject;