"use client"

import type React from "react"
import AdminSidebar from "./new-sidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gray-100">
                <AdminSidebar />
                <SidebarInset className="bg-white">
                    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4">
                        <SidebarTrigger className="mr-4" />
                        <h1 className="text-xl font-semibold">Admin Panel</h1>
                    </header>
                    <div className="p-6">{children}</div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}

export default Layout
