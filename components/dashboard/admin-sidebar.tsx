"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    Users,
    Settings,
    CreditCard,
    LayoutDashboard,
    ClipboardList,
    Shield,
    Bell,
    FileText,
    BarChart3,
    UserCog,
    LogOut,
    Bot,
    ChevronRight,
    Menu,
    Stethoscope,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "@/app/actions/auth"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-context"

interface SidebarLinkProps {
    href: string
    icon: React.ReactNode
    title: string
    isActive: boolean
    isCollapsed: boolean
}

function SidebarLink({ href, icon, title, isActive, isCollapsed }: SidebarLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                "sidebar-link flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer",
                isActive
                    ? "bg-gradient-to-r from-blue-600/20 to-teal-500/20 text-primary"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white",
            )}
            title={isCollapsed ? title : undefined}
        >
            <div className="flex h-6 w-6 items-center justify-center">{icon}</div>
            {!isCollapsed && <span className="font-medium">{title}</span>}
            {!isCollapsed && isActive && <ChevronRight className="ml-auto h-4 w-4" />}
        </Link>
    )
}

export function AdminSidebar() {
    const pathname = usePathname()
    const { isCollapsed, toggleSidebar } = useSidebar()

    const adminLinks = [
        {
            title: "Dashboard",
            href: "/admin/dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
            title: "User Management",
            href: "/admin/users",
            icon: <Users className="h-5 w-5" />,
        },
        {
            title: "Doctors",
            href: "/admin/doctors",
            icon: <Stethoscope className="h-5 w-5" />,
        },
        {
            title: "AI Management",
            href: "/admin/ai-management",
            icon: <Bot className="h-5 w-5" />,
        },
        {
            title: "Subscription Plans",
            href: "/admin/subscriptions",
            icon: <CreditCard className="h-5 w-5" />,
        },
        {
            title: "Subscription Features",
            href: "/admin/subscription-features",
            icon: <ClipboardList className="h-5 w-5" />,
        },
        {
            title: "System Settings",
            href: "/admin/settings",
            icon: <Settings className="h-5 w-5" />,
        },
        {
            title: "Security",
            href: "/admin/security",
            icon: <Shield className="h-5 w-5" />,
        },
        {
            title: "Notifications",
            href: "/admin/notifications",
            icon: <Bell className="h-5 w-5" />,
        },
        {
            title: "Reports",
            href: "/admin/reports",
            icon: <FileText className="h-5 w-5" />,
        },
        {
            title: "Analytics",
            href: "/admin/analytics",
            icon: <BarChart3 className="h-5 w-5" />,
        },
        {
            title: "Role Management",
            href: "/admin/roles",
            icon: <UserCog className="h-5 w-5" />,
        },
    ]

    return (
        <div
            className={cn(
                "fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 text-white transition-all duration-300 overflow-hidden",
                isCollapsed ? "w-16 sidebar-collapsed" : "w-64 sidebar-expanded",
            )}
        >
            <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                            <span className="font-bold text-white">A</span>
                        </div>
                        <span className="font-bold text-xl">AIMED360</span>
                    </div>
                )}
                {isCollapsed && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center mx-auto">
                        <span className="font-bold text-white">A</span>
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="sidebar-link text-gray-400 hover:text-white cursor-pointer"
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {!isCollapsed && (
                <div className="p-4 border-b border-gray-800">
                    <p className="text-sm text-gray-400">Admin Panel</p>
                </div>
            )}

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-2">
                    {adminLinks.map((link) => (
                        <li key={link.href}>
                            <SidebarLink
                                href={link.href}
                                icon={link.icon}
                                title={link.title}
                                isActive={pathname === link.href}
                                isCollapsed={isCollapsed}
                            />
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-800">
                <form action={signOut}>
                    <Button
                        type="submit"
                        variant="ghost"
                        className={cn(
                            "sidebar-link w-full flex items-center gap-2 text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer",
                            isCollapsed && "justify-center",
                        )}
                        title={isCollapsed ? "Sign Out" : undefined}
                    >
                        <LogOut className="h-5 w-5" />
                        {!isCollapsed && <span>Sign Out</span>}
                    </Button>
                </form>
            </div>
        </div>
    )
}
