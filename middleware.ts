import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { Session, } from "./types/interfaces"
import { UserRoles } from "./types/enum"

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
    function middleware(req) {
        const _token = req.nextauth.token as any as Session
        const myRoles = _token.user.roles
        const path = req.nextUrl.pathname

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
        // ==> DASHBOARD
        if (false && path.startsWith(dashboardPrefix)) {
            if (path !== "/dashboard/profile") {
                const redirect = "/dashboard/profile" + "?section=info&error=ابتدا پروفایل خود را تکمیل کنید"
                return NextResponse.rewrite(new URL(redirect, req.url))
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
