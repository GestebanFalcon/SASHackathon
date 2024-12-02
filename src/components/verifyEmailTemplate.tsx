import { Button } from "@mui/material";

export const VerifyEmailTemplate: React.FC<Readonly<{ link: string }>> = ({ link }: { link: string }) =>
(
  <div className="flexy outer color" >
    <section className="card">
      <h1>Verify Your Email Address</h1>
      <p>You're almost finished registering for the 2024 SAS Hackathon, just click on the link below to verify your email to start building</p>
      <a href={link}>Verify Now</a>
    </section>
  </div>
)

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);