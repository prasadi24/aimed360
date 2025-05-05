import type { ReactNode } from "react"
import { checkAuthStatus } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import { AdminWrapper } from "@/components/dashboard/admin-wrapper"

export default async function AdminLayoutWrapper({ children }: { children: ReactNode }) {
    const { authenticated, role, userName } = await checkAuthStatus()

    if (!authenticated || role !== "Admin") {
        redirect("/login")
    }

    return <AdminWrapper userName={userName}>{children}</AdminWrapper>
}
