"use client"

import { SelectProject } from "@/lib/drizzy/schema/projects"
import { Input, List, ListItem } from "@mui/material";
import { useState } from "react";

export default function ProjectsList({ projects }: { projects: SelectProject[] }) {

    const [filter, setFilter] = useState("");


    return (
        <section className="paper">
            <Input onChange={(e) => { setFilter(e.target.value) }} value={filter} />
            <List>
                {
                    projects.map(project => (
                        <ListItem>{project.name}</ListItem>
                    ))
                }

            </List>
        </section>
    )
}