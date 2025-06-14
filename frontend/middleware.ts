import { getCurrentUser } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server"

const PUBLIC_ROUTES = [
    "/",
    "/login",
    "/sign-in",
];

const PROTECTED_ROUTES = [
    "/home",
    "/profile",
];

const middleware = async (request: NextRequest) => {
    const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname);
    const isProtectedRoute = PROTECTED_ROUTES.includes(request.nextUrl.pathname);

    if(isPublicRoute) return NextResponse.next();
    const user = await getCurrentUser();
    if(!user) NextResponse.redirect("/");
    if (isPublicRoute && request.nextUrl.pathname !== "/") {
        // Allow access to public routes
        return NextResponse.redirect("/home");
    }
    if (isProtectedRoute) {
        // Check if user is authenticated
        const user = await getCurrentUser();
        if (!user) {
            // Redirect to login if not authenticated
            return NextResponse.redirect("/");
        }
    }
    return NextResponse.next();
};

export default middleware;