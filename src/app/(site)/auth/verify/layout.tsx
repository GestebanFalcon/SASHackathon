import { CircularProgress } from "@mui/material";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<CircularProgress />}>
            {children}
        </Suspense>
    )
}