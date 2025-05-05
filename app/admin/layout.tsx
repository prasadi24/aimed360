import type { ReactNode } from "react"
import { checkAuthStatus } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/dashboard/admin-sidebar"

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const { authenticated, role, userName } = await checkAuthStatus()

    if (!authenticated || role !== "Admin") {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="pl-64 transition-all duration-300">
                <header className="h-16 border-b bg-white flex items-center px-6">
                    <div className="ml-auto flex items-center gap-4">
                        <div className="text-sm">
                            Welcome, <span className="font-medium">{userName || "Admin"}</span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-medium">{userName?.[0]?.toUpperCase() || "A"}</span>
                        </div>
                    </div>
                </header>
                <main className="p-6">{children}</main>
            </div>
        </div>
    )
}
