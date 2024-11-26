import { Button, TextField } from "@mui/material";
import "./createStyles.css";
import { redirect } from "next/navigation";
import insertProject from "@/lib/drizzy/queries/projects/insertProject";
import { isRedirectError } from "next/dist/client/components/redirect";
import { createProjectSchema } from "@/lib/zod";
import { auth } from "@/lib/drizzy/auth";
import updateUser from "@/lib/drizzy/queries/users/updateUser";

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    const session = await auth();
    const id = session?.user?.id;
    if (!id) {
        redirect("/auth/login");
    }

    const createProject = async (formData: FormData) => {
        "use server"


        const name = formData.get("name");

        const validatedFields = createProjectSchema.safeParse({ name });

        if (!validatedFields.success) {
            redirect("/projects/create?error=invalid");
        }

        try {
            console.log(name);
            const project = await insertProject({ name: validatedFields.data.name });
            const newUser = await updateUser(id, { projectId: project.id });
            redirect(`/projects/${project.id}`);
        } catch (error) {

            if (isRedirectError(error)) {
                throw error;
            }
            console.error(error);
        }


    }

    return (
        <div className="outer flexy">
            <section className="paper col">
                <form action={createProject}>
                    <h1>Sigmoid</h1>

                    <TextField type="text" label="Name" name="name" />

                    <Button type="submit">Submit! ^.^</Button>
                </form>
            </section>
        </div>
    )


}