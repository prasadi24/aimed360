"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { MedicalLoader } from "@/components/ui/loader"
import { createDoctor, getSpecializations } from "@/app/actions/doctors"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"
import { MultiSelect, MultiSelectItem } from "@/components/ui/multi-select"

interface Specialization {
    id: string
    name: string
    description?: string
}

export default function AddDoctorPage() {
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [specializations, setSpecializations] = useState<Specialization[]>([])
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([])
    const [formData, setFormData] = useState({
        title: "",
        firstName: "",
        lastName: "",
        specialization: "",
        licenseNumber: "",
        yearsOfExperience: "",
        bio: "",
        consultationFee: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        profileImage: "",
    })

    const router = useRouter()

    useEffect(() => {
        fetchSpecializations()
    }, [])

    async function fetchSpecializations() {
        try {
            setLoading(true)
            const result = await getSpecializations()

            if (result.success && result.specializations) {
                setSpecializations(result.specializations)
            } else {
                console.error("Failed to fetch specializations:", result.error)
            }
        } catch (error) {
            console.error("Error fetching specializations:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setSubmitting(true)

            // Get the current user ID
            const supabase = createClient()
            const {
                data: { session },
            } = await supabase.auth.getSession()

            if (!session?.user) {
                toast({
                    title: "Error",
                    description: "You must be logged in to create a doctor profile",
                    variant: "destructive",
                })
                return
            }

            const result = await createDoctor({
                title: formData.title || undefined,
                firstName: formData.firstName,
                lastName: formData.lastName,
                specialization: formData.specialization || undefined,
                licenseNumber: formData.licenseNumber || undefined,
                yearsOfExperience: formData.yearsOfExperience ? Number.parseInt(formData.yearsOfExperience) : undefined,
                bio: formData.bio || undefined,
                consultationFee: formData.consultationFee ? Number.parseFloat(formData.consultationFee) : undefined,
                contactEmail: formData.contactEmail || undefined,
                contactPhone: formData.contactPhone || undefined,
                address: formData.address || undefined,
                city: formData.city || undefined,
                state: formData.state || undefined,
                postalCode: formData.postalCode || undefined,
                country: formData.country || undefined,
                profileImage: formData.profileImage || undefined,
                specializations: selectedSpecializations.length > 0 ? selectedSpecializations : undefined,
                // Let userId be determined by the server action
            })

            if (result.success) {
                toast({
                    title: "Success",
                    description: "Doctor profile created successfully",
                })
                router.push("/admin/doctors")
            } else {
                toast({
                    title: "Error",
                    description: result.error || "Failed to create doctor profile",
                    variant: "destructive",
                })
            }
        } catch (error) {
            const err = error as Error
            console.error("Error creating doctor:", err)
            toast({
                title: "Error",
                description: err.message || "An unexpected error occurred",
                variant: "destructive",
            })
        }
        finally {
            setSubmitting(false)
        }
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
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => router.push("/admin/doctors")}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Add New Doctor</h2>
                        <p className="text-muted-foreground">Create a new doctor profile with all necessary details.</p>
                    </div>
                </div>
                <Button
                    type="submit"
                    form="add-doctor-form"
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                    disabled={submitting}
                >
                    {submitting ? (
                        <>
                            <MedicalLoader size={16} className="mr-2" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Doctor
                        </>
                    )}
                </Button>
            </div>

            <form id="add-doctor-form" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-1">
                                    <Label htmlFor="title">Title</Label>
                                    <Select onValueChange={(value) => handleSelectChange("title", value)} value={formData.title}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Dr.">Dr.</SelectItem>
                                            <SelectItem value="Prof.">Prof.</SelectItem>
                                            <SelectItem value="Mr.">Mr.</SelectItem>
                                            <SelectItem value="Mrs.">Mrs.</SelectItem>
                                            <SelectItem value="Ms.">Ms.</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-3">
                                    <Label htmlFor="firstName" className="required">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="lastName" className="required">
                                    Last Name
                                </Label>
                                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                            </div>

                            <div>
                                <Label htmlFor="specializations">Specializations</Label>
                                <MultiSelect
                                    value={selectedSpecializations}
                                    onValueChange={setSelectedSpecializations}
                                    placeholder="Select specializations"
                                >
                                    {specializations.map((specialization) => (
                                        <MultiSelectItem key={specialization.id} value={specialization.name}>
                                            {specialization.name}
                                        </MultiSelectItem>
                                    ))}
                                </MultiSelect>
                            </div>

                            <div>
                                <Label htmlFor="licenseNumber">License Number</Label>
                                <Input
                                    id="licenseNumber"
                                    name="licenseNumber"
                                    value={formData.licenseNumber}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                                <Input
                                    id="yearsOfExperience"
                                    name="yearsOfExperience"
                                    type="number"
                                    value={formData.yearsOfExperience}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="consultationFee">Consultation Fee (₹)</Label>
                                <Input
                                    id="consultationFee"
                                    name="consultationFee"
                                    type="number"
                                    value={formData.consultationFee}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="bio">Biography</Label>
                                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} rows={5} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="contactEmail">Email</Label>
                                <Input
                                    id="contactEmail"
                                    name="contactEmail"
                                    type="email"
                                    value={formData.contactEmail}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="contactPhone">Phone</Label>
                                <Input
                                    id="contactPhone"
                                    name="contactPhone"
                                    value={formData.contactPhone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} rows={3} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" name="state" value={formData.state} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="postalCode">Postal Code</Label>
                                    <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" name="country" value={formData.country} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="profileImage">Profile Image URL</Label>
                                <Input
                                    id="profileImage"
                                    name="profileImage"
                                    value={formData.profileImage}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    )
}
