"use client"
import { ReactNode, useState } from "react";
import { SelectUser } from "@/drizzy/schema/users";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CircularProgress, Divider, TextField, Tooltip } from "@mui/material";
import { useFormStatus } from "react-dom";

export default function InfoItem({ label, children, key, updateAction }: {
    label: string, children: any, key: keyof SelectUser, updateAction: (data: {
        email?: string;
        campus?: string;
        name?: string;
    }) => Promise<{
        email: string | null;
        campus: string | null;
        name: string | null;
    }>
}) {
    "use client"
    const { pending } = useFormStatus()
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(children)



    return (
        <>
            <li className="info" key={key}>
                <p className="label">{label}</p>
                <div className="value">{isEditing ? (
                    <TextField type="text" value={value} onChange={e => { setValue(e.target.value) }} />
                ) : value}</div>

                {isEditing ? (
                    <Tooltip title="Save" className="mouse">
                        <button
                            onClick={async e => {
                                try {

                                    const updateSettings: any = {};
                                    updateSettings[key] = value;
                                    const newUser: any = await updateAction(updateSettings);
                                    console.log(newUser);
                                    const newValue = newUser[key]
                                    if (newValue) {
                                        setIsEditing(false);
                                    } else {
                                        throw new Error("value doesn't exist")
                                    }

                                } catch (error) {
                                    setValue(children);
                                    console.error(error);
                                }

                            }}
                            disabled={pending}>

                            {pending ? (
                                <CircularProgress />
                            ) : (
                                <EditOffIcon style={{ fill: "green" }} fontSize="small" />
                            )}

                        </button>
                    </Tooltip>
                ) : (
                    <Tooltip title="Edit" className="mouse">
                        <button onClick={e => setIsEditing(!isEditing)}>
                            <EditIcon fontSize="small" />
                        </button>
                    </Tooltip>
                )}

            </li>
            <Divider component="li"></Divider>
        </>
    )
}