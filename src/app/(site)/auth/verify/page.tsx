'use client'
import { useSearchParams } from "next/navigation"
import VerifyEmailForm from "../components/verifyEmailForm"

export default function Page() {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    return (
        <div className=" outer">
            <VerifyEmailForm token={token} />
        </div>
    )
}