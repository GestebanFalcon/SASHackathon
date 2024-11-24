import { Button, TextField } from "@mui/material"
import "../authStyles.css"
import { signIn } from "@/drizzy/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function Page() {

    const loginAction = async (formData: FormData) => {
        "use server"
        
        await signIn("credentials", formData);
        redirect("/");
    }

    return (
        <div className="flexy outer">

            <section className="card">
                <h1>Sign In</h1>
                <form action={loginAction}>
                    <TextField label="Email" type="email" name="email"></TextField>
                    <TextField label="Password" type="password" name="password"></TextField>
                    <Button color="success" type="submit" >Sign In</Button>
                </form>
                <p className="yap">Dont have an account? <Link href={"/auth/register"}>Register Here</Link></p>
            </section>

        </div>
    )
}