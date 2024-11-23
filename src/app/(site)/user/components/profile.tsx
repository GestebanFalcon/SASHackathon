import { SelectUser } from "@/drizzy/schema/users";
import { Divider, List, ListItem } from "@mui/material";
import "../user.css";
import InfoItem from "./infoItem";
import updateUser from "@/drizzy/queries/users/updateUser";

type UserScopes = {
    email: string,
    name: string,
    campus: string,

}

export default async function Profile({ user }: { user: SelectUser }) {

    const keys = ["name", "campus", "email"] as Array<keyof SelectUser>;

    const capitalize = (text: string) => {
        return (text[0].toUpperCase() + text.slice(1));
    }

    const updateAction = async (data: { email?: string, campus?: string, name?: string }) => {
        "use server"
        const newUser = await updateUser(user.id, data);


        //dont want to give away spooky dangerous fields;
        return { email: newUser.email, campus: newUser.campus, name: newUser.name }
    }

    return (
        <section className="profileOuter">
            <h1>User Info</h1>
            <List>
                {keys.map((key) => (
                    <InfoItem label={capitalize(key)} key={key} updateAction={updateAction}>{user[key] ? user[key] : ""}</InfoItem>
                ))}
            </List>
        </section>
    )
}

