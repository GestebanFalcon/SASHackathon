import { Alert, Button, TextField } from "@mui/material"
import "../authStyles.css"
import { signIn } from "@/lib/drizzy/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { signInSchema } from "@/lib/zod"
import { isRedirectError } from "next/dist/client/components/redirect"

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    const error = (await searchParams).error;

    const loginAction = async (formData: FormData) => {
        "use server"

        const validatedFields = signInSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password')
        });

        if (!validatedFields.success) {
            redirect("/auth/login?error=invalid");
        }

        const { email, password } = validatedFields.data;

        try {
            await signIn("credentials", {
                email,
                password,
                redirectTo: "/"
            });
        } catch (error) {
            console.error(error);
            if (isRedirectError(error)) {
                throw error;
            }
            redirect("/auth/login?error=incorrect");

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
                    {(error === "invalid") && (<Alert severity="error">Invalid data</Alert>)}
                </form>
                <p className="yap">Dont have an account? <Link href={"/auth/register"}>Register Here</Link></p>
            </section>

        </div>
    )
}