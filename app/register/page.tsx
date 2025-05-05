"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { signUp } from "@/app/actions/auth"
import { useRouter, useSearchParams } from "next/navigation"
import { MedicalLoader } from "@/components/ui/loader"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const planId = searchParams.get("plan")

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await signUp(formData)

            if (error) {
                setError(error.message)
                setIsLoading(false)
                return
            }

            // Redirect to the verification page
            router.push("/register/verify")
        } catch (err) {
            console.error("Registration error:", err)
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
                <div className="container max-w-6xl flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
                    {/* Registration Form */}
                    <div className="w-full md:w-1/2 max-w-md mx-auto">
                        <Card className="border-none shadow-xl">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                                <CardDescription>Enter your information to create an account</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-4">
                                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm">{error}</p>
                                    </div>
                                )}
                                <form action={handleSubmit} className="space-y-4">
                                    {/* Hidden plan ID if coming from subscription page */}
                                    {planId && <input type="hidden" name="planId" value={planId} />}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="firstName"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                First Name
                                            </label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                placeholder="John"
                                                required
                                                autoComplete="given-name"
                                                className="bg-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="lastName"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Last Name
                                            </label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Doe"
                                                required
                                                autoComplete="family-name"
                                                className="bg-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="email"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Email
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            required
                                            autoComplete="email"
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="password"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                required
                                                autoComplete="new-password"
                                                className="pr-10 bg-white"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                onClick={() => setShowPassword(!showPassword)}
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="role"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            I am a
                                        </label>
                                        <select
                                            id="role"
                                            name="role"
                                            className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            required
                                        >
                                            <option value="">Select your role</option>
                                            <option value="Patient">Patient</option>
                                            <option value="Doctor">Doctor</option>
                                            <option value="Nurse">Nurse</option>
                                            <option value="Admin">Administrator</option>
                                            <option value="Staff">Staff</option>
                                        </select>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <MedicalLoader size={24} className="mr-2" />
                                                <span>Creating account...</span>
                                            </div>
                                        ) : (
                                            <>
                                                Create account
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4">
                                <div className="relative w-full">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t"></span>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-muted-foreground">Or</span>
                                    </div>
                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                                        Sign in
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Illustration */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="max-w-md relative h-64 md:h-[450px] w-full">
                            <Image
                                src="/register-illustration.svg"
                                alt="Healthcare Registration"
                                fill
                                className="object-contain"
                                priority
                            />
                            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 z-10">
                                <p className="text-sm font-medium text-gray-900">Join Our Healthcare Network</p>
                                <p className="text-xs text-muted-foreground">Secure, Reliable, Professional</p>
                            </div>
                        </div>
                    </div>
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
