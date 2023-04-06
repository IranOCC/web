import { LoginUser, User } from "./interfaces";

declare module "next-auth" {
    interface Session {
        accessToken: string,
        user: User,
    }
}
