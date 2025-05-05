"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, Save, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Feature {
    id: string
    name: string
    description: string
}

interface FeatureManagementTableProps {
    features: Feature[]
}

export function FeatureManagementTable({ features: initialFeatures }: FeatureManagementTableProps) {
    const [features, setFeatures] = useState<Feature[]>(initialFeatures)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<{ name: string; description: string }>({
        name: "",
        description: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [featureToDelete, setFeatureToDelete] = useState<string | null>(null)
    const { toast } = useToast()

    const handleEdit = (feature: Feature) => {
        setEditingId(feature.id)
        setEditForm({
            name: feature.name,
            description: feature.description,
        })
    }

    const handleCancelEdit = () => {
        setEditingId(null)
    }

    const handleSaveEdit = async (id: string) => {
        if (!editForm.name.trim()) {
            toast({
                title: "Error",
                description: "Feature name cannot be empty",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true)
        try {
            const supabase = createClient()
            const { error } = await supabase
                .from("subscription_features")
                .update({
                    name: editForm.name,
                    description: editForm.description,
                })
                .eq("id", id)

            if (error) throw error

            // Update local state
            setFeatures(
                features.map((feature) =>
                    feature.id === id ? { ...feature, name: editForm.name, description: editForm.description } : feature,
                ),
            )

            toast({
                title: "Success",
                description: "Feature updated successfully",
            })
            setEditingId(null)
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to update feature",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteClick = (id: string) => {
        setFeatureToDelete(id)
        setDeleteDialogOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (!featureToDelete) return

        setIsLoading(true)
        try {
            const supabase = createClient()

            // First delete any plan-feature mappings
            const { error: mappingError } = await supabase.from("plan_features").delete().eq("feature_id", featureToDelete)

            if (mappingError) throw mappingError

            // Then delete the feature
            const { error } = await supabase.from("subscription_features").delete().eq("id", featureToDelete)

            if (error) throw error

            // Update local state
            setFeatures(features.filter((feature) => feature.id !== featureToDelete))

            toast({
                title: "Success",
                description: "Feature deleted successfully",
            })
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to delete feature",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
            setDeleteDialogOpen(false)
            setFeatureToDelete(null)
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">Name</th>
                        <th className="text-left py-3 px-2 font-medium">Description</th>
                        <th className="text-right py-3 px-2 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {features.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="py-4 text-center text-muted-foreground">
                                No features found
                            </td>
                        </tr>
                    ) : (
                        features.map((feature) => (
                            <tr key={feature.id} className="border-b">
                                <td className="py-3 px-2">
                                    {editingId === feature.id ? (
                                        <Input
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="max-w-xs"
                                        />
                                    ) : (
                                        feature.name
                                    )}
                                </td>
                                <td className="py-3 px-2">
                                    {editingId === feature.id ? (
                                        <Textarea
                                            value={editForm.description}
                                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                            className="max-w-md"
                                            rows={2}
                                        />
                                    ) : (
                                        feature.description
                                    )}
                                </td>
                                <td className="py-3 px-2 text-right">
                                    {editingId === feature.id ? (
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={handleCancelEdit} disabled={isLoading}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleSaveEdit(feature.id)} disabled={isLoading}>
                                                <Save className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => handleEdit(feature)} disabled={isLoading}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteClick(feature.id)}
                                                disabled={isLoading}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the feature and remove it from all subscription
                            plans.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
