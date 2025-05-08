"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Clock, CreditCard, Calendar, ArrowRight, Shield } from "lucide-react"
import { checkAuthStatus } from "@/app/actions/auth"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { User } from "@supabase/supabase-js"

interface PlanDetails {
    name: string
    description: string
    price: number
    billing_cycle: string
}

interface Subscription {
    id: string
    plan_id: string
    start_date: string
    end_date: string | null
    status: string
    payment_status: string
    plan: PlanDetails
}

interface PaymentHistory {
    id: string
    amount: number
    date: string
    status: string
    method: string
}






export default function PatientSubscriptionPage() {
    const router = useRouter()
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                // Check authentication status
                const { authenticated, user } = await checkAuthStatus()

                if (!authenticated || !user) {
                    router.push("/login?redirect=/patient/subscription")
                    return
                }

                setUser(user)

                const supabase = createClient()

                // Fetch subscription data
                const { data: subscriptionData, error: subscriptionError } = await supabase
                    .from("patient_subscriptions")
                    .select(`
            id,
            plan_id,
            start_date,
            end_date,
            status,
            payment_status,
            subscription_plans (
              name,
              description,
              price,
              billing_cycle
            )
          `)
                    .eq("patient_id", user.id)
                    .order("start_date", { ascending: false })
                    .limit(1)
                    .single()

                if (subscriptionError) {
                    if (subscriptionError.code !== "PGRST116") {
                        throw subscriptionError
                    }
                    // No subscription found, but not an error
                    setSubscription(null)
                    setLoading(false)
                    return
                }

                // Type guard to ensure subscriptionData is not null
                if (subscriptionData) {
                    // Use type assertion to bypass TypeScript's strict checking
                    type SupabaseSubscriptionRaw = {
                        id: string
                        plan_id: string
                        start_date: string
                        end_date: string | null
                        status: string
                        payment_status: string
                        subscription_plans?: {
                            name?: string
                            description?: string
                            price?: number
                            billing_cycle?: string
                        }
                    }



                    const data = subscriptionData as unknown as SupabaseSubscriptionRaw

                    if (!data.subscription_plans || typeof data.subscription_plans !== "object") {
                        throw new Error("Invalid subscription plan data")
                    }




                    // Create the subscription object with safe defaults
                    const formattedSubscription: Subscription = {
                        id: String(data.id),
                        plan_id: String(data.plan_id),
                        start_date: String(data.start_date),
                        end_date: data.end_date ? String(data.end_date) : null,
                        status: String(data.status),
                        payment_status: String(data.payment_status),
                        plan: {
                            name: String(data.subscription_plans?.name ?? "Unknown Plan"),
                            description: String(data.subscription_plans?.description ?? ""),
                            price: Number(data.subscription_plans?.price ?? 0),
                            billing_cycle: String(data.subscription_plans?.billing_cycle ?? "month"),
                        },
                    }


                    setSubscription(formattedSubscription)

                    // For demo purposes, generate some payment history
                    const mockPaymentHistory = generateMockPaymentHistory(
                        formattedSubscription.plan.price,
                        new Date(formattedSubscription.start_date),
                    )
                    setPaymentHistory(mockPaymentHistory)
                } else {
                    throw new Error("Invalid subscription data")
                }
            } catch (err) {
                if (err instanceof Error) {
                    console.error("Error fetching subscription data:", err.message)
                    setError(err.message)
                } else {
                    console.error("Unknown error fetching subscription data:", err)
                    setError("An unknown error occurred.")
                }
            }
            finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [router])

    // Helper function to generate mock payment history
    function generateMockPaymentHistory(price: number, startDate: Date): PaymentHistory[] {
        const history: PaymentHistory[] = []
        const now = new Date()
        const currentDate = new Date(startDate)

        while (currentDate <= now) {
            const paymentDate = new Date(currentDate)

            history.push({
                id: `payment-${history.length + 1}`,
                amount: price,
                date: paymentDate.toISOString(),
                status: Math.random() > 0.1 ? "completed" : "failed",
                method: Math.random() > 0.5 ? "credit_card" : "bank_transfer",
            })

            // Add one month to the current date
            currentDate.setMonth(currentDate.getMonth() + 1)
        }

        return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    function getStatusColor(status: string) {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            case "expired":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-blue-100 text-blue-800"
        }
    }

    function getPaymentStatusColor(status: string) {
        switch (status.toLowerCase()) {
            case "paid":
            case "completed":
                return "bg-green-100 text-green-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "failed":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    function formatDate(dateString: string | null | undefined) {
        if (!dateString) return "N/A"

        try {
            return format(new Date(dateString), "MMM d, yyyy")
        } catch (error) {
            console.error("Invalid date format:", dateString, error)
            return "Invalid date"
        }
    }

    function getNextBillingDate(subscription: Subscription): string {
        if (subscription.end_date) {
            return formatDate(subscription.end_date)
        }

        try {
            const startDate = new Date(subscription.start_date)
            const nextBillingDate = new Date(startDate)
            nextBillingDate.setMonth(startDate.getMonth() + 1)
            return formatDate(nextBillingDate.toISOString())
        } catch (error) {
            console.error("Error calculating next billing date:", error)
            return "N/A"
        }
    }

    if (loading) {
        return (
            <div className="container py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-8">
            <h1 className="text-2xl font-bold mb-6">Subscription Management</h1>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-6">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            {!subscription ? (
                <Card>
                    <CardHeader>
                        <CardTitle>No Active Subscription</CardTitle>
                        <CardDescription>You don&apos;t have an active subscription plan</CardDescription>

                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">Subscribe to a healthcare plan to access premium features and services.</p>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() => router.push("/subscriptions")}
                            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                        >
                            View Available Plans
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Current Plan: {subscription.plan.name}</CardTitle>
                                        <CardDescription>{subscription.plan.description}</CardDescription>
                                    </div>
                                    <Badge className={getStatusColor(subscription.status)}>
                                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <CreditCard className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Billing Amount</p>
                                                <p className="font-medium">
                                                    ${subscription.plan.price}/{subscription.plan.billing_cycle}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <Clock className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Payment Status</p>
                                                <p className="font-medium">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(subscription.payment_status)}`}
                                                    >
                                                        {subscription.payment_status.charAt(0).toUpperCase() + subscription.payment_status.slice(1)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-purple-100 p-2 rounded-full">
                                                <Calendar className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Start Date</p>
                                                <p className="font-medium">{formatDate(subscription.start_date)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="bg-amber-100 p-2 rounded-full">
                                                <Calendar className="h-5 w-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Next Billing Date</p>
                                                <p className="font-medium">{getNextBillingDate(subscription)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col sm:flex-row gap-3">
                                <Button variant="outline" onClick={() => router.push("/subscriptions")}>
                                    Change Plan
                                </Button>
                                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                                    Cancel Subscription
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Payment History</CardTitle>
                                <CardDescription>Your recent payment transactions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {paymentHistory.length === 0 ? (
                                        <p className="text-center py-4 text-muted-foreground">No payment history available</p>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b">
                                                        <th className="text-left py-3 px-2 font-medium">Date</th>
                                                        <th className="text-left py-3 px-2 font-medium">Amount</th>
                                                        <th className="text-left py-3 px-2 font-medium">Status</th>
                                                        <th className="text-left py-3 px-2 font-medium">Method</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paymentHistory.map((payment) => (
                                                        <tr key={payment.id} className="border-b">
                                                            <td className="py-3 px-2">{formatDate(payment.date)}</td>
                                                            <td className="py-3 px-2">${payment.amount.toFixed(2)}</td>
                                                            <td className="py-3 px-2">
                                                                <span
                                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}
                                                                >
                                                                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-2 capitalize">{payment.method.replace("_", " ")}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Billing Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium">Payment Method</p>
                                        <div className="flex items-center gap-2 mt-1 p-3 border rounded-md">
                                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                                            <span>•••• •••• •••• 4242</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">Billing Address</p>
                                        <div className="mt-1 p-3 border rounded-md">
                                            <p>
                                                {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                                            </p>
                                            <p className="text-muted-foreground">123 Healthcare St</p>
                                            <p className="text-muted-foreground">New York, NY 10001</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    Update Billing Info
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Need Help?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-blue-100 p-2 rounded-full mt-1">
                                            <Shield className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Billing Support</p>
                                            <p className="text-sm text-muted-foreground">
                                                Having issues with your subscription or payments? Our support team is here to help.
                                            </p>
                                            <Button variant="link" className="px-0 h-auto mt-1">
                                                Contact Support
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-green-100 p-2 rounded-full mt-1">
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">FAQ</p>
                                            <p className="text-sm text-muted-foreground">
                                                Find answers to common questions about billing, subscriptions, and payments.
                                            </p>
                                            <Button variant="link" className="px-0 h-auto mt-1">
                                                View FAQ
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}
