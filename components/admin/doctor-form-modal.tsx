"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getDoctor, createDoctor, updateDoctor, getSpecializations } from "@/app/actions/doctors"
import { MedicalLoader } from "@/components/ui/loader"
import {
    Check,
    ChevronRight,
    ChevronLeft,
    User,
    Briefcase,
    MapPin,
    Mail,
    X,
    AlertTriangle,
    UserPlus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Define the form schema with Zod
const doctorFormSchema = z.object({
    title: z.string().default("Dr."),
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    specializations: z.array(z.string()).default([]),
    licenseNumber: z.string().min(1, { message: "License number is required." }),
    yearsOfExperience: z.coerce.number().int().positive({ message: "Years of experience is required." }),
    bio: z.string().optional(),
    consultationFee: z.coerce.number().positive({ message: "Consultation fee is required." }),
    contactEmail: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal("")),
    contactPhone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().default("India"),
})

type DoctorFormValues = z.infer<typeof doctorFormSchema>

interface Specialization {
    id: string
    name: string
    description?: string
}

interface DoctorFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    doctorId?: string // Optional doctorId for edit mode
}

// Define form steps
const formSteps = [
    {
        id: "personal",
        title: "Personal Information",
        description: "Basic information about the doctor",
        icon: <User className="h-5 w-5" />,
        fields: ["title", "firstName", "lastName", "bio"] as const,
    },
    {
        id: "professional",
        title: "Professional Details",
        description: "Professional qualifications and expertise",
        icon: <Briefcase className="h-5 w-5" />,
        fields: ["specializations", "licenseNumber", "yearsOfExperience", "consultationFee"] as const,
    },
    {
        id: "contact",
        title: "Contact Information",
        description: "How to reach the doctor",
        icon: <Mail className="h-5 w-5" />,
        fields: ["contactEmail", "contactPhone"] as const,
    },
    {
        id: "address",
        title: "Address",
        description: "Location information",
        icon: <MapPin className="h-5 w-5" />,
        fields: ["address", "city", "state", "postalCode", "country"] as const,
    },
]

