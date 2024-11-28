import { Storage } from "@google-cloud/storage";
import { config } from "dotenv";

config({ path: ".env.local" })

export const writeObject = async (file: File | Buffer) => {
    let buffer;
    let name;
    if (file instanceof Buffer) {
        buffer = file;
        name = "test"
    } else {
        const arrayBuffer = await file.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);
        name = file.name;
    }

    const dbUrl = process.env.DATABASE_URL;
    const projectId = process.env.GCS_PROJECT_ID;
    const apiKey = process.env.GCP_API_KEY;
    const bucketName = process.env.GCS_BUCKET_NAME || "test";

    const storage = new Storage({ apiKey });


    console.log(`bucket: ${bucketName}; ID: ${projectId}; apiKey: ${apiKey}; dbUrl: ${dbUrl}`);

    await storage.bucket("sas_hackathon_bucket").file(name).save(buffer);
} 