"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface Plan {
    id: string
    name: string
    price: number
}

export default function PatientRegistrationPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedPlanId = searchParams.get("plan")

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [mobile, setMobile] = useState("")
    const [maritalStatus, setMaritalStatus] = useState("")
    const [address, setAddress] = useState("")
    const [subscriptionType, setSubscriptionType] = useState(selectedPlanId || "")
    const [agentName, setAgentName] = useState("")
    const [agentCode, setAgentCode] = useState("")
    const [branch, setBranch] = useState("")
    const [email, setEmail] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")

    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        async function fetchPlans() {
            try {
                const supabase = createClient()
                const { data, error } = await supabase.from("subscription_plans").select("id, name, price").order("price")

                if (error) throw error
                if (data) {
                    setPlans(data as Plan[])
                }
            } catch (err) {
                console.error("Error fetching plans:", err)
            }
        }

        fetchPlans()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const supabase = createClient()

            // Calculate date of birth from age if not provided
            let dob = dateOfBirth
            if (!dob && age) {
                const today = new Date()
                const birthYear = today.getFullYear() - Number.parseInt(age)
                dob = `${birthYear}-01-01` // Default to January 1st of the calculated year
            }

            // Create user account first
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password: `${firstName.toLowerCase()}${lastName.toLowerCase()}123`, // Default password
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                    },
                },
            })

            if (authError) throw authError

            if (authData.user) {
                // Insert patient record
                const { error: patientError } = await supabase.from("patients").insert({
                    user_id: authData.user.id,
                    first_name: firstName,
                    last_name: lastName,
                    date_of_birth: dob,
                    gender,
                    address,
                    phone_number: mobile,
                    email,
                    marital_status: maritalStatus,
                    agent_name: agentName,
                    agent_code: agentCode,
                    branch,
                })

                if (patientError) throw patientError

                // If subscription is selected, create subscription record
                if (subscriptionType) {
                    const selectedPlan = plans.find((p) => p.id === subscriptionType)

                    const { error: subscriptionError } = await supabase.from("patient_subscriptions").insert({
                        patient_id: authData.user.id,
                        plan_id: subscriptionType,
                        start_date: new Date().toISOString(),
                        status: "active",
                        payment_status: selectedPlan?.price === 0 ? "paid" : "pending",
                    })

                    if (subscriptionError) throw subscriptionError
                }

                setSuccess(true)
                setTimeout(() => {
                    router.push("/login")
                }, 3000)
            }
        } catch (err: any) {
            console.error("Registration error:", err)
            setError(err.message || "An unexpected error occurred. Please try again.")
        } finally {
            setLoading(false)
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
                <div className="container max-w-4xl">
                    <Card className="border-none shadow-xl">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold">Patient Registration</CardTitle>
                            <CardDescription>Enter your information to register as a patient</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-4">
                                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}

                            {success ? (
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
                                    <p className="text-gray-700 mb-4">Your patient account has been created successfully!</p>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        You will be redirected to the login page shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Personal Information</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="age">Age</Label>
                                                <Input
                                                    id="age"
                                                    type="number"
                                                    value={age}
                                                    onChange={(e) => setAge(e.target.value)}
                                                    required={!dateOfBirth}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                                <Input
                                                    id="dateOfBirth"
                                                    type="date"
                                                    value={dateOfBirth}
                                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                                    required={!age}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Gender</Label>
                                                <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4" required>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="Male" id="male" />
                                                        <Label htmlFor="male">Male</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="Female" id="female" />
                                                        <Label htmlFor="female">Female</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="mobile">Mobile Number</Label>
                                                <Input id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Marital Status</Label>
                                            <RadioGroup
                                                value={maritalStatus}
                                                onValueChange={setMaritalStatus}
                                                className="flex space-x-4"
                                                required
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Single" id="single" />
                                                    <Label htmlFor="single">Single</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Married" id="married" />
                                                    <Label htmlFor="married">Married</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Subscription Information</h3>

                                        <div className="space-y-2">
                                            <Label htmlFor="subscriptionType">Subscription Plan</Label>
                                            <Select value={subscriptionType} onValueChange={setSubscriptionType} required>
                                                <SelectTrigger id="subscriptionType">
                                                    <SelectValue placeholder="Select a plan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {plans.map((plan) => (
                                                        <SelectItem key={plan.id} value={plan.id}>
                                                            {plan.name} - ${plan.price}/{plan.price === 0 ? "Free" : "month"}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Referral Information (Optional)</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="agentName">Agent Name</Label>
                                                <Input id="agentName" value={agentName} onChange={(e) => setAgentName(e.target.value)} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="agentCode">Agent Code</Label>
                                                <Input id="agentCode" value={agentCode} onChange={(e) => setAgentCode(e.target.value)} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="branch">Branch</Label>
                                                <Input id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                                        disabled={loading}
                                    >
                                        {loading ? (
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
                                                Registering...
                                            </>
                                        ) : (
                                            <>
                                                Register as Patient
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/login" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                                    Sign in
                                </Link>
                            </div>
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
