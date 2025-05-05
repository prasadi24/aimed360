"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Settings,
    Package,
    CalendarClock,
    FileText,
    BarChart,
    LogOut,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { signOut } from "@/app/actions/auth"

export default function AdminSidebar() {
    const pathname = usePathname()

    const isActive = (path: string) => {
        return pathname === path || pathname?.startsWith(path + "/")
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex h-16 items-center px-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                            <span className="font-bold text-white">A</span>
                        </div>
                        <span className="font-bold text-lg">AIMED360</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/dashboard")} tooltip="Dashboard">
                            <Link href="/admin/dashboard">
                                <LayoutDashboard />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/users")} tooltip="User Management">
                            <Link href="/admin/users">
                                <Users />
                                <span>Users</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/subscriptions")} tooltip="Subscriptions">
                            <Link href="/admin/subscriptions">
                                <CreditCard />
                                <span>Subscriptions</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/subscription-features")} tooltip="Features">
                            <Link href="/admin/subscription-features">
                                <Package />
                                <span>Plan Features</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/appointments")} tooltip="Appointments">
                            <Link href="/admin/appointments">
                                <CalendarClock />
                                <span>Appointments</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/reports")} tooltip="Reports">
                            <Link href="/admin/reports">
                                <FileText />
                                <span>Reports</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/analytics")} tooltip="Analytics">
                            <Link href="/admin/analytics">
                                <BarChart />
                                <span>Analytics</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/settings")} tooltip="Settings">
                            <Link href="/admin/settings">
                                <Settings />
                                <span>Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <form
                    action={async () => {
                        await signOut()
                    }}
                >
                    <Button variant="ghost" className="w-full justify-start cursor-pointer" size="sm">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </Button>
                </form>
            </SidebarFooter>
        </Sidebar>
    )
}
