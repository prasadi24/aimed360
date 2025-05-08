"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface Feature {
    id: string
    name: string
    description: string
}

interface Plan {
    id: string
    name: string
    description: string
    price: number
    billing_cycle: string
    features: Feature[]
}

export default function SubscriptionsPage() {
    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

    useEffect(() => {
        async function fetchPlans() {
            try {
                const supabase = createClient()

                // Fetch all plans
                const { data: plansData, error: plansError } = await supabase
                    .from("subscription_plans")
                    .select("*")
                    .order("price")

                if (plansError) throw plansError
                if (!plansData) throw new Error("No plans data returned")

                // For each plan, fetch its features
                const plansWithFeatures: Plan[] = []

                for (const rawPlan of plansData) {
                    try {
                        // Create a plan object with default values
                        const plan: Plan = {
                            id: String(rawPlan.id || ""),
                            name: String(rawPlan.name || ""),
                            description: String(rawPlan.description || ""),
                            price: Number(rawPlan.price || 0),
                            billing_cycle: String(rawPlan.billing_cycle || "month"),
                            features: [],
                        }

                        // Fetch features for this plan
                        const { data: featuresData, error: featuresError } = await supabase
                            .from("plan_features")
                            .select(`
                feature_id,
                subscription_features!inner(id, name, description)
              `)
                            .eq("plan_id", plan.id)

                        if (featuresError) {
                            console.error(`Error fetching features for plan ${plan.id}:`, featuresError)
                        } else if (featuresData && Array.isArray(featuresData)) {
                            // Process each feature
                            for (const item of featuresData) {
                                try {
                                    if (
                                        item &&
                                        typeof item === "object" &&
                                        "subscription_features" in item &&
                                        item.subscription_features &&
                                        typeof item.subscription_features === "object"
                                    ) {
                                        const featureData = item.subscription_features as Feature
                                        // Ensure featureData is an object and has the expected properties
                                        if (!featureData || typeof featureData !== "object") {
                                            console.error("Invalid feature data:", featureData)
                                            continue
                                        }
                                        // Create a feature object with default values
                                        const feature: Feature = {
                                            id: String(featureData.id || ""),
                                            name: String(featureData.name || ""),
                                            description: String(featureData.description || ""),
                                        }

                                        plan.features.push(feature)
                                    }
                                } catch (featureError) {
                                    console.error("Error processing feature:", featureError)
                                }
                            }
                        }

                        plansWithFeatures.push(plan)
                    } catch (planError) {
                        console.error(`Error processing plan:`, planError)
                    }
                }

                setPlans(plansWithFeatures)
            } catch (error) {
                console.error("Error fetching subscription plans:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPlans()
    }, [])

    const handleSelectPlan = (planId: string) => {
        setSelectedPlan(planId)
    }

    const getPopularPlan = () => {
        // Return the Family plan as the popular option
        return plans.find((plan) => plan.name === "Family")?.id
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
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

            <main className="container py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Healthcare Plan</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Select the plan that best fits your healthcare needs and budget
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {plans.map((plan) => {
                            const isPopular = plan.id === getPopularPlan()
                            const isSelected = plan.id === selectedPlan

                            return (
                                <Card
                                    key={plan.id}
                                    className={`relative overflow-hidden transition-all ${isSelected ? "ring-2 ring-primary shadow-lg" : isPopular ? "ring-2 ring-blue-400 shadow-lg" : ""
                                        }`}
                                >
                                    {isPopular && (
                                        <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium">
                                            POPULAR
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle>{plan.name}</CardTitle>
                                        <CardDescription>{plan.description}</CardDescription>
                                        <div className="mt-4">
                                            <span className="text-3xl font-bold">${plan.price}</span>
                                            <span className="text-muted-foreground">/{plan.billing_cycle}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <h4 className="text-sm font-medium">Features:</h4>
                                        <ul className="space-y-2">
                                            {plan.features.map((feature) => (
                                                <li key={feature.id} className="flex items-start">
                                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                                    <span className="text-sm">{feature.name}</span>
                                                </li>
                                            ))}

                                            {/* Show what features are not included */}
                                            {plans
                                                .find((p) => p.price === Math.max(...plans.map((p) => p.price)))
                                                ?.features.filter((feature) => !plan.features.some((f) => f.id === feature.id))
                                                .map((feature) => (
                                                    <li key={feature.id} className="flex items-start text-muted-foreground">
                                                        <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                                                        <span className="text-sm">{feature.name}</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/register?plan=${plan.id}`} className="w-full">
                                            <Button
                                                variant={isPopular ? "default" : "outline"}
                                                className={`w-full ${isPopular ? "bg-gradient-to-r from-blue-600 to-teal-500" : ""}`}
                                                onClick={() => handleSelectPlan(plan.id)}
                                            >
                                                {plan.price === 0 ? "Start Free" : "Subscribe Now"}
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                )}

                <div className="mt-16 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium">Can I change my plan later?</h3>
                            <p className="text-muted-foreground">
                                Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your
                                next billing cycle.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium">Is there a contract or commitment?</h3>
                            <p className="text-muted-foreground">
                                No, all our plans are month-to-month with no long-term contracts. You can cancel anytime.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium">How do family plans work?</h3>
                            <p className="text-muted-foreground">
                                Family plans cover up to 5 family members living at the same address. Additional members can be added
                                for a small fee.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium">Are there any hidden fees?</h3>
                            <p className="text-muted-foreground">
                                No, the price you see is the price you pay. There are no hidden fees or charges.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t py-8 bg-white">
                <div className="container flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
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
