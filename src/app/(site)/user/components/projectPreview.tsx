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
                const res = await fetch(`/api/${projectId}/getProject`, {
                    method: "GET"
                });
                const { project, error }: { project?: SelectProject, error?: string } = await res.json();
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
        <section className="paper flexy">
            {isLoading && (
                <>
                    <Skeleton variant="text"></Skeleton>
                    <Skeleton variant="circular" width={40} height={40}></Skeleton>
                    <Skeleton variant="rectangular" height={60}></Skeleton>
                    <Skeleton variant="rounded" height={60}></Skeleton>
                </>
            )}
            {project && (
                <Link href={`/project/${projectId}`}>
                    <h1>{project.name}</h1>
                </Link>
            )}
            {error && (
                <Alert>{error}</Alert>
            )}


        </section>
    )
}