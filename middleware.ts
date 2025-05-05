import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // If the user is not signed in and the route is protected, redirect to login
    const isProtectedRoute =
        req.nextUrl.pathname.startsWith("/dashboard") ||
        req.nextUrl.pathname.startsWith("/admin") ||
        req.nextUrl.pathname.startsWith("/doctor") ||
        req.nextUrl.pathname.startsWith("/patient") ||
        req.nextUrl.pathname.startsWith("/nurse") ||
        req.nextUrl.pathname.startsWith("/receptionist") ||
        req.nextUrl.pathname.startsWith("/lab") ||
        req.nextUrl.pathname.startsWith("/pharmacy") ||
        req.nextUrl.pathname.startsWith("/billing") ||
        req.nextUrl.pathname.startsWith("/radiology") ||
        req.nextUrl.pathname.startsWith("/it")

    if (!session && isProtectedRoute) {
        const redirectUrl = new URL("/login", req.url)
        redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
    }

    // If user is signed in and accessing the dashboard, redirect to role-specific dashboard
    if (session && req.nextUrl.pathname === "/dashboard") {
        // Get user role from user_roles table
        const { data: userRole } = await supabase
            .from("user_roles")
            .select("role_id")
            .eq("user_id", session.user.id)
            .single()

        if (userRole) {
            // Get role name
            const { data: role } = await supabase.from("roles").select("name").eq("id", userRole.role_id).single()

            if (role) {
                switch (role.name) {
                    case "Admin":
                        return NextResponse.redirect(new URL("/admin/dashboard", req.url))
                    case "Doctor":
                        return NextResponse.redirect(new URL("/doctor/dashboard", req.url))
                    case "Nurse":
                        return NextResponse.redirect(new URL("/nurse/dashboard", req.url))
                    case "Patient":
                        return NextResponse.redirect(new URL("/patient/dashboard", req.url))
                    case "Receptionist":
                        return NextResponse.redirect(new URL("/receptionist/dashboard", req.url))
                    case "Lab Technician":
                        return NextResponse.redirect(new URL("/lab/dashboard", req.url))
                    case "Pharmacist":
                        return NextResponse.redirect(new URL("/pharmacy/dashboard", req.url))
                    case "Billing Specialist":
                        return NextResponse.redirect(new URL("/billing/dashboard", req.url))
                    case "Radiologist":
                        return NextResponse.redirect(new URL("/radiology/dashboard", req.url))
                    case "IT Support":
                        return NextResponse.redirect(new URL("/it/dashboard", req.url))
                }
            }
        }
    }

    return res
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
