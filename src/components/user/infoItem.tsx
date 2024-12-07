"use client"

import { ReactNode, useState } from "react";
import { SelectUser } from "@/lib/drizzy/schema/users";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CircularProgress, Divider, TextField, Tooltip } from "@mui/material";
import { useFormStatus } from "react-dom";
import { ExtendedUser } from "@/next-auth";

export default function InfoItem({ value, updateData, saveData, label, pending }: {
    value: string | boolean | null | undefined, label: string, updateData: (data: string) => void, saveData: () => Promise<boolean>, pending: boolean;
}) {

    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <li className="info">
                <p className="label">{label}</p>
                <div className="value">{isEditing ? (
                    <TextField fullWidth type="text" value={value} onChange={e => { updateData(e.target.value) }} />
                ) : value}</div>

                {isEditing ? (
                    <Tooltip title="Save" className="mouse">
                        <button
                            onClick={async e => {
                                const saved = await saveData();
                                if (saved) setIsEditing(false);
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

            </li >
            <Divider component="li"></Divider>
        </>
    )
}