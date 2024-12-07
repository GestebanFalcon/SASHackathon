import { Storage } from "@google-cloud/storage";
import { config } from "dotenv";
import { getVercelOidcToken } from "@vercel/functions/oidc";

config({ path: ".env.local" });

const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;
const GCP_PROJECT_NUMBER = process.env.GCP_PROJECT_NUMBER;
const GCP_SERVICE_ACCOUNT_EMAIL = process.env.GCP_SERVICE_ACCOUNT_EMAIL;
const GCP_WORKLOAD_IDENTITY_POOL_ID = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID;
const GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID =
    process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;



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

    const storage = new Storage({
        projectId: GCP_PROJECT_ID,
        credentials: {
            type: 'external_account',
            audience: `//iam.googleapis.com/projects/${GCP_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${GCP_WORKLOAD_IDENTITY_POOL_ID}/providers/${GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
            subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
            token_url: 'https://sts.googleapis.com/v1/token',
            service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,
            subject_token_supplier: {
                // Use the Vercel OIDC token as the subject token
                getSubjectToken: getVercelOidcToken,
            },
        }
    });


    console.log(`bucket: ${bucketName}; ID: ${projectId}; apiKey: ${apiKey}; dbUrl: ${dbUrl}`);

    await storage.bucket("sas_hackathon_bucket").file(name).save(buffer);
} 