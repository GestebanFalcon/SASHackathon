"use client"

import handleSignOut from "@/actions/handleSignOut";
import { signOut } from "@/lib/drizzy/auth";
import { AccountBox } from "@mui/icons-material"
import { Menu, MenuItem } from "@mui/material"
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react"

export default function ProfileButton({ session }: { session: Session }) {

    const image = session?.user?.image;

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const open = !!anchorEl

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <p></p>
            <button onClick={handleClick}>
                {image ? (
                    <img src={image} className="profilePic" />
                ) : (
                    <AccountBox color="primary" className="icon"></AccountBox>
                )}

            </button>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClose}><Link href="/user/dashboard">View Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}><button onClick={handleSignOut} className="signOutButton">Sign Out</button></MenuItem>
            </Menu>
        </>
    )
}