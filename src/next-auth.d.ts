import { DefaultSession } from "next-auth";
import { User } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    campus?: string | null,
    projectId?: string | null,
    projectAdmin?: boolean | null

};

declare module "next-auth" {

    interface Session {
        user: ExtendedUser
    }


}


import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {

    interface JWT {
        campus?: string,
        projectId?: string,
        projectAdmin?: boolean,

    }
}