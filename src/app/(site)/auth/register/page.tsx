'use client'
import { SignIn } from "../components/signInButton";
import "../authStyles.css"
import { FormEvent, useState } from "react";
import { UserData } from "@/types/userData";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function Page() {

    const router = useRouter();

    const [data, setData] = useState<UserData>({
        name: "",
        email: "",
        password: "",
        campus: "wolfson",

    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("test")
        const user = await fetch("/api/user/register", {
            method: "POST",
            body: JSON.stringify({ data })
        });
        router.push("/auth/login");
    }

    return (
        <div className="flexy outer">
            <section className="card ">

                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <TextField label="Full Name" type="text" value={data.name} onChange={e => { setData({ ...data, name: e.target.value }) }} />
                    <TextField label="Email" type="email" value={data.email} onChange={e => { setData({ ...data, email: e.target.value }) }} />
                    <TextField label="Password" type="password" value={data.password} onChange={e => { setData({ ...data, password: e.target.value }) }} />
                    <FormControl fullWidth={true}>
                        <InputLabel id="campusLabel">Campus</InputLabel>
                        <Select labelId="campusLabel" value={data.campus} onChange={e => { setData({ ...data, campus: e.target.value }) }}>
                            <MenuItem value="wolfson">Wolfson</MenuItem>
                            <MenuItem value="north">North</MenuItem>
                            <MenuItem value="west">West</MenuItem>
                            <MenuItem value="kendall">Kendall</MenuItem>
                            <MenuItem value="aaa">AAA</MenuItem>
                            <MenuItem value="homestead">Homestead</MenuItem>
                        </Select>
                    </FormControl>

                    <Button fullWidth type="submit" color="success" variant="contained">Submit</Button>
                </form>
                <p className="yap">Already have an account? <Link href={"/auth/login"}>Log In</Link></p>

            </section>
        </div>
    )
}