"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { MedicalLoader } from "@/components/ui/loader"

interface Feature {
    id: string
    name: string
    description: string
}

interface Plan {
    id: string
    name: string
    description?: string
    price: number
    billing_cycle?: string
}

interface PlanFeature {
    plan_id: string
    feature_id: string
}

// These components would need to be created in your project
// I'm keeping the imports but will create simplified versions below
import { FeatureManagementTable } from "@/components/admin/feature-management-table"
import { PlanFeatureMapping } from "@/components/admin/plan-feature-mapping"
import { AddFeatureDialog } from "@/components/admin/add-feature-dialog"
import { checkIsAdmin } from "@/lib/auth-utils"

export default function AdminSubscriptionFeaturesPage() {
    //const [userName, setUserName] = useState<string>("")

    const [plans, setPlans] = useState<Plan[]>([])
    const [features, setFeatures] = useState<Feature[]>([])
    const [planFeatureMappings, setPlanFeatureMappings] = useState<PlanFeature[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            try {
                const supabase = createClient()

                // Check authentication
                const { data: sessionData } = await supabase.auth.getSession()
                if (!sessionData.session) {
                    router.push("/login")
                    return
                }

                //const user = sessionData.session.user

                // Get display name using utility function
                // setUserName(getDisplayName(user))

                // Check if user is admin using our RPC function
                const isAdmin = await checkIsAdmin()
                if (!isAdmin) {
                    router.push("/login")
                    return
                }

                // Fetch all subscription plans


                const { data: plansData } = await supabase
                    .from("subscription_plans")
                    .select("*")
                    .order("price") as { data: Plan[] | null }




                // Fetch all subscription features
                const { data: featuresData } = await supabase
                    .from("subscription_features")
                    .select("*")
                    .order("name") as { data: Feature[] | null }




                // Fetch plan-feature mappings
                const { data: mappingsData } = await supabase
                    .from("plan_features")
                    .select("plan_id, feature_id") as { data: PlanFeature[] | null }



                if (plansData) setPlans(plansData)
                if (featuresData) setFeatures(featuresData)
                if (mappingsData) setPlanFeatureMappings(mappingsData)

                setLoading(false)


            } catch (error) {
                console.error("Error fetching data:", error)
                router.push("/login")
            }
        }

        fetchData()
    }, [router])

    const handleFeatureAdded = (newFeature: Feature) => {
        setFeatures([...features, newFeature])
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <MedicalLoader size={60} />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Subscription Feature Management</h1>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Features Management Section */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Subscription Features</CardTitle>
                        <AddFeatureDialog onFeatureAdded={handleFeatureAdded} />
                    </CardHeader>
                    <CardContent>
                        <FeatureManagementTable features={features} />
                    </CardContent>
                </Card>

                {/* Plan-Feature Mapping Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Plan Feature Assignments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PlanFeatureMapping plans={plans} features={features} mappings={planFeatureMappings} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
