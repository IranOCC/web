import axiosSSR from "@/lib/axiosSSR"
import { LoginPhoneOtpFormData } from "@/types/formsData"
import { User } from "@/types/interfaces"
import NextAuth, { NextAuthOptions, Session, } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "otp",
            name: "",
            credentials: {
                phone: { label: "Phone", type: "text" },
                token: { label: "Token", type: "text" }
            },
            async authorize(credentials, req) {
                const data = credentials as LoginPhoneOtpFormData
                const response = await axiosSSR.post("/auth/loginByPhoneOtp", data)
                if (response.status >= 400) return null
                return response.data
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {

        signIn: "/auth",
        error: "/auth/error"
    },
    callbacks: {
        async jwt({ token, user, trigger, session }: any) {
            if (trigger === "update" && session?.user) {
                // const t = token as Session
                // token.user = { ...token.email, ...session.user }
            }
            return ({ ...token, ...user })
        },
        async session({ session, token, user }: any) {
            const t = token as any as Session
            session.user = t.user;
            session.accessToken = t.accessToken;
            return session;
        },
    }
}
export default NextAuth(authOptions)

