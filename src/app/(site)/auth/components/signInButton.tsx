import { signIn } from "@/lib/drizzy/auth"

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn()
            }}
        >
            <button type="submit">Sign in</button>
        </form>
    )
}