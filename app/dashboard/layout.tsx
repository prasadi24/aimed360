import type React from "react"
import { signOut, checkAuthStatus } from "@/app/actions/auth"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { role } = await checkAuthStatus()

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white border-b">
                <div className="container mx-auto flex justify-between items-center h-16 px-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                            <span className="font-bold text-white">A</span>
                        </div>
                        <span className="font-bold text-xl">AIMED360</span>
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                            Dashboard
                        </Link>

                        {/* Admin Navigation Dropdown */}
                        {role === "Admin" && (
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-md">
                                    <ShieldCheck className="h-4 w-4" />
                                    Admin
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                    <div className="py-1">
                                        <Link href="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Admin Dashboard
                                        </Link>
                                        <Link href="/admin/users" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            User Management
                                        </Link>
                                        <Link
                                            href="/admin/subscriptions"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Subscriptions
                                        </Link>
                                        <Link
                                            href="/admin/subscription-features"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Subscription Features
                                        </Link>
                                        <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            System Settings
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Link href="/dashboard/profile" className="text-sm font-medium hover:text-primary">
                            Profile
                        </Link>
                        <form action={signOut}>
                            <button type="submit" className="text-sm font-medium hover:text-primary">
                                Sign Out
                            </button>
                        </form>
                    </nav>
                </div>

                {/* Admin Quick Access Bar */}
                {role === "Admin" && (
                    <div className="bg-blue-50 border-b border-blue-100">
                        <div className="container mx-auto flex items-center gap-4 px-4 py-2 overflow-x-auto">
                            <span className="text-xs font-semibold text-blue-700 whitespace-nowrap">ADMIN QUICK ACCESS:</span>
                            <Link
                                href="/admin/dashboard"
                                className="text-xs font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap"
                            >
                                Dashboard
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link
                                href="/admin/users"
                                className="text-xs font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap"
                            >
                                Users
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link
                                href="/admin/subscriptions"
                                className="text-xs font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap"
                            >
                                Subscriptions
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link
                                href="/admin/subscription-features"
                                className="text-xs font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap"
                            >
                                Features
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link
                                href="/admin/settings"
                                className="text-xs font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap"
                            >
                                Settings
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link
                                href="/admin/reports"
                                className="text-xs font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap"
                            >
                                Reports
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-1 bg-gray-50">{children}</main>

            <footer className="border-t py-4 bg-white">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} AIMED360. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                            Terms
                        </Link>
                        <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                            Privacy
                        </Link>
                        <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