export function DoctorFormModal({ isOpen, onClose, onSuccess, doctorId }: DoctorFormModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [specializations, setSpecializations] = useState<Specialization[]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const [submitError, setSubmitError] = useState<string | null>(null)
    // const router = useRouter()
    const [isEditMode, setIsEditMode] = useState(false)

    // Initialize the form
    const form = useForm<DoctorFormValues>({
        resolver: zodResolver(doctorFormSchema),
        defaultValues: {
            title: "Dr.",
            firstName: "",
            lastName: "",
            specializations: [],
            licenseNumber: "",
            yearsOfExperience: 0,
            bio: "",
            consultationFee: 0,
            contactEmail: "",
            contactPhone: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: "India", // Default country to India
        },
        mode: "onBlur", // Changed from onChange to onBlur to validate when leaving fields
    })

    // Get form state for validation
    const { errors } = form.formState

    // Fetch specializations when the modal opens
    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const result = await getSpecializations()
                if (result.success && result.specializations) {
                    setSpecializations(result.specializations)
                } else {
                    console.error("Failed to fetch specializations:", result.error)
                    toast.error("Failed to load specializations")
                }
            } catch (error) {
                console.error("Error fetching specializations:", error)
                toast.error("An error occurred while loading specializations")
            }
        }

        if (isOpen) {
            fetchSpecializations()
        }
    }, [isOpen])

    // Reset form and step when modal closes
    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(0)
            setSubmitError(null)
            form.reset({
                title: "Dr.",
                firstName: "",
                lastName: "",
                specializations: [],
                licenseNumber: "",
                yearsOfExperience: 0,
                bio: "",
                consultationFee: 0,
                contactEmail: "",
                contactPhone: "",
                address: "",
                city: "",
                state: "",
                postalCode: "",
                country: "India", // Ensure country is reset to India
            })
        }
    }, [isOpen, form])

    // Fetch doctor data when editing
    useEffect(() => {
        const fetchDoctorData = async () => {
            if (!doctorId) return

            setIsEditMode(true)
            setIsLoading(true)

            try {
                const result = await getDoctor(doctorId)
                if (result.success && result.doctor) {
                    const doctor = result.doctor

                    // Map doctor data to form values
                    form.reset({
                        title: doctor.title || "Dr.",
                        firstName: doctor.first_name,
                        lastName: doctor.last_name,
                        specializations:
                            doctor.doctor_specializations?.map(
                                (ds: { specializations: { name: string } }) => ds.specializations.name,
                            ) || [],
                        licenseNumber: doctor.license_number || "",
                        yearsOfExperience: doctor.years_of_experience === null ? "" : doctor.years_of_experience,
                        bio: doctor.bio || "",
                        consultationFee: doctor.consultation_fee === null ? "" : doctor.consultation_fee,
                        contactEmail: doctor.contact_email || "",
                        contactPhone: doctor.contact_phone || "",
                        address: doctor.address || "",
                        city: doctor.city || "",
                        state: doctor.state || "",
                        postalCode: doctor.postal_code || "",
                        country: doctor.country || "India",
                    })
                } else {
                    toast.error(`Failed to load doctor: ${result.error}`)
                    onClose()
                }
            } catch (error) {
                console.error("Error fetching doctor data:", error)
                toast.error("An error occurred while loading doctor data")
                onClose()
            } finally {
                setIsLoading(false)
            }
        }

        if (isOpen && doctorId) {
            fetchDoctorData()
        } else {
            setIsEditMode(false)
        }
    }, [isOpen, doctorId, form, onClose])

    // Check if a step has validation errors
    const stepHasErrors = (stepIndex: number) => {
        const stepFields = formSteps[stepIndex].fields
        return stepFields.some((field) => !!errors[field])
    }

    // Handle form submission
    const onSubmit = async (data: DoctorFormValues) => {
        setIsLoading(true)
        setSubmitError(null)

        try {
            console.log("Submitting form data:", data)

            // Convert empty strings to null for numeric fields
            const formattedData = {
                ...data,
                yearsOfExperience:
                    typeof data.yearsOfExperience === "undefined" || data.yearsOfExperience === 0 ? null : data.yearsOfExperience,
                consultationFee:
                    typeof data.consultationFee === "undefined" || data.consultationFee === 0 ? null : data.consultationFee,
                contactEmail: data.contactEmail === "" ? null : data.contactEmail,
                userId: undefined,
            }

            console.log("Formatted data for submission:", formattedData)

            let result
            if (isEditMode && doctorId) {
                result = await updateDoctor(doctorId, formattedData)
            } else {
                result = await createDoctor(formattedData)
            }

            console.log("Server response:", result)

            if (result.success) {
                if (isEditMode) {
                    toast.success(`Doctor ${data.firstName} ${data.lastName} updated successfully`, {
                        description: "The doctor's information has been updated in the system.",
                        duration: 5000,
                    })
                } else {
                    toast.success(`Doctor ${data.firstName} ${data.lastName} added successfully`, {
                        description: "The new doctor has been added to the system.",
                        duration: 5000,
                    })
                }
                form.reset()
                onSuccess()
                onClose()
            } else {
                console.error(`Failed to ${isEditMode ? "update" : "add"} doctor:`, result.error)
                setSubmitError(result.error || `Failed to ${isEditMode ? "update" : "add"} doctor`)
                toast.error(`Failed to ${isEditMode ? "update" : "add"} doctor: ${result.error}`, {
                    description: "Please try again or contact support if the issue persists.",
                    duration: 7000,
                })
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error ${isEditMode ? "updating" : "adding"} doctor:`, error.message)
                setSubmitError(error.message)
            } else {
                console.error(`Unknown error ${isEditMode ? "updating" : "adding"} doctor:`, error)
                setSubmitError("An unexpected error occurred")
            }

            toast.error(`An unexpected error occurred while ${isEditMode ? "updating" : "adding"} the doctor`)
        }
        finally {
            setIsLoading(false)
        }
    }

    // Check if current step fields are valid
    // const currentStepIsValid = () => {
    //     const currentFields = formSteps[currentStep].fields
    //     return currentFields.every((field) => {
    //         // Skip validation for optional fields that are empty
    //         if (field !== "firstName" && field !== "lastName" && !form.getValues(field)) {
    //             return true
    //         }
    //         return !errors[field]
    //     })
    // }

    // Navigate to next step
    const handleNext = async () => {
        const isValid = await form.trigger(formSteps[currentStep].fields)
        if (isValid) {
            if (currentStep < formSteps.length - 1) {
                setCurrentStep((prev) => prev + 1)
            }
        }
    }

    // Navigate to previous step
    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    // Toggle a specialization
    const toggleSpecialization = (value: string) => {
        const currentSpecializations = form.getValues("specializations") || []
        if (currentSpecializations.includes(value)) {
            form.setValue(
                "specializations",
                currentSpecializations.filter((spec) => spec !== value),
                { shouldValidate: true, shouldDirty: true },
            )
        } else {
            form.setValue("specializations", [...currentSpecializations, value], { shouldValidate: true, shouldDirty: true })
        }
    }

    // Handle final submission
    const handleFinalSubmit = async () => {
        // Validate all fields before submission
        const isValid = await form.trigger()
        if (isValid) {
            const data = form.getValues()
            await onSubmit(data)
        } else {
            // Find the first step with errors and navigate to it
            for (let i = 0; i < formSteps.length; i++) {
                if (stepHasErrors(i)) {
                    setCurrentStep(i)
                    toast.error("Please fix the errors before submitting")
                    break
                }
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[1035px] p-0 bg-white overflow-hidden" style={{ height: "700px" }}>
                {/* Add DialogTitle for accessibility - visually hidden but available to screen readers */}
                <DialogTitle className="sr-only">{isEditMode ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>

                <div className="flex h-full">
                    {/* Sidebar with steps */}
                    <div className="w-72 bg-gray-50 p-6 border-r">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">{isEditMode ? "Edit Doctor" : "Add New Doctor"}</h3>
                            <p className="text-sm text-gray-500">Complete all information</p>
                        </div>

                        <div className="space-y-4">
                            {formSteps.map((step, index) => {
                                const hasErrors = stepHasErrors(index)
                                return (
                                    <button
                                        key={step.id}
                                        onClick={() => setCurrentStep(index)}
                                        className={cn(
                                            "flex items-center w-full p-3 rounded-lg text-left transition-colors",
                                            currentStep === index
                                                ? hasErrors
                                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                    : "bg-blue-50 text-blue-700 border border-blue-200"
                                                : hasErrors
                                                    ? "text-amber-700 hover:bg-amber-50"
                                                    : "text-gray-700 hover:bg-gray-100",
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "flex items-center justify-center w-8 h-8 rounded-full mr-3",
                                                currentStep === index
                                                    ? hasErrors
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-blue-100 text-blue-700"
                                                    : hasErrors
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-gray-100 text-gray-500",
                                            )}
                                        >
                                            {index < currentStep ? (
                                                <Check className="h-4 w-4" />
                                            ) : hasErrors ? (
                                                <AlertTriangle className="h-4 w-4" />
                                            ) : (
                                                step.icon
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{step.title}</p>
                                            <p className="text-xs text-gray-500">{step.description}</p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-8 overflow-y-auto flex flex-col">
                        <Form {...form}>
                            <form className="space-y-6 flex flex-col flex-1">
                                {/* Step 1: Personal Information */}
                                {currentStep === 0 && (
                                    <div className="space-y-4 min-h-[400px]">
                                        <div className="flex items-start space-x-4">
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem className="w-1/4 min-h-[85px]">
                                                        <FormLabel>Title</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Dr." {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-amber-600" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1 min-h-[85px]">
                                                        <FormLabel>First Name *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John" required {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-amber-600" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1 min-h-[85px]">
                                                        <FormLabel>Last Name *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Smith" required {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-amber-600" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="bio"
                                            render={({ field }) => (
                                                <FormItem className="min-h-[85px]">
                                                    <FormLabel>Bio</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Brief description of the doctor's background and expertise"
                                                            className="resize-none h-32"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-amber-600" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {/* Step 2: Professional Details */}
                                {currentStep === 1 && (
                                    <div className="space-y-4 min-h-[400px]">
                                        <FormField
                                            control={form.control}
                                            name="specializations"
                                            render={({ field }) => (
                                                <FormItem className="min-h-[120px]">
                                                    <FormLabel>Specializations</FormLabel>
                                                    <div className="space-y-2">
                                                        <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto border rounded-md p-3">
                                                            {specializations.map((spec) => (
                                                                <div key={spec.id} className="flex items-center space-x-2">
                                                                    <Checkbox
                                                                        id={`spec-${spec.id}`}
                                                                        checked={field.value?.includes(spec.name)}
                                                                        onCheckedChange={() => toggleSpecialization(spec.name)}
                                                                    />
                                                                    <label htmlFor={`spec-${spec.id}`} className="text-sm cursor-pointer">
                                                                        {spec.name}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {field.value?.map((spec) => (
                                                                <Badge key={spec} variant="secondary" className="px-2 py-1">
                                                                    {spec}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => toggleSpecialization(spec)}
                                                                        className="ml-1 text-gray-500 hover:text-gray-700"
                                                                    >
                                                                        <X className="h-3 w-3" />
                                                                    </button>
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <FormMessage className="text-amber-600" />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex items-center space-x-4">
                                            <FormField
                                                control={form.control}
                                                name="licenseNumber"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1 min-h-[85px]">
                                                        <FormLabel>License Number *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="MED12345" required {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-amber-600" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="yearsOfExperience"
                                                render={({ field }) => (
                                                    <FormItem className="w-1/3 min-h-[85px]">
                                                        <FormLabel>Years of Experience *</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                placeholder="10"
                                                                required
                                                                {...field}
                                                                value={field.value === undefined ? "" : field.value}
                                                                onChange={(e) => {
                                                                    const value = e.target.value
                                                                    field.onChange(value === "" ? "" : Number.parseInt(value, 10))
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-amber-600" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="consultationFee"
                                            render={({ field }) => (
                                                <FormItem className="w-1/3 min-h-[85px]">
                                                    <FormLabel>Consultation Fee *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            placeholder="1500"
                                                            required
                                                            {...field}
                                                            value={field.value === undefined ? "" : field.value}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                field.onChange(value === "" ? "" : Number.parseFloat(value))
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-amber-600" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {/* Step 3: Contact Information */}
                                {currentStep === 2 && (
                                    <div className="space-y-4 min-h-[400px]">
                                        <div className="flex items-center space-x-4">
                                            <FormField
                                                control={form.control}
                                                name="contactEmail"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1 min-h-[85px]">
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="doctor@example.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-amber-600" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="contactPhone"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1 min-h-[85px]">
                                                        <FormLabel>Phone</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="+91 98765 43210" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-amber-600" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Address */}
                                {currentStep === 3 && (
                                    <div className="space-y-4 min-h-[400px]">
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem className="min-h-[85px]">
                                                    <FormLabel>Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="123 Medical Center Drive" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-amber-600" />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="city"
                                                render={({ field }) => (
                                                    <FormItem className="min-h-[85px]">
                                                        <FormLabel>City *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Vijayawada" required {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-amber-600" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="state"
                                                render={({ field }) => (
                                                    <FormItem className="min-h-[85px]">
                                                        <FormLabel>State</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Andhra Pradesh" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-amber-600" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="postalCode"
                                                render={({ field }) => (
                                                    <FormItem className="min-h-[85px]">
                                                        <FormLabel>Postal Code</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="520010" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-amber-600" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="country"
                                                render={({ field }) => (
                                                    <FormItem className="min-h-[85px]">
                                                        <FormLabel>Country</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="India" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-amber-600" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Display submission error if any */}
                                {submitError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{submitError}</div>
                                )}

                                {/* Navigation buttons */}
                                <div className="flex justify-between pt-4 border-t mt-auto">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handlePrevious}
                                        disabled={currentStep === 0 || isLoading}
                                        className="border-teal-300 text-teal-700 hover:bg-teal-50 min-w-[100px]"
                                    >
                                        <ChevronLeft className="mr-2 h-4 w-4" />
                                        Previous
                                    </Button>

                                    <div className="flex space-x-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={onClose}
                                            disabled={isLoading}
                                            className="border-slate-300 text-slate-700 hover:bg-slate-50 min-w-[100px]"
                                        >
                                            Cancel
                                        </Button>

                                        {currentStep === formSteps.length - 1 ? (
                                            <Button
                                                type="button"
                                                onClick={handleFinalSubmit}
                                                disabled={isLoading}
                                                className="flex items-center bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white min-w-[140px] justify-center"
                                            >
                                                <UserPlus className="h-5 w-5 mr-2" />
                                                {isLoading ? <MedicalLoader size={20} /> : isEditMode ? "Update Doctor" : "Add Doctor"}
                                            </Button>
                                        ) : (
                                            <Button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={isLoading}
                                                variant="outline"
                                                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 min-w-[100px]"
                                            >
                                                Next
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
