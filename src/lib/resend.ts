import { Resend } from 'resend';
import { config } from 'dotenv';

config({ path: ".env.local" });

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async () => {
    try {
        const res = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'gustavoestebanfalcon@gmail.com',
            subject: 'Verify Email',
            html: `<p>test</p>`
        });
        return res;
    } catch (error) {
        return { error: "Something went wrong", data: undefined };
    }
}