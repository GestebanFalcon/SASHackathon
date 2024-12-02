import createNewToken from "@/actions/createNewToken";
import { verifyToken } from "@/actions/verifyToken";
import { Button, Card, Dialog, FormGroup, Skeleton } from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function VerifyEmailForm({ token }: { token?: string | null }) {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [redirect, setRedirect] = useState<string | undefined>();
    const [sent, setSent] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);


    const verifyAction = useCallback(async () => {
        if (!token) return;
        try {
            const res = await verifyToken(token);
            if (res.error) {
                setError(res.error)
            }
            if (res.success) {
                setSuccess(res.success)
            }
            if (res.redirect) {
                setRedirect(res.redirect);
            }

        } catch (err) {
            setError("Something went wrong");
            setRedirect("/auth/verify");
        }
    }, []);

    const createTokenAction = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await createNewToken()
            if (res.error) { setError(res.error) };
            if (success) { setSuccess(success) };

        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
        setSent(true);
        setIsLoading(false);

    }, [])

    useEffect(() => {
        verifyAction && verifyAction();
    }, [])

    return (
        <Card>
            <section className="card">
                <h1>Verify Email</h1>
                <>
                    {token ? (
                        <>
                            {!success && !error && (
                                <>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="rounded" height={400} />
                                </>
                            )}
                            {success && (<p>{success}</p>

                            )}
                            {error && !redirect && (
                                <p>{error}</p>
                            )}
                            {error && redirect && (
                                <Link href={redirect}>{error}</Link>
                            )}
                        </>
                    ) : (
                        <>
                            {!sent ? (
                                <>
                                    {isLoading && (<Dialog open={true} />)}
                                    <Button type="submit" color="primary" variant="contained" onClick={e => { createTokenAction() }}>Send Verification Email</Button>

                                </>
                            ) : (
                                <>
                                    {isLoading && (<Dialog open={true} />)}
                                    <>
                                        {success && <p>{success}</p>}
                                        {error && <p>{error}</p>}
                                        <Button type="submit" color="success" variant="contained" onClick={e => { createTokenAction() }}> Send Again?</Button>
                                    </>

                                </>
                            )}
                        </>
                    )}
                </>
            </section>
        </Card>
    )
}