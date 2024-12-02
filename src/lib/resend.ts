import { Resend } from 'resend';
import { config } from 'dotenv';
import { ReactNode } from 'react';
import { EmailTemplate, VerifyEmailTemplate } from '@/components/verifyEmailTemplate';

config({ path: ".env.local" });

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, content }: { to: string, subject: string, content: ReactNode }) => {
    try {
        const res = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject,
            react: content

        });
        return res;
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong", data: undefined };
    }
}

export const sendVerifyEmail = async ({ to, token }: { to: string, token: string }) => {
    const res = await sendEmail({
        to,
        subject: "Verify Email",
        content: VerifyEmailTemplate({ link: `${process.env.SERVER_URL}/auth/verify?token=${token}` })
    });
    return res;
} 