import { SelectUser } from "@/drizzy/schema/users";

export default function Profile({ user }: { user: SelectUser }) {

    return (
        <section className="profileOuter">
            <ul>

            </ul>
        </section>
    )
}

function InfoItem({ title, value }: { title: string, value: string }) {
    return (
        <li>
            <p>{title}:</p> <p>{value}</p>
        </li>
    )
}