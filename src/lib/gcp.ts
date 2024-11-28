import { Storage } from "@google-cloud/storage";
import { config } from "dotenv";

config({ path: ".env.local" })

export const writeObject = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const storage = new Storage({ projectId: process.env.GCP_PROJECT_ID, apiKey: process.env.GCP_API_KEY });
    const bucketName = process.env.GCP_BUCKET_NAME || "";
    await storage.bucket(bucketName).file(file.name).save(Buffer.from(buffer));
} 