"use client"

import { SelectUser } from "@/drizzy/schema/users";
import { Divider, List, ListItem } from "@mui/material";
import "../user.css";
import InfoItem from "./infoItem";
import updateUser from "@/drizzy/queries/users/updateUser";
import { ExtendedUser } from "@/next-auth";
import { useState } from "react";
import { updateProfile } from "@/actions/updateProfile";

export default function Profile({ user }: { user: ExtendedUser }) {

    const [userDb, setUserDb] = useState(user);
    const [userData, setUserData] = useState(user)

    const keys = ["name", "campus", "email"] as Array<keyof ExtendedUser>;


    const saveData = async () => {
        try {
            const newUser = await updateProfile(userData);
            setUserDb(newUser);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    }

    return (
        <section className="profileOuter">
            <h1>User Info</h1>
            <List>
                <InfoItem
                    value={userData["email"]}
                    updateData={(value: string) => {
                        setUserData({ ...userData, email: value });
                    }}
                    saveData={saveData}
                    label={"Email"}
                />
                <InfoItem
                    value={userData["name"]}
                    updateData={(value: string) => {
                        setUserData({ ...userData, name: value });
                    }}
                    saveData={saveData}
                    label={"Name"}
                />
                <InfoItem
                    value={userData["campus"]}
                    updateData={(value: string) => {
                        setUserData({ ...userData, campus: value });
                    }}
                    saveData={saveData}
                    label={"Campus"}
                />
            </List>
        </section>
    )
}

