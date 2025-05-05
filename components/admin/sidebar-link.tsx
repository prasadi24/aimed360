"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface SidebarLinkProps {
    href: string
    icon: LucideIcon
    title: string
}

export function SidebarLink({ href, icon: Icon, title }: SidebarLinkProps) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white",
            )}
        >
            <Icon className="h-4 w-4" />
            {title}
        </Link>
    )
}