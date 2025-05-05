"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { MedicalLoader } from "@/components/ui/loader"

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

// Define types for Supabase responses
interface FeatureData {
    feature_id: string
    subscription_features: {
        id: string
        name: string
        description: string
    } | null
}

export function SubscriptionSlider() {
    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)

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
                if (!plansData || !Array.isArray(plansData)) throw new Error("No plans data returned")

                // For each plan, fetch its top 3 features
                const plansWithFeatures = await Promise.all(
                    plansData.map(async (plan: any) => {
                        try {
                            const { data: featuresData, error: featuresError } = await supabase
                                .from("plan_features")
                                .select(`
                  feature_id,
                  subscription_features!inner(id, name, description)
                `)
                                .eq("plan_id", plan.id)
                                .limit(3)

                            if (featuresError) throw featuresError

                            const features: Feature[] = []

                            if (featuresData && Array.isArray(featuresData)) {
                                // Type assertion for featuresData
                                const typedFeaturesData = featuresData as any[]

                                for (const item of typedFeaturesData) {
                                    if (item && item.subscription_features) {
                                        features.push({
                                            id: String(item.subscription_features.id || ""),
                                            name: String(item.subscription_features.name || ""),
                                            description: String(item.subscription_features.description || ""),
                                        })
                                    }
                                }
                            }

                            return {
                                id: String(plan.id || ""),
                                name: String(plan.name || ""),
                                description: String(plan.description || ""),
                                price: Number(plan.price || 0),
                                billing_cycle: String(plan.billing_cycle || "month"),
                                features,
                            } as Plan
                        } catch (error) {
                            console.error(`Error fetching features for plan ${plan.id}:`, error)
                            return {
                                id: String(plan.id || ""),
                                name: String(plan.name || ""),
                                description: String(plan.description || ""),
                                price: Number(plan.price || 0),
                                billing_cycle: String(plan.billing_cycle || "month"),
                                features: [],
                            } as Plan
                        }
                    }),
                )

                setPlans(plansWithFeatures)
            } catch (error) {
                console.error("Error fetching subscription plans:", error)
                setPlans([])
            } finally {
                setLoading(false)
            }
        }

        fetchPlans()
    }, [])

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % plans.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length)
    }

    const visiblePlans = () => {
        if (plans.length === 0) return []

        // For mobile, show only the current plan
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            return [plans[currentIndex]]
        }

        // For desktop, show 3 plans at a time
        const result = []
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % plans.length
            result.push(plans[index])
        }
        return result
    }

    // Format price in Indian Rupees
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <MedicalLoader size={60} />
            </div>
        )
    }

    if (plans.length === 0) {
        return (
            <div className="text-center p-8">
                <p className="text-muted-foreground">No subscription plans available at the moment.</p>
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <Button variant="outline" size="icon" className="rounded-full bg-white shadow-lg" onClick={prevSlide}>
                    <ChevronLeft className="h-5 w-5" />
                </Button>
            </div>

            <div className="overflow-hidden" ref={sliderRef}>
                <div className="flex gap-4 transition-transform duration-300 px-8">
                    {visiblePlans().map((plan) => (
                        <Card key={plan.id} className="min-w-[300px] flex-1">
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <div className="mt-2">
                                    <span className="text-2xl font-bold">{formatPrice(plan.price)}</span>
                                    <span className="text-muted-foreground">/{plan.billing_cycle}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {plan.features.map((feature) => (
                                        <li key={feature.id} className="flex items-center">
                                            <Check className="h-4 w-4 text-green-500 mr-2" />
                                            <span className="text-sm">{feature.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="/subscriptions" className="w-full">
                                    <Button variant="outline" className="w-full">
                                        View Details
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <Button variant="outline" size="icon" className="rounded-full bg-white shadow-lg" onClick={nextSlide}>
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>

            <div className="flex justify-center mt-4 gap-1">
                {plans.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    )
}
