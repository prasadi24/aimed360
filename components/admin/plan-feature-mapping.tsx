"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface Plan {
    id: string
    name: string
}

interface Feature {
    id: string
    name: string
}

interface Mapping {
    plan_id: string
    feature_id: string
}

interface PlanFeatureMappingProps {
    plans: Plan[]
    features: Feature[]
    mappings: Mapping[]
}

export function PlanFeatureMapping({ plans, features, mappings }: PlanFeatureMappingProps) {
    const [selectedMappings, setSelectedMappings] = useState<Record<string, Set<string>>>(
        plans.reduce(
            (acc, plan) => {
                acc[plan.id] = new Set(
                    mappings.filter((mapping) => mapping.plan_id === plan.id).map((mapping) => mapping.feature_id),
                )
                return acc
            },
            {} as Record<string, Set<string>>,
        ),
    )

    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleToggleFeature = (planId: string, featureId: string) => {
        setSelectedMappings((prev) => {
            const newMappings = { ...prev }
            const planFeatures = new Set(newMappings[planId])

            if (planFeatures.has(featureId)) {
                planFeatures.delete(featureId)
            } else {
                planFeatures.add(featureId)
            }

            newMappings[planId] = planFeatures
            return newMappings
        })
    }

    const handleSaveAllPlanFeatures = async () => {
        setIsLoading(true)

        try {
            const supabase = createClient()

            // Process each plan
            for (const plan of plans) {
                const planId = plan.id

                // Get the current selected features for this plan
                const selectedFeatureIds = Array.from(selectedMappings[planId])

                // Get the original mappings for this plan
                const originalMappings = mappings
                    .filter((mapping) => mapping.plan_id === planId)
                    .map((mapping) => mapping.feature_id)

                // Features to add (in selected but not in original)
                const featuresToAdd = selectedFeatureIds.filter((featureId) => !originalMappings.includes(featureId))

                // Features to remove (in original but not in selected)
                const featuresToRemove = originalMappings.filter((featureId) => !selectedFeatureIds.includes(featureId))

                // Add new mappings
                if (featuresToAdd.length > 0) {
                    const { error: addError } = await supabase.from("plan_features").insert(
                        featuresToAdd.map((featureId) => ({
                            plan_id: planId,
                            feature_id: featureId,
                        })),
                    )

                    if (addError) throw addError
                }

                // Remove old mappings
                for (const featureId of featuresToRemove) {
                    const { error: removeError } = await supabase
                        .from("plan_features")
                        .delete()
                        .eq("plan_id", planId)
                        .eq("feature_id", featureId)

                    if (removeError) throw removeError
                }
            }

            toast({
                title: "Success",
                description: "All plan features updated successfully",
            })
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Failed to update plan features"

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            })
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">Feature</th>
                        {plans.map((plan) => (
                            <th key={plan.id} className="text-center py-3 px-2 font-medium">
                                {plan.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {features.map((feature) => (
                        <tr key={feature.id} className="border-b">
                            <td className="py-3 px-2">{feature.name}</td>
                            {plans.map((plan) => (
                                <td key={`${plan.id}-${feature.id}`} className="text-center py-3 px-2">
                                    <Checkbox
                                        checked={selectedMappings[plan.id]?.has(feature.id)}
                                        onCheckedChange={() => handleToggleFeature(plan.id, feature.id)}
                                        disabled={isLoading}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-6 flex justify-center">
                <Button
                    onClick={handleSaveAllPlanFeatures}
                    disabled={isLoading}
                    className="px-8 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save All Plan Features
                </Button>
            </div>
        </div>
    )
}
