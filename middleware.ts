import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { Session, } from "./types/interfaces"
import { UserRoles } from "./types/enum"
import axiosSSR from "./lib/axiosSSR";
import { fetchMe, fetchWebInfo } from "./lib/ssr.fetch";
import { getServerSession } from "next-auth";
import { authOptions } from "./pages/api/auth/[...nextauth]";

const adminPrefix = "/admin";
const adminRoutes = [
    // # user
    {
        url: "user/add",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    },
    {
        url: "user/*",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    },
    {
        url: "user",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    },
    // # office
    {
        url: "office/add",
        roles: [UserRoles.SuperAdmin],
    },
    {
        url: "office/*",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    },
    {
        url: "office",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    },
    // # estate
    {
        url: "estate/category",
        roles: [UserRoles.SuperAdmin],
    },
    {
        url: "estate/type",
        roles: [UserRoles.SuperAdmin],
    },
    {
        url: "estate/document",
        roles: [UserRoles.SuperAdmin],
    },
    {
        url: "estate/feature",
        roles: [UserRoles.SuperAdmin],
    },
    {
        url: "estate/add",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent],
    },
    {
        url: "estate/*",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent],
    },
    {
        url: "estate",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent],
    },
    // # blog
    {
        url: "blog/category",
        roles: [UserRoles.SuperAdmin],
    },
    {
        url: "blog/comment",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Author],
    },
    {
        url: "blog/add",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Author],
    },
    {
        url: "blog/*",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Author],
    },
    {
        url: "blog",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Author],
    },
    // # page
    {
        url: "page/add",
        roles: [UserRoles.SuperAdmin],
    },
    {
        url: "page/*",
        roles: [UserRoles.SuperAdmin],
    },
    {
        url: "page",
        roles: [UserRoles.SuperAdmin],
    },
    // # media
    {
        url: "media/icon",
        roles: [UserRoles.SuperAdmin],
    },
    {
        url: "media/upload",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent, UserRoles.Author],
    },
    {
        url: "media",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent, UserRoles.Author],
    },
    // # report
    {
        url: "report",
        roles: [UserRoles.SuperAdmin],
    },
    // # setting
    {
        url: "setting",
        roles: [UserRoles.SuperAdmin],
    },
]

const dashboardPrefix = "/dashboard";


export default withAuth(
    async function middleware(req) {
        const _token = req.nextauth.token as any as Session
        const myRoles = _token.user.roles
        const path = req.nextUrl.pathname

        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth", { headers: { "Authorization": `Bearer ${_token.accessToken}` } });
        const me = await res.json();


        if (!me.firstName && !me.lastName) {
            // ==> DASHBOARD
            if (path.startsWith(adminPrefix) || path.startsWith(dashboardPrefix)) {
                if (path !== "/dashboard/profile") {
                    const redirect = "/dashboard/profile" + "?section=info&error=ابتدا پروفایل خود را تکمیل کنید"
                    return NextResponse.rewrite(new URL(redirect, req.url))
                }
            }
        }
        // ==> ADMIN
        if (path.startsWith(adminPrefix)) {
            const redirect = adminPrefix + "?error=شما دسترسی به این صفحه ندارید"
            for (let i = 0; i < adminRoutes.length; i++) {
                let _url = adminRoutes[i].url
                if (adminRoutes[i].url.endsWith("/*")) {
                    _url = adminRoutes[i].url.substring(0, _url.length - 1)
                }
                if (path.startsWith(adminPrefix + "/" + _url)) {
                    if (!adminRoutes[i].roles.some((role) => myRoles.includes(role))) {
                        return NextResponse.rewrite(new URL(redirect, req.url))
                    }
                }
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        }
    }
)

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*", "/panel/:path*", "/user/:path*",]
}
