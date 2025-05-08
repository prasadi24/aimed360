"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Interfaces
export interface Doctor {
    id: string
    user_id: string
    title: string
    first_name: string
    last_name: string
    specialization?: string
    license_number?: string
    years_of_experience?: number
    bio?: string
    consultation_fee?: number
    availability_hours?: object
    profile_image?: string
    contact_email?: string
    contact_phone?: string
    address?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
    is_verified: boolean
    is_active: boolean
    rating?: number
    created_at: string
    updated_at: string
    doctor_specializations?: Array<{
        specializations: {
            id: string
            name: string
        }
    }>
    doctor_education?: Array<{
        id: string
        degree: string
        institution: string
        year_completed?: number
    }>
    doctor_certifications?: Array<{
        id: string
        certification_name: string
        issuing_organization: string
        issue_date?: string
        expiry_date?: string
    }>
}

// First, update the DoctorFormData interface to properly handle the form input types
export interface DoctorFormData {
    title?: string
    firstName: string
    lastName: string
    specialization?: string
    licenseNumber?: string
    yearsOfExperience?: number | null | string // Allow string for form input
    bio?: string
    consultationFee?: number | null | string // Allow string for form input
    contactEmail?: string | null
    contactPhone?: string
    address?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
    profileImage?: string
    userId?: string
    isVerified?: boolean
    isActive?: boolean
    specializations?: string[]
}

export interface Specialization {
    id: string
    name: string
    description?: string
}

// Get all doctors with optional filters
export async function getDoctors(filters?: {
    specialization?: string
    isActive?: boolean
    isVerified?: boolean
    search?: string
}) {
    try {
        const supabase = await createClient()

        let query = supabase.from("doctors").select(`
        *,
        doctor_specializations(
          specializations(id, name)
        )
      `)

        // Apply filters if provided
        if (filters) {
            if (filters.isActive !== undefined) {
                query = query.eq("is_active", filters.isActive)
            }

            if (filters.isVerified !== undefined) {
                query = query.eq("is_verified", filters.isVerified)
            }

            if (filters.search) {
                query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`)
            }

            if (filters.specialization) {
                // This would need to be done differently as it involves a join
                // For now, we'll get all doctors and filter client-side
            }
        }

        const { data, error } = await query

        if (error) {
            console.error("Error fetching doctors:", error)
            return { success: false, error: error.message }
        }

        // If specialization filter is provided, filter the results client-side
        let filteredData = data
        if (filters?.specialization) {
            filteredData = data.filter((doctor: Doctor) =>
                doctor.doctor_specializations?.some(
                    (ds: { specializations: { name: string } }) => ds.specializations.name.toLowerCase() === filters.specialization?.toLowerCase()
                ),
            )
        }

        return { success: true, doctors: filteredData }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in getDoctors:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }


}

// Get a single doctor by ID
export async function getDoctor(doctorId: string) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from("doctors")
            .select(`
        *,
        doctor_specializations(
          specializations(id, name)
        ),
        doctor_education(*),
        doctor_certifications(*)
      `)
            .eq("id", doctorId)
            .single()

        if (error) {
            console.error("Error fetching doctor:", error)
            return { success: false, error: error.message }
        }

        return { success: true, doctor: data }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in getDoctor:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Create a new doctor
export async function createDoctor(doctorData: DoctorFormData) {
    try {
        console.log("Creating doctor with data:", doctorData)

        const supabase = await createClient()

        // Get session for current user ID
        const { data: sessionData } = await supabase.auth.getSession()
        const userId = doctorData.userId || sessionData.session?.user?.id

        if (!userId) {
            console.error("User not authenticated")
            return { success: false, error: "User not authenticated" }
        }

        // Process numeric fields
        const yearsOfExperience =
            typeof doctorData.yearsOfExperience === "string" && doctorData.yearsOfExperience === ""
                ? null
                : typeof doctorData.yearsOfExperience === "string"
                    ? Number(doctorData.yearsOfExperience)
                    : doctorData.yearsOfExperience

        const consultationFee =
            typeof doctorData.consultationFee === "string" && doctorData.consultationFee === ""
                ? null
                : typeof doctorData.consultationFee === "string"
                    ? Number(doctorData.consultationFee)
                    : doctorData.consultationFee

        // Insert doctor record
        const { data, error } = await supabase
            .from("doctors")
            .insert({
                user_id: userId,
                title: doctorData.title,
                first_name: doctorData.firstName,
                last_name: doctorData.lastName,
                specialization: doctorData.specialization,
                license_number: doctorData.licenseNumber,
                years_of_experience: yearsOfExperience,
                bio: doctorData.bio,
                consultation_fee: consultationFee,
                contact_email: doctorData.contactEmail,
                contact_phone: doctorData.contactPhone,
                address: doctorData.address,
                city: doctorData.city,
                state: doctorData.state,
                postal_code: doctorData.postalCode,
                country: doctorData.country,
                profile_image: doctorData.profileImage,
                is_verified: doctorData.isVerified || false,
                is_active: doctorData.isActive !== undefined ? doctorData.isActive : true,
            })
            .select()
            .single()

        if (error) {
            console.error("Error creating doctor:", error)
            return { success: false, error: error.message }
        }

        // If specializations are provided, add them
        if (doctorData.specializations && doctorData.specializations.length > 0) {
            for (const specializationName of doctorData.specializations) {
                // Get or create specialization
                const { data: existingSpec } = await supabase
                    .from("specializations")
                    .select("id")
                    .eq("name", specializationName)
                    .single()

                let specializationId = existingSpec?.id

                if (!specializationId) {
                    // Create the specialization
                    const { data: newSpec, error: specError } = await supabase
                        .from("specializations")
                        .insert({
                            name: specializationName,
                            description: `Specialization in ${specializationName}`,
                        })
                        .select("id")
                        .single()

                    if (specError) {
                        console.error("Error creating specialization:", specError)
                        continue
                    }

                    specializationId = newSpec.id
                }

                // Create mapping
                await supabase.from("doctor_specializations").insert({
                    doctor_id: data.id,
                    specialization_id: specializationId,
                })
            }
        }

        revalidatePath("/admin/doctors")
        return { success: true, doctorId: data.id }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in createDoctor:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Update a doctor
export async function updateDoctor(doctorId: string, doctorData: DoctorFormData) {
    try {
        const supabase = await createClient()

        // Process numeric fields
        const yearsOfExperience =
            typeof doctorData.yearsOfExperience === "string" && doctorData.yearsOfExperience === ""
                ? null
                : typeof doctorData.yearsOfExperience === "string"
                    ? Number(doctorData.yearsOfExperience)
                    : doctorData.yearsOfExperience

        const consultationFee =
            typeof doctorData.consultationFee === "string" && doctorData.consultationFee === ""
                ? null
                : typeof doctorData.consultationFee === "string"
                    ? Number(doctorData.consultationFee)
                    : doctorData.consultationFee

        // Update doctor record
        const { error } = await supabase
            .from("doctors")
            .update({
                title: doctorData.title,
                first_name: doctorData.firstName,
                last_name: doctorData.lastName,
                specialization: doctorData.specialization,
                license_number: doctorData.licenseNumber,
                years_of_experience: yearsOfExperience,
                bio: doctorData.bio,
                consultation_fee: consultationFee,
                contact_email: doctorData.contactEmail,
                contact_phone: doctorData.contactPhone,
                address: doctorData.address,
                city: doctorData.city,
                state: doctorData.state,
                postal_code: doctorData.postalCode,
                country: doctorData.country,
                profile_image: doctorData.profileImage,
                is_verified: doctorData.isVerified,
                is_active: doctorData.isActive,
                updated_at: new Date().toISOString(),
            })
            .eq("id", doctorId)

        if (error) {
            console.error("Error updating doctor:", error)
            return { success: false, error: error.message }
        }

        // If specializations are provided, update them
        if (doctorData.specializations) {
            // First, get current specializations
            const { data: currentMappings } = await supabase
                .from("doctor_specializations")
                .select("specialization_id, specializations(name)")
                .eq("doctor_id", doctorId)

            const currentSpecNames = currentMappings
                ? currentMappings.flatMap((m: { specializations: { name: string }[] }) =>
                    m.specializations.map((s) => s.name)
                )
                : []



            // Calculate specs to add and remove
            const specsToAdd = doctorData.specializations.filter((s: string) => !currentSpecNames.includes(s))
            const specsToRemove = currentSpecNames.filter((s: string) => !doctorData.specializations!.includes(s))

            // Get IDs of specs to remove
            const specIdsToRemove = currentMappings
                ? currentMappings
                    .filter((m: { specializations: { name: string }[] }) =>
                        m.specializations.some((s) => specsToRemove.includes(s.name))
                    )

                    .map((m: { specialization_id: string }) => m.specialization_id)
                : []

            // Remove old mappings
            if (specIdsToRemove.length > 0) {
                await supabase
                    .from("doctor_specializations")
                    .delete()
                    .eq("doctor_id", doctorId)
                    .in("specialization_id", specIdsToRemove)
            }

            // Add new mappings
            for (const specializationName of specsToAdd) {
                // Get or create specialization
                const { data: existingSpec } = await supabase
                    .from("specializations")
                    .select("id")
                    .eq("name", specializationName)
                    .single()

                let specializationId = existingSpec?.id

                if (!specializationId) {
                    // Create the specialization
                    const { data: newSpec, error: specError } = await supabase
                        .from("specializations")
                        .insert({
                            name: specializationName,
                            description: `Specialization in ${specializationName}`,
                        })
                        .select("id")
                        .single()

                    if (specError) {
                        console.error("Error creating specialization:", specError)
                        continue
                    }

                    specializationId = newSpec.id
                }

                // Create mapping
                await supabase.from("doctor_specializations").insert({
                    doctor_id: doctorId,
                    specialization_id: specializationId,
                })
            }
        }

        revalidatePath(`/admin/doctors/${doctorId}`)
        revalidatePath("/admin/doctors")
        return { success: true }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in updateDoctor:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Delete a doctor
export async function deleteDoctor(doctorId: string) {
    try {
        const supabase = await createClient()

        const { error } = await supabase.from("doctors").delete().eq("id", doctorId)

        if (error) {
            console.error("Error deleting doctor:", error)
            return { success: false, error: error.message }
        }

        revalidatePath("/admin/doctors")
        return { success: true }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in deleteDoctor:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Toggle doctor active status
export async function toggleDoctorStatus(doctorId: string, isActive: boolean) {
    try {
        const supabase = await createClient()

        const { error } = await supabase
            .from("doctors")
            .update({
                is_active: isActive,
                updated_at: new Date().toISOString(),
            })
            .eq("id", doctorId)

        if (error) {
            console.error("Error toggling doctor status:", error)
            return { success: false, error: error.message }
        }

        revalidatePath(`/admin/doctors/${doctorId}`)
        revalidatePath("/admin/doctors")
        return { success: true }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in toggleDoctorStatus:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Toggle doctor verified status
export async function toggleDoctorVerifiedStatus(doctorId: string, isVerified: boolean) {
    try {
        const supabase = await createClient()

        const { error } = await supabase
            .from("doctors")
            .update({
                is_verified: isVerified,
                updated_at: new Date().toISOString(),
            })
            .eq("id", doctorId)

        if (error) {
            console.error("Error toggling doctor verified status:", error)
            return { success: false, error: error.message }
        }

        revalidatePath(`/admin/doctors/${doctorId}`)
        revalidatePath("/admin/doctors")
        return { success: true }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in toggleDoctorVerifiedStatus:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Get all specializations
export async function getSpecializations() {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase.from("specializations").select("*").order("name")

        if (error) {
            console.error("Error fetching specializations:", error)
            return { success: false, error: error.message }
        }

        return { success: true, specializations: data }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in getSpecializations:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Add education to a doctor
export async function addDoctorEducation(
    doctorId: string,
    educationData: {
        degree: string
        institution: string
        yearCompleted?: number
        additionalInfo?: string
    },
) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from("doctor_education")
            .insert({
                doctor_id: doctorId,
                degree: educationData.degree,
                institution: educationData.institution,
                year_completed: educationData.yearCompleted,
                additional_info: educationData.additionalInfo,
            })
            .select()
            .single()

        if (error) {
            console.error("Error adding doctor education:", error)
            return { success: false, error: error.message }
        }

        revalidatePath(`/admin/doctors/${doctorId}`)
        return { success: true, educationId: data.id }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in addDoctorEducation:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Delete doctor education
export async function deleteDoctorEducation(educationId: string, doctorId: string) {
    try {
        const supabase = await createClient()

        const { error } = await supabase.from("doctor_education").delete().eq("id", educationId)

        if (error) {
            console.error("Error deleting doctor education:", error)
            return { success: false, error: error.message }
        }

        revalidatePath(`/admin/doctors/${doctorId}`)
        return { success: true }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in deleteDoctorEducation:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Add certification to a doctor
export async function addDoctorCertification(
    doctorId: string,
    certificationData: {
        certificationName: string
        issuingOrganization: string
        issueDate?: string
        expiryDate?: string
        certificationId?: string
    },
) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from("doctor_certifications")
            .insert({
                doctor_id: doctorId,
                certification_name: certificationData.certificationName,
                issuing_organization: certificationData.issuingOrganization,
                issue_date: certificationData.issueDate,
                expiry_date: certificationData.expiryDate,
                certification_id: certificationData.certificationId,
            })
            .select()
            .single()

        if (error) {
            console.error("Error adding doctor certification:", error)
            return { success: false, error: error.message }
        }

        revalidatePath(`/admin/doctors/${doctorId}`)
        return { success: true, certificationId: data.id }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in addDoctorCertification:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Delete doctor certification
export async function deleteDoctorCertification(certificationId: string, doctorId: string) {
    try {
        const supabase = await createClient()

        const { error } = await supabase.from("doctor_certifications").delete().eq("id", certificationId)

        if (error) {
            console.error("Error deleting doctor certification:", error)
            return { success: false, error: error.message }
        }

        revalidatePath(`/admin/doctors/${doctorId}`)
        return { success: true }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in deleteDoctorCertification:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Add availability slot for a doctor
export async function addDoctorAvailability(
    doctorId: string,
    availabilityData: {
        dayOfWeek: number
        startTime: string
        endTime: string
    },
) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from("doctor_availability")
            .insert({
                doctor_id: doctorId,
                day_of_week: availabilityData.dayOfWeek,
                start_time: availabilityData.startTime,
                end_time: availabilityData.endTime,
            })
            .select()
            .single()

        if (error) {
            console.error("Error adding doctor availability:", error)
            return { success: false, error: error.message }
        }

        revalidatePath(`/admin/doctors/${doctorId}`)
        return { success: true, availabilityId: data.id }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in addDoctorAvailability:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Delete doctor availability slot
export async function deleteDoctorAvailability(availabilityId: string, doctorId: string) {
    try {
        const supabase = await createClient()

        const { error } = await supabase.from("doctor_availability").delete().eq("id", availabilityId)

        if (error) {
            console.error("Error deleting doctor availability:", error)
            return { success: false, error: error.message }
        }

        revalidatePath(`/admin/doctors/${doctorId}`)
        return { success: true }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in deleteDoctorAvailability:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}

// Get doctor availability slots
export async function getDoctorAvailability(doctorId: string) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from("doctor_availability")
            .select("*")
            .eq("doctor_id", doctorId)
            .order("day_of_week")
            .order("start_time")

        if (error) {
            console.error("Error fetching doctor availability:", error)
            return { success: false, error: error.message }
        }

        return { success: true, availability: data }
    } catch (error) {
        const err = error as Error
        console.error("Unexpected error in getDoctorAvailability:", err)
        return { success: false, error: err.message || "An unexpected error occurred" }
    }
}
