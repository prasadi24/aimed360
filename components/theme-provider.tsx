"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    // Force the defaultTheme to be "light" and disable system theme detection
    return (
        <NextThemesProvider
            {...props}
            defaultTheme="light"
            enableSystem={false}
            attribute="class"
            enableColorScheme={false} // Add this
        >
            {children}
        </NextThemesProvider>
    )
}