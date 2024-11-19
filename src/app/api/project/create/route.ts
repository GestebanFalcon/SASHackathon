import insertProject from "@/drizzy/queries/projects/insertProject";
import getUserById from "@/drizzy/queries/users/getUserById";
import updateUser from "@/drizzy/queries/users/updateUser";
import { SelectUser } from "@/drizzy/schema/users";
import { InsertProject } from "@/drizzy/schema/projects";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const { data, userId }: { data: InsertProject, userId: SelectUser["id"] } = await req.json();
        const { name } = data;
        if (!name || !userId) {
            return NextResponse.json({ error: "Error: Missing data" }, { status: 400 });
        }
        const project = await insertProject(data);
        const user = await getUserById(userId);
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 404 });
        }
        const updatedUser = {
            ...user,
            projectId: project.id,
            projectAdmin: true,
        }
        await updateUser(updatedUser.id, updatedUser);

        return NextResponse.json({ project }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }



}