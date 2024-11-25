import AuthWrapper from "@/components/authWrapper";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <AuthWrapper>{children}</AuthWrapper>
    )
}