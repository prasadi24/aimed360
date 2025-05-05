"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export type AuthError = {
    message: string
}

export async function signIn(formData: FormData): Promise<{ error: AuthError | null; redirectTo?: string }> {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: { message: error.message } }
    }

    // Get user role immediately after login
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
        return { error: { message: "Authentication failed" } }
    }

    // Get user role from user_roles table
    const { data: userRole } = await supabase.from("user_roles").select("role_id").eq("user_id", session.user.id).single()

    if (!userRole) {
        return { error: null, redirectTo: "/dashboard" }
    }

    // Get role name
    const { data: role } = await supabase.from("roles").select("name").eq("id", userRole.role_id).single()

    if (!role) {
        return { error: null, redirectTo: "/dashboard" }
    }

    // Return the appropriate redirect URL based on role
    switch (role.name) {
        case "Admin":
            return { error: null, redirectTo: "/admin/dashboard" }
        case "Doctor":
            return { error: null, redirectTo: "/doctor/dashboard" }
        case "Nurse":
            return { error: null, redirectTo: "/nurse/dashboard" }
        case "Patient":
            return { error: null, redirectTo: "/patient/dashboard" }
        case "Receptionist":
            return { error: null, redirectTo: "/receptionist/dashboard" }
        case "Lab Technician":
            return { error: null, redirectTo: "/lab/dashboard" }
        case "Pharmacist":
            return { error: null, redirectTo: "/pharmacy/dashboard" }
        case "Billing Specialist":
            return { error: null, redirectTo: "/billing/dashboard" }
        case "Radiologist":
            return { error: null, redirectTo: "/radiology/dashboard" }
        case "IT Support":
            return { error: null, redirectTo: "/it/dashboard" }
        default:
            return { error: null, redirectTo: "/dashboard" }
    }
}

export async function signOut(): Promise<void> {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/")
}

export async function getUserRole(): Promise<string | null> {
    const supabase = await createClient()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
        return null
    }

    // Get user role from user_roles table
    const { data: userRole } = await supabase.from("user_roles").select("role_id").eq("user_id", session.user.id).single()

    if (!userRole) {
        return null
    }

    // Get role name
    const { data: role } = await supabase.from("roles").select("name").eq("id", userRole.role_id).single()

    return role?.name || null
}

export async function redirectBasedOnRole(): Promise<void> {
    const role = await getUserRole()

    if (!role) {
        redirect("/login")
        return
    }

    switch (role) {
        case "Admin":
            redirect("/admin/dashboard")
            break
        case "Doctor":
            redirect("/doctor/dashboard")
            break
        case "Nurse":
            redirect("/nurse/dashboard")
            break
        case "Patient":
            redirect("/patient/dashboard")
            break
        case "Receptionist":
            redirect("/receptionist/dashboard")
            break
        case "Lab Technician":
            redirect("/lab/dashboard")
            break
        case "Pharmacist":
            redirect("/pharmacy/dashboard")
            break
        case "Billing Specialist":
            redirect("/billing/dashboard")
            break
        case "Radiologist":
            redirect("/radiology/dashboard")
            break
        case "IT Support":
            redirect("/it/dashboard")
            break
        default:
            redirect("/dashboard")
    }
}

// Registration function
export async function signUp(formData: FormData): Promise<{ error: AuthError | null; success?: boolean }> {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string

    const supabase = await createClient()

    // Create the user account
    const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
            },
        },
    })

    if (signUpError) {
        return { error: { message: signUpError.message } }
    }

    // By default, assign the user to the "Patient" role
    // First, get the role ID for "Patient"
    const { data: patientRole } = await supabase.from("roles").select("id").eq("name", "Patient").single()

    if (patientRole && data.user) {
        // Assign the role to the user
        await supabase.from("user_roles").insert({
            user_id: data.user.id,
            role_id: patientRole.id,
        })
    }

    return { error: null, success: true }
}

// Password reset request
export async function requestPasswordReset(
    formData: FormData,
): Promise<{ error: AuthError | null; success?: boolean }> {
    const email = formData.get("email") as string
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    })

    if (error) {
        return { error: { message: error.message } }
    }

    return { error: null, success: true }
}

// Password reset completion
export async function resetPassword(formData: FormData): Promise<{ error: AuthError | null; success?: boolean }> {
    const password = formData.get("password") as string
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
        password,
    })

    if (error) {
        return { error: { message: error.message } }
    }

    return { error: null, success: true }
}

// Check authentication status
export async function checkAuthStatus(): Promise<{
    authenticated: boolean
    role: string | null
    userName: string | null
    user: any | null
}> {
    const supabase = await createClient()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        return { authenticated: false, role: null, userName: null, user: null }
    }

    try {
        // Get user role from user_roles table
        const { data: userRole, error: userRoleError } = await supabase
            .from("user_roles")
            .select("role_id")
            .eq("user_id", session.user.id)
            .single()

        if (userRoleError || !userRole) {
            console.error("Error fetching user role:", userRoleError)
            return { authenticated: true, role: null, userName: null, user: session.user }
        }

        // Get role name
        const { data: role, error: roleError } = await supabase
            .from("roles")
            .select("name")
            .eq("id", userRole.role_id)
            .single()

        if (roleError || !role) {
            console.error("Error fetching role name:", roleError)
            return { authenticated: true, role: null, userName: null, user: session.user }
        }

        // Get user name
        const user = session.user
        const metadata = user.user_metadata || {}
        const displayName = metadata.first_name ? `${metadata.first_name} ${metadata.last_name || ""}` : user.email || ""

        return {
            authenticated: true,
            role: role.name,
            userName: displayName,
            user: session.user,
        }
    } catch (error) {
        console.error("Unexpected error in checkAuthStatus:", error)
        return { authenticated: true, role: null, userName: null, user: session.user }
    }
}