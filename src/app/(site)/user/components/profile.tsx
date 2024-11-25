"use client"

import { SelectUser } from "@/lib/drizzy/schema/users";
import { Button, Divider, List, ListItem, Skeleton, TextField } from "@mui/material";
import "../user.css";
import InfoItem from "./infoItem";
import updateUser from "@/lib/drizzy/queries/users/updateUser";
import { ExtendedUser } from "@/next-auth";
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from "react";
import { updateProfile } from "@/actions/updateProfile";
import { UpdateSession, useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function Profile({ userData, setUserData, update }: { userData: ExtendedUser, setUserData: Dispatch<SetStateAction<ExtendedUser>>, update: UpdateSession }) {

    // console.log(session);
    // const user = session?.user;
    // if (!user) {
    //     return (
    //         <section className="profileOuter">
    //             <Skeleton variant="text"></Skeleton>
    //             <Skeleton variant="rounded"></Skeleton>
    //         </section>
    //     )
    // }

    const [pending, setTransition] = useTransition();


    const keys = ["name", "campus", "email"] as Array<keyof ExtendedUser>;

    const saveData = async () => {
        setTransition(() => {
            console.log(userData);
            updateProfile(userData)
                .then((res) => {
                    console.log(res);
                    update();
                })
        }
        )

        return true;
    }

    return (
        <section className="paper">
            <h1>User Info</h1>
            <List>
                <InfoItem
                    value={userData["email"]}
                    updateData={(value: string) => {
                        setUserData({ ...userData, email: value });
                    }}
                    saveData={saveData}
                    label={"Email"}
                    pending={pending}
                />
                <InfoItem
                    value={userData["name"]}
                    updateData={(value: string) => {
                        setUserData({ ...userData, name: value });
                    }}
                    saveData={saveData}
                    label={"Name"}
                    pending={pending}
                />
                <InfoItem
                    value={userData["campus"]}
                    updateData={(value: string) => {
                        setUserData({ ...userData, campus: value });
                    }}
                    saveData={saveData}
                    label={"Campus"}
                    pending={pending}
                />
            </List>
        </section>
    )
}

