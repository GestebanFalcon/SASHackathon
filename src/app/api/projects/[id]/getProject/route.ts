import getProjectById from "@/lib/drizzy/queries/projects/getProjectById";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const projectId = (await params).id;
    if (!projectId) {
        return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const project = await getProjectById(projectId);

    if (!project) {
        return NextResponse.json({ error: "Project does not exist" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });


}