import { ExtendedUser } from "@/next-auth";
import { Paper } from "@mui/material";
import Link from "next/link";

export default async function UserCard({ user }: { user: ExtendedUser }) {
    return (
        <Link href={`/user/${user.id}`}>
            <Paper className="userIcon">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.campus}</p>
            </Paper>
        </Link>
    )
}