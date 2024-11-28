"use server"

import { auth } from "@/lib/drizzy/auth";
import { writeObject } from "@/lib/gcp";

export default async function uploadFile(formData: FormData) {

    const session = await auth();
    if (!session) { return false };

    try {
        const file = formData.get("file") as File;
        if (!file) throw new Error("No file provided");
        if (file.size < 1) throw new Error("File is empty")
        await writeObject(file);

        return true;
    } catch (error) {
        console.error(error)
        return false
    }

}