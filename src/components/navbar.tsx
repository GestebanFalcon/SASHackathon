import Link from "next/link"
import "./navbar.css"

export default function Navbar() {
    return (
        <nav className="navBase">
            <div className="navLeft">
                <Link href="/" className="navLink">Home</Link>
            </div>
            <div className="navRight">
                <Link href="/auth/register" className="registerLink">Register</Link>
            </div>
        </nav>
    )
}