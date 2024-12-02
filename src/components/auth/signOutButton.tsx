import { signOut } from "@/lib/drizzy/auth"

export default function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}>
            <button type="submit">Sign Out</button>
        </form>
    )
}