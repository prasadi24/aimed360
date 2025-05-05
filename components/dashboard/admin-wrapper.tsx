"use client"

import type { ReactNode } from "react"
import { SidebarProvider } from "./sidebar-context"
import { AdminSidebar } from "./admin-sidebar"
import { AdminLayout } from "./admin-layout"

export function AdminWrapper({
    children,
    userName,
}: {
    children: ReactNode
    userName?: string | null
}) {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-gray-100">
                <AdminSidebar />
                <AdminLayout userName={userName}>{children}</AdminLayout>
            </div>
        </SidebarProvider>
    )
}
