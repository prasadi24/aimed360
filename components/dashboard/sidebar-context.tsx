"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface SidebarContextType {
    isCollapsed: boolean
    toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    // Store the sidebar state in localStorage to persist between page loads
    useEffect(() => {
        const storedState = localStorage.getItem("sidebarCollapsed")
        if (storedState) {
            setIsCollapsed(storedState === "true")
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", isCollapsed.toString())
    }, [isCollapsed])

    return <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>{children}</SidebarContext.Provider>
}
