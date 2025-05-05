import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        // Await the createClient function to get the Supabase client
        const supabase = await createClient()

        // Get the current session
        const {
            data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
            return NextResponse.json({ isAdmin: false }, { status: 401 })
        }

        const userId = session.user.id

        // Get user role
        const { data: userRole, error: userRoleError } = await supabase
            .from("user_roles")
            .select("role_id")
            .eq("user_id", userId)
            .single()

        if (userRoleError || !userRole) {
            console.error("Error fetching user role:", userRoleError)
            return NextResponse.json({ isAdmin: false }, { status: 200 })
        }

        // Get role name
        const { data: role, error: roleError } = await supabase
            .from("roles")
            .select("name")
            .eq("id", userRole.role_id)
            .single()

        if (roleError || !role) {
            console.error("Error fetching role:", roleError)
            return NextResponse.json({ isAdmin: false }, { status: 200 })
        }

        const isAdmin = role.name === "Admin"

        return NextResponse.json({ isAdmin }, { status: 200 })
    } catch (error) {
        console.error("Unexpected error checking admin status:", error)
        return NextResponse.json({ isAdmin: false }, { status: 500 })
    }
}
