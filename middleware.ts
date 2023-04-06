import { withAuth } from "next-auth/middleware"


export default withAuth(
    function middleware(req) {
        // const _token = req.nextauth.token as any as User
        // return NextResponse.rewrite(new URL("/", req.url))
        // if (req.nextUrl.pathname.startsWith("/admin") && _token?.roles?.includes(UserRoleEnum.User)) {
        //     return NextResponse.rewrite(new URL("/auth/login?message=You have not access", req.url))
        // }

        // // if (req.nextUrl.pathname.startsWith("/auth")) {
        // return NextResponse.rewrite(new URL("/", req.url))
        // // }
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