"use client"

import type { ReactNode } from "react"
import { useSidebar } from "./sidebar-context"
import { cn } from "@/lib/utils"

export function AdminLayout({
    children,
    userName,
}: {
    children: ReactNode
    userName?: string | null
}) {
    const { isCollapsed } = useSidebar()

    return (
        <div className={cn("transition-all duration-300", isCollapsed ? "ml-16" : "ml-64")}>
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
    )
}
