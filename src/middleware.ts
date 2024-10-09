import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const bearerToken = request.cookies.get("token")?.value;
    let publicRoutes = ['/login','/verify','/terms','/privacy']
    if(!bearerToken && !publicRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if(request.nextUrl.pathname == '/logout') {
        const response = NextResponse.next()
        response.cookies.delete('token')
        return response
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.ico$).*)'],
}
