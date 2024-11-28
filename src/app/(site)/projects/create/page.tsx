import { Button, TextField } from "@mui/material";
import "./createStyles.css";
import { redirect } from "next/navigation";
import { auth } from "@/lib/drizzy/auth";
import createProject from "@/actions/createProject";

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

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