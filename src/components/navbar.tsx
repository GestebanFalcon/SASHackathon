import Link from "next/link"
import "./navbar.css"
import { auth } from "@/lib/drizzy/auth"
import AuthWrapper from "./authWrapper"
import ProfileButton from "./profileButton"

export default async function Navbar() {

    const session = await auth()

    return (
        <nav className="navBase">
            <div className="navLeft">
                <Link href="/" className="navLink">Home</Link>
            </div>
            <div className="navRight">
                {session ? (
                    <AuthWrapper><ProfileButton session={session} /></AuthWrapper>
                ) : (
                    <Link href={"/auth/login"} className="registerLink">Sign In</Link>
                )}

            </div>
        </nav>
    )
}