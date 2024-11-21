import Link from "next/link"
import "./navbar.css"
import { auth } from "@/drizzy/auth"

export default async function Navbar() {

    const session = await auth()
    console.log(session);

    return (
        <nav className="navBase">
            <div className="navLeft">
                <Link href="/" className="navLink">Home</Link>
            </div>
            <div className="navRight">
                {session ? (
                    <Link href={`/user/${session.user?.id}/dashboard`} className="registerLink">{session.user?.name}</Link>
                ) : (
                    <Link href={"/auth/login"} className="registerLink">Sign In</Link>
                )}

            </div>
        </nav>
    )
}