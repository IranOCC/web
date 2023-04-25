import { Session as SessionType } from "./interfaces";

declare module "next-auth" {
    interface Session extends SessionType { }
}
