import type React from "react"
import { signOut } from "@/app/actions/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Users,
    Settings,
    CreditCard,
    LayoutDashboard,
    UserCircle,
    Tag,
    BarChart3,
    FileText,
    Bell,
    Home,
    Calendar,
} from "lucide-react"

interface DashboardLayoutProps {
    children: React.ReactNode
    role: string
    userName: string
}

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-4 border-b border-gray-800">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                            <span className="font-bold text-white">A</span>
                        </div>
                        <span className="font-bold text-xl">AIMED360</span>
                    </Link>
                </div>
                <div className="p-4 border-b border-gray-800">
                    <p className="text-sm text-gray-400">Welcome,</p>
                    <p className="font-medium truncate">{userName}</p>
                    <p className="text-xs text-gray-400 mt-1">{role}</p>
                </div>
                <nav className="flex-1 p-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">MAIN MENU</p>
                    <ul className="space-y-1">
                        <li>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                            >
                                <Home className="h-4 w-4" />
                                Main Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${role.toLowerCase()}/dashboard`}
                                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                {role} Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/profile"
                                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                            >
                                <UserCircle className="h-4 w-4" />
                                Profile
                            </Link>
                        </li>
                    </ul>

                    {/* Admin-specific navigation */}
                    {role === "Admin" && (
                        <>
                            <p className="text-xs font-semibold text-gray-500 mt-6 mb-2">ADMIN CONTROLS</p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/admin/users"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <Users className="h-4 w-4" />
                                        User Management
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/subscriptions"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <CreditCard className="h-4 w-4" />
                                        Subscriptions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/subscription-features"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <Tag className="h-4 w-4" />
                                        Subscription Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/settings"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <Settings className="h-4 w-4" />
                                        System Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/reports"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <BarChart3 className="h-4 w-4" />
                                        Reports & Analytics
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/notifications"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <Bell className="h-4 w-4" />
                                        Notifications
                                    </Link>
                                </li>
                            </ul>
                        </>
                    )}

                    {/* Doctor-specific navigation */}
                    {role === "Doctor" && (
                        <>
                            <p className="text-xs font-semibold text-gray-500 mt-6 mb-2">DOCTOR MENU</p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/doctor/patients"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <Users className="h-4 w-4" />
                                        My Patients
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/doctor/appointments"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <Calendar className="h-4 w-4" />
                                        Appointments
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/doctor/records"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <FileText className="h-4 w-4" />
                                        Medical Records
                                    </Link>
                                </li>
                            </ul>
                        </>
                    )}

                    {/* Patient-specific navigation */}
                    {role === "Patient" && (
                        <>
                            <p className="text-xs font-semibold text-gray-500 mt-6 mb-2">PATIENT MENU</p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/patient/appointments"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <Calendar className="h-4 w-4" />
                                        My Appointments
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/patient/records"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <FileText className="h-4 w-4" />
                                        Medical Records
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/patient/subscription"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        <CreditCard className="h-4 w-4" />
                                        Subscription
                                    </Link>
                                </li>
                            </ul>
                        </>
                    )}
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <form action={signOut}>
                        <Button type="submit" variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                            Sign Out
                        </Button>
                    </form>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white border-b h-16 flex items-center px-6">
                    <h1 className="text-xl font-semibold">{role} Dashboard</h1>
                </header>
                <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
            </div>
        </div>
    )
}
