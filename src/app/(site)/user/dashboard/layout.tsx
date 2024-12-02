import AuthWrapper from "@/components/auth/authWrapper";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <AuthWrapper>{children}</AuthWrapper>
    )
}