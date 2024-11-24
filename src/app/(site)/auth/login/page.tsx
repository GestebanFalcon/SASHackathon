import { Alert, Button, TextField } from "@mui/material"
import "../authStyles.css"
import { signIn } from "@/drizzy/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    const error = (await searchParams).error;

    const loginAction = async (formData: FormData) => {
        "use server"

        try {
            await signIn("credentials", formData);
            redirect("/");
        } catch (error) {
            console.error(error);
            redirect("/auth/login?error=incorrect")
        }

    }

    return (
        <div className="flexy outer">

            <section className="card">
                <h1>Sign In</h1>
                <form action={loginAction}>
                    <TextField label="Email" type="email" name="email"></TextField>
                    <TextField label="Password" type="password" name="password"></TextField>
                    <Button color="success" type="submit" >Sign In</Button>
                    {(error === "incorrect") && (<Alert severity="error">Incorrect email or password</Alert>)}
                </form>
                <p className="yap">Dont have an account? <Link href={"/auth/register"}>Register Here</Link></p>
            </section>

        </div>
    )
}