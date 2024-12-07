import Image from "next/image";
import "./page.css"
import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div className="homeContainer">
      <section className="leftContainer">
        <h1>SAS's Greatest Hackathon</h1>
        <p>SAS Greater Hackathon 2024 includes people from all SAS campuses to come together and build innovative solutions to fun problems</p>
        <Link href="/auth/register"><Button variant="contained">Sign up Now</Button></Link>
      </section>
      <section className="rightContainer"></section>

    </div>
  );
}
