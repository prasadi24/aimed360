import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
    try {
        const supabase = await createClient()

        // Get current session
        const { data: sessionData } = await supabase.auth.getSession()

        if (!sessionData.session) {
            return NextResponse.json({ error: "No active session found" }, { status: 401 })
        }

        const userId = sessionData.session.user.id

        // Get user role from user_roles table - with detailed error handling
        const { data: userRole, error: userRoleError } = await supabase
            .from("user_roles")
            .select("role_id")
            .eq("user_id", userId)
            .single()

        if (userRoleError) {
            return NextResponse.json(
                {
                    error: "Error fetching user role",
                    details: userRoleError,
                    userId,
                    tables: {
                        user_roles: "Check if this table exists and has the correct schema",
                    },
                },
                { status: 500 },
            )
        }

        if (!userRole) {
            // Check if the user exists in the user_roles table at all
            const { data: userRoleCheck } = await supabase.from("user_roles").select("user_id").eq("user_id", userId)

            return NextResponse.json(
                {
                    error: "No role assigned to user",
                    userId,
                    userRoleCheck: userRoleCheck || [],
                    suggestion: "User needs a role assignment in the user_roles table",
                },
                { status: 404 },
            )
        }

        // Get role name
        const { data: role, error: roleError } = await supabase
            .from("roles")
            .select("*")
            .eq("id", userRole.role_id)
            .single()

        if (roleError) {
            return NextResponse.json(
                {
                    error: "Error fetching role details",
                    details: roleError,
                    roleId: userRole.role_id,
                    tables: {
                        roles: "Check if this table exists and has the correct schema",
                    },
                },
                { status: 500 },
            )
        }

        // Get all roles for reference
        const { data: allRoles } = await supabase.from("roles").select("*")

        // Return comprehensive debug information
        return NextResponse.json({
            success: true,
            user: {
                id: userId,
                email: sessionData.session.user.email,
                metadata: sessionData.session.user.user_metadata,
            },
            role: role || null,
            roleId: userRole.role_id,
            allRoles: allRoles || [],
            tables: {
                user_roles: "user_id, role_id",
                roles: "id, name, description",
            },
            suggestion: role ? `User has role: ${role.name}` : "Role ID exists but no matching role found",
        })
    } catch (error) {
        return NextResponse.json(
            {
                error: "Unexpected error",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        )
    }
}
