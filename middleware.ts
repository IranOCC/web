import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { Session, } from "./types/interfaces"


export default withAuth(
    function middleware(req) {
        const _token = req.nextauth.token as any as Session
        const p = req.nextUrl.pathname
        const r = _token.user?.roles
        const panelAccess = r?.includes("SuperAdmin") || r?.includes("Admin") || r?.includes("Agent") || r?.includes("Author")
        if ((p.startsWith("/admin") || p.startsWith("/panel")) && !panelAccess) {
            return NextResponse.rewrite(new URL("/?message=You have not access", req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        }
    }
)

export const config = {
    // matcher: []
    matcher: ["/admin/:path*", "/dashboard/:path*", "/panel/:path*", "/user/:path*",]
}