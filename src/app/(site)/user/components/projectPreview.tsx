"use client"

import { SelectProject } from "@/lib/drizzy/schema/projects"
import { Alert, Skeleton } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function ProjectPreview({ projectId }: { projectId: string }) {

    const [project, setProject] = useState<SelectProject | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                console.log("getting")
                const res = await fetch(`/api/projects/${projectId}/getProject`, {
                    method: "GET"
                });
                console.log(res);
                const body: { project?: SelectProject, error?: string } = await res.json();
                console.log(body);
                const { project, error } = body;
                if (project) { setProject(project) };
                // will redirect in the future to the proper page
                if (error) { setError(error) };
            } catch (err) {
                setError("Something went wrong");
                throw err;
            }
            setIsLoading(false);
        }
        getData();
    }, []);


    return (
        <section className="paper">
            <h1>Group</h1>
            <div className="flexy">
                {isLoading && (
                    <>
                        <Skeleton variant="text"></Skeleton>
                        <Skeleton variant="circular" width={40} height={40}></Skeleton>
                        <Skeleton variant="rectangular" height={60}></Skeleton>
                        <Skeleton variant="rounded" height={60}></Skeleton>
                    </>
                )}
                {project && (
                    <Link href={`/projects/${projectId}`}>
                        <h1>{project.name}</h1>
                    </Link>
                )}
                {error && (
                    <Alert>{error}</Alert>
                )}

            </div>
        </section>
    )
}