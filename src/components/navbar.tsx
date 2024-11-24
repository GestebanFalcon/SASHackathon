import Link from "next/link"
import "./navbar.css"
import { auth } from "@/lib/drizzy/auth"

export default async function Navbar() {

    const session = await auth()

    return (
        <nav className="navBase">
            <div className="navLeft">
                <Link href="/" className="navLink">Home</Link>
            </div>
            <div className="navRight">
                {session ? (
                    <Link href={`/user/dashboard`} className="registerLink">{session.user?.name}</Link>
                ) : (
                    <Link href={"/auth/login"} className="registerLink">Sign In</Link>
                )}

            </div>
        </nav>
    )
}