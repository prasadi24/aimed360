"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Feature {
    id: string
    name: string
    description: string
}

interface AddFeatureDialogProps {
    onFeatureAdded: (feature: Feature) => void
}

export function AddFeatureDialog({ onFeatureAdded }: AddFeatureDialogProps) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            toast({
                title: "Error",
                description: "Feature name is required",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true)

        try {
            const supabase = createClient()

            const { data, error } = await supabase
                .from("subscription_features")
                .insert({
                    name,
                    description,
                })
                .select()

            if (error) throw error

            toast({
                title: "Success",
                description: "Feature added successfully",
            })

            if (data && data[0]) {
                // Explicitly extract and type the fields
                const newFeature: Feature = {
                    id: String(data[0].id || ""),
                    name: String(data[0].name || ""),
                    description: String(data[0].description || ""),
                }
                onFeatureAdded(newFeature)
            }

            setName("")
            setDescription("")
            setOpen(false)
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Failed to add feature"

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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Feature
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Subscription Feature</DialogTitle>
                        <DialogDescription>Create a new feature that can be assigned to subscription plans.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Feature Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Unlimited Appointments"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what this feature provides to subscribers"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Feature
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
