"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
import { PlusCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { MedicalLoader } from "@/components/ui/loader"

interface SubscriptionPlan {
    id: string
    name: string
    description: string
    price: number
    billing_cycle: string
    active_subscribers: number
}

interface PatientData {
    first_name: string
    last_name: string
    email: string
}

interface PlanData {
    name: string
    price: number
}

interface PatientSubscription {
    id: string
    patient_id: string
    plan_id: string
    start_date: string
    status: string
    payment_status: string
    patients: PatientData
    subscription_plans: PlanData
    patient: {
        first_name: string
        last_name: string
        email: string
    }
}

export default function SubscriptionsPage() {
    const [plans, setPlans] = useState<SubscriptionPlan[]>([])
    const [subscriptions, setSubscriptions] = useState<PatientSubscription[]>([])
    const [loading, setLoading] = useState(true)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null)
    const [planToDelete, setPlanToDelete] = useState<string | null>(null)
    const [editForm, setEditForm] = useState({
        name: "",
        description: "",
        price: 0,
        billing_cycle: "month",
    })
    const [addForm, setAddForm] = useState({
        name: "",
        description: "",
        price: 0,
        billing_cycle: "month",
    })
    const router = useRouter()

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            setLoading(true)
            const supabase = createClient()

            // Fetch subscription plans
            const { data: plansData, error: plansError } = await supabase
                .from("subscription_plans")
                .select("*")
                .order("price")

            if (plansError) {
                console.error("Error fetching plans:", plansError)
                return
            }

            // Fetch recent subscriptions with patient info
            const { data: subscriptionsData, error: subscriptionsError } = await supabase
                .from("patient_subscriptions")
                .select(`
          id,
          patient_id,
          plan_id,
          start_date,
          end_date,
          status,
          payment_status,
          patients!inner(first_name, last_name, email),
          subscription_plans!inner(name, price)
        `)
                .order("start_date", { ascending: false })
                .limit(10)

            if (subscriptionsError) {
                console.error("Error fetching subscriptions:", subscriptionsError)
            }

            // Calculate active subscribers per plan
            const plansWithStats: SubscriptionPlan[] = (plansData || []).map((plan: any) => {
                const activeSubscribers =
                    subscriptionsData?.filter((sub: any) => sub.plan_id === plan.id && sub.status === "active").length || 0

                return {
                    id: plan.id,
                    name: plan.name,
                    description: plan.description || "",
                    price: plan.price,
                    billing_cycle: plan.billing_cycle || "month",
                    active_subscribers: activeSubscribers,
                }
            })

            setPlans(plansWithStats)

            // Format subscriptions for display
            const formattedSubscriptions: PatientSubscription[] = (subscriptionsData || []).map((sub: any) => ({
                id: sub.id,
                patient_id: sub.patient_id,
                plan_id: sub.plan_id,
                start_date: sub.start_date,
                status: sub.status,
                payment_status: sub.payment_status,
                patients: sub.patients,
                subscription_plans: sub.subscription_plans,
                patient: {
                    first_name: sub.patients.first_name,
                    last_name: sub.patients.last_name,
                    email: sub.patients.email,
                },
            }))

            setSubscriptions(formattedSubscriptions)
        } catch (error) {
            console.error("Unexpected error in fetchData:", error)
        } finally {
            setLoading(false)
        }
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

    const handleEditPlan = (plan: SubscriptionPlan) => {
        setCurrentPlan(plan)
        setEditForm({
            name: plan.name,
            description: plan.description,
            price: plan.price,
            billing_cycle: plan.billing_cycle,
        })
        setEditDialogOpen(true)
    }

    const handleSavePlan = async () => {
        if (!currentPlan) return

        try {
            const supabase = createClient()
            const { error } = await supabase
                .from("subscription_plans")
                .update({
                    name: editForm.name,
                    description: editForm.description,
                    price: editForm.price,
                    billing_cycle: editForm.billing_cycle,
                })
                .eq("id", currentPlan.id)

            if (error) throw error

            // Update local state
            setPlans(plans.map((plan) => (plan.id === currentPlan.id ? { ...plan, ...editForm } : plan)))
            setEditDialogOpen(false)
            fetchData() // Refresh data
        } catch (error: any) {
            console.error("Error updating plan:", error)
        }
    }

    const handleAddPlan = () => {
        setAddForm({
            name: "",
            description: "",
            price: 0,
            billing_cycle: "month",
        })
        setAddDialogOpen(true)
    }

    const handleSaveNewPlan = async () => {
        if (!addForm.name.trim()) {
            console.error("Plan name is required")
            return
        }

        try {
            const supabase = createClient()
            const { data, error } = await supabase
                .from("subscription_plans")
                .insert({
                    name: addForm.name,
                    description: addForm.description,
                    price: addForm.price,
                    billing_cycle: addForm.billing_cycle,
                })
                .select()

            if (error) throw error

            setAddDialogOpen(false)
            fetchData() // Refresh data
        } catch (error: any) {
            console.error("Error adding plan:", error)
        }
    }

    const handleDeleteClick = (planId: string) => {
        setPlanToDelete(planId)
        setDeleteDialogOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (!planToDelete) return

        try {
            const supabase = createClient()

            // Check if there are any active subscriptions for this plan
            const { data: activeSubscriptions } = await supabase
                .from("patient_subscriptions")
                .select("id")
                .eq("plan_id", planToDelete)
                .eq("status", "active")
                .limit(1)

            if (activeSubscriptions && activeSubscriptions.length > 0) {
                console.error("This plan has active subscribers. Please cancel all subscriptions first.")
                setDeleteDialogOpen(false)
                return
            }

            // Delete the plan
            const { error } = await supabase.from("subscription_plans").delete().eq("id", planToDelete)

            if (error) throw error

            // Update local state
            setPlans(plans.filter((plan) => plan.id !== planToDelete))
        } catch (error: any) {
            console.error("Error deleting plan:", error)
        } finally {
            setDeleteDialogOpen(false)
            setPlanToDelete(null)
        }
    }

    // Find the plan that's being deleted (if any)
    const planBeingDeleted = planToDelete ? plans.find((p) => p.id === planToDelete) : null
    // Get the number of active subscribers for the plan being deleted
    const activeSubscribersCount = planBeingDeleted ? planBeingDeleted.active_subscribers : 0

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
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <MedicalLoader size={60} />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Subscription Management</h2>
                    <p className="text-muted-foreground">Manage the subscription plans available to users.</p>
                </div>
                <Button
                    onClick={handleAddPlan}
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Plan
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2 bg-gray-50 rounded-t-lg">
                            <CardTitle>{plan.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">{plan.description}</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-2xl font-bold">₹{plan.price}</p>
                                    <p className="text-sm text-muted-foreground">/{plan.billing_cycle}</p>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <p className="text-sm">Active subscribers:</p>
                                    <p className="font-medium">{plan.active_subscribers}</p>
                                </div>
                                <div className="pt-4 flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                                        onClick={() => handleEditPlan(plan)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                        onClick={() => handleDeleteClick(plan.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-2 font-medium">Patient</th>
                                    <th className="text-left py-3 px-2 font-medium">Plan</th>
                                    <th className="text-left py-3 px-2 font-medium">Start Date</th>
                                    <th className="text-left py-3 px-2 font-medium">Status</th>
                                    <th className="text-left py-3 px-2 font-medium">Payment</th>
                                    <th className="text-left py-3 px-2 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8">
                                            No subscriptions found
                                        </td>
                                    </tr>
                                ) : (
                                    subscriptions.map((subscription) => (
                                        <tr key={subscription.id} className="border-b">
                                            <td className="py-3 px-2">
                                                <div>
                                                    <p className="font-medium">
                                                        {subscription.patient.first_name} {subscription.patient.last_name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">{subscription.patient.email}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2">
                                                <div>
                                                    <p>{subscription.subscription_plans.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        ₹{subscription.subscription_plans.price}/month
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2">{new Date(subscription.start_date).toLocaleDateString()}</td>
                                            <td className="py-3 px-2">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}
                                                >
                                                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subscription.payment_status)}`}
                                                >
                                                    {subscription.payment_status.charAt(0).toUpperCase() + subscription.payment_status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2">
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm">
                                                        View
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Plan Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Edit Subscription Plan</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="name" className="text-right text-sm font-medium">
                                Name
                            </label>
                            <Input
                                id="name"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="description" className="text-right text-sm font-medium">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                value={editForm.description}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="price" className="text-right text-sm font-medium">
                                Price (₹)
                            </label>
                            <Input
                                id="price"
                                type="number"
                                value={editForm.price}
                                onChange={(e) => setEditForm({ ...editForm, price: Number.parseFloat(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="billing_cycle" className="text-right text-sm font-medium">
                                Billing Cycle
                            </label>
                            <Input
                                id="billing_cycle"
                                value={editForm.billing_cycle}
                                onChange={(e) => setEditForm({ ...editForm, billing_cycle: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSavePlan}
                            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add New Plan Dialog */}
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Add New Subscription Plan</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="add-name" className="text-right text-sm font-medium">
                                Name
                            </label>
                            <Input
                                id="add-name"
                                value={addForm.name}
                                onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                                className="col-span-3"
                                placeholder="e.g. Premium Plan"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="add-description" className="text-right text-sm font-medium">
                                Description
                            </label>
                            <Textarea
                                id="add-description"
                                value={addForm.description}
                                onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                                className="col-span-3"
                                placeholder="Describe the features of this plan"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="add-price" className="text-right text-sm font-medium">
                                Price (₹)
                            </label>
                            <Input
                                id="add-price"
                                type="number"
                                value={addForm.price}
                                onChange={(e) => setAddForm({ ...addForm, price: Number.parseFloat(e.target.value) })}
                                className="col-span-3"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="add-billing-cycle" className="text-right text-sm font-medium">
                                Billing Cycle
                            </label>
                            <Input
                                id="add-billing-cycle"
                                value={addForm.billing_cycle}
                                onChange={(e) => setAddForm({ ...addForm, billing_cycle: e.target.value })}
                                className="col-span-3"
                                placeholder="month"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveNewPlan}
                            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                        >
                            Add Plan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the subscription plan.
                            {activeSubscribersCount > 0 && (
                                <p className="text-red-500 mt-2 font-semibold">
                                    Warning: This plan has active subscribers. Deleting it may cause issues.
                                </p>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
