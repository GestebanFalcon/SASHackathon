import { sendEmail } from "../src/lib/resend";
import { test, expect } from "vitest";
import generateToken from "../src/lib/drizzy/queries/tokens/generateToken";

test("Send email with retest", async () => {
    const res = await sendEmail({ to: "gustavoestebanfalcon@gmail.com", subject: "Test :)", content: ("Super Cool test") });

    console.log(res);

    expect(!!res.data && !res.error).toBe(true);
})

test("Create verification token", async () => {
    const token = await generateToken("gustavoestebanfalcon@gmail.com");

    console.log(token);

    expect(!!token).toBe(true);
})