import { NextRequest, NextResponse } from "next/server";
import { UserData } from "@/types/userData";
import bcrypt from "bcrypt";
import insertUser from "@/lib/drizzy/queries/users/insertUser";

export async function POST(req: NextRequest) {
    const { data }: { data: UserData } = await req.json();
    const { name, campus, password, email } = data;

    if (!name || !campus || !password || !email) {
        return NextResponse.json({ error: "you smell AND I hate you" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await insertUser({ name, campus, hashedPassword, email });

    return NextResponse.json({ user }, { status: 201 });

}