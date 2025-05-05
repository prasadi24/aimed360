import type { User } from "@supabase/supabase-js"

// Function to get display name from user
export function getDisplayName(user: User): string {
    if (!user) return ""

    // Safely access user metadata
    const metadata = user.user_metadata
    if (
        metadata &&
        typeof metadata === "object" &&
        metadata !== null &&
        "first_name" in metadata &&
        typeof metadata.first_name === "string"
    ) {
        const firstName = metadata.first_name
        const lastName = (metadata.last_name as string) || ""
        return `${firstName} ${lastName}`.trim()
    }

    return user.email || ""
}

// Function to check if user is admin using API route
export async function checkIsAdmin(userId: string): Promise<boolean> {
    try {
        // Call our API route to check admin status
        const response = await fetch("/api/check-admin")

        if (!response.ok) {
            console.error("Error checking admin status: API returned status", response.status)
            return false
        }

        const data = await response.json()
        return data.isAdmin
    } catch (error) {
        console.error("Unexpected error checking admin status:", error)
        return false
    }
}
