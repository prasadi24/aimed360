"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { requestPasswordReset } from "@/app/actions/auth"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append("email", email)

            const { error, success } = await requestPasswordReset(formData)

            if (error) {
                setError(error.message)
                setIsLoading(false)
                return
            }

            setIsLoading(false)
            setIsSubmitted(true)
        } catch (err) {
            console.error("Password reset error:", err)
            setError("An unexpected error occurred. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                            <span className="font-bold text-white">A</span>
                        </div>
                        <span className="font-bold text-xl">AIMED360</span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-teal-50">
                <div className="container max-w-md">
                    <Card className="border-none shadow-xl">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
                            <CardDescription>
                                {!isSubmitted
                                    ? "Enter your email address and we'll send you a link to reset your password"
                                    : "Check your email for a link to reset your password"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-4">
                                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}

                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="email"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Email
                                        </label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            autoComplete="email"
                                            className="bg-white"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            "Send reset link"
                                        )}
                                    </Button>
                                </form>
                            ) : (
                                <div className="text-center py-4">
                                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <svg
                                            className="w-8 h-8 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 mb-4">
                                        We've sent a password reset link to <strong>{email}</strong>
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        If you don't see the email, check other places it might be, like your junk, spam, social, or other
                                        folders.
                                    </p>
                                    <Button variant="outline" className="mt-2" onClick={() => setIsSubmitted(false)}>
                                        Try another email
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Link
                                href="/login"
                                className="w-full flex items-center justify-center text-sm text-muted-foreground hover:text-foreground"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to login
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t py-4 bg-white">
                <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
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
