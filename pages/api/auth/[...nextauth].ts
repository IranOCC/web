import axiosSSR from "@/lib/axiosSSR"
import { LoginFormData, LoginByOtpFormData } from "@/types/formsData"
import { LoginUser, User, UserRoleEnum } from "@/types/interfaces"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "general",
            name: "",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const data = credentials as LoginFormData
                const response = await axiosSSR.post("/auth/login", data)
                const user = response.data as User
                if (!user) return null
                return user
            }
        }),
        CredentialsProvider({
            id: "otp",
            name: "",
            credentials: {
                phone: { label: "Phone", type: "text" },
                token: { label: "Token", type: "text" }
            },
            async authorize(credentials, req) {
                const data = credentials as LoginByOtpFormData
                const response = await axiosSSR.post("/auth/loginByOtp", data)
                if (response.status >= 400) return null
                return response.data as User
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    callbacks: {
        async jwt({ token, user }) {
            return ({ ...token, ...user })
        },
        async session({ session, token, user }) {
            // const { sub, iat, exp, jti, ...sesUser } = token as any
            const t = token as any as LoginUser
            session.user = t.user;
            session.accessToken = t.accessToken;
            return session;
        },
    }
}
export default NextAuth(authOptions)

