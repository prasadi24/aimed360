"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowLeft,
    Edit,
    Mail,
    Phone,
    MapPin,
    Award,
    Calendar,
    Clock,
    Trash2,
    Plus,
    FileText,
    GraduationCap,
    Star,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { MedicalLoader } from "@/components/ui/loader"
import { getDoctor, getDoctorAvailability } from "@/app/actions/doctors"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    addDoctorEducation,
    deleteDoctorEducation,
    addDoctorCertification,
    deleteDoctorCertification,
} from "@/app/actions/doctors"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Doctor {
    id: string
    title?: string
    first_name: string
    last_name: string
    specialization?: string
    license_number?: string
    years_of_experience?: number
    bio?: string
    consultation_fee?: number
    contact_email?: string
    contact_phone?: string
    address?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
    profile_image?: string
    is_verified: boolean
    is_active: boolean
    rating?: number
    created_at: string
    updated_at: string
    doctor_specializations?: {
        specializations: {
            id: string
            name: string
        }
    }[]
    doctor_education?: {
        id: string
        degree: string
        institution: string
        year_completed?: number
        additional_info?: string
    }[]
    doctor_certifications?: {
        id: string
        certification_name: string
        issuing_organization: string
        issue_date?: string
        expiry_date?: string
        certification_id?: string
    }[]
}

interface Availability {
    id: string
    doctor_id: string
    day_of_week: number
    start_time: string
    end_time: string
    is_available: boolean
}

export default function DoctorDetailPage() {
    const [doctor, setDoctor] = useState<Doctor | null>(null)
    const [availability, setAvailability] = useState<Availability[]>([])
    const [loading, setLoading] = useState(true)
    const [educationForm, setEducationForm] = useState({
        degree: "",
        institution: "",
        yearCompleted: "",
        additionalInfo: "",
    })
    const [certificationForm, setCertificationForm] = useState({
        certificationName: "",
        issuingOrganization: "",
        issueDate: "",
        expiryDate: "",
        certificationId: "",
    })
    const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false)
    const [isCertificationDialogOpen, setIsCertificationDialogOpen] = useState(false)

    const router = useRouter()
    const params = useParams()
    const doctorId = params.id as string

    useEffect(() => {
        fetchDoctorData()
    }, [doctorId])

    async function fetchDoctorData() {
        try {
            setLoading(true)

            // Fetch doctor details
            const doctorResult = await getDoctor(doctorId)
            if (doctorResult.success && doctorResult.doctor) {
                setDoctor(doctorResult.doctor)
            } else {
                console.error("Failed to fetch doctor:", doctorResult.error)
            }

            // Fetch doctor availability
            const availabilityResult = await getDoctorAvailability(doctorId)
            if (availabilityResult.success && availabilityResult.availability) {
                setAvailability(availabilityResult.availability)
            } else {
                console.error("Failed to fetch availability:", availabilityResult.error)
            }
        } catch (error) {
            console.error("Error fetching doctor data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddEducation = async () => {
        try {
            const result = await addDoctorEducation(doctorId, {
                degree: educationForm.degree,
                institution: educationForm.institution,
                yearCompleted: educationForm.yearCompleted ? Number.parseInt(educationForm.yearCompleted) : undefined,
                additionalInfo: educationForm.additionalInfo || undefined,
            })

            if (result.success) {
                setIsEducationDialogOpen(false)
                setEducationForm({
                    degree: "",
                    institution: "",
                    yearCompleted: "",
                    additionalInfo: "",
                })
                fetchDoctorData()
            } else {
                console.error("Failed to add education:", result.error)
            }
        } catch (error) {
            console.error("Error adding education:", error)
        }
    }

    const handleDeleteEducation = async (educationId: string) => {
        try {
            const result = await deleteDoctorEducation(educationId, doctorId)

            if (result.success) {
                fetchDoctorData()
            } else {
                console.error("Failed to delete education:", result.error)
            }
        } catch (error) {
            console.error("Error deleting education:", error)
        }
    }

    const handleAddCertification = async () => {
        try {
            const result = await addDoctorCertification(doctorId, {
                certificationName: certificationForm.certificationName,
                issuingOrganization: certificationForm.issuingOrganization,
                issueDate: certificationForm.issueDate || undefined,
                expiryDate: certificationForm.expiryDate || undefined,
                certificationId: certificationForm.certificationId || undefined,
            })

            if (result.success) {
                setIsCertificationDialogOpen(false)
                setCertificationForm({
                    certificationName: "",
                    issuingOrganization: "",
                    issueDate: "",
                    expiryDate: "",
                    certificationId: "",
                })
                fetchDoctorData()
            } else {
                console.error("Failed to add certification:", result.error)
            }
        } catch (error) {
            console.error("Error adding certification:", error)
        }
    }

    const handleDeleteCertification = async (certificationId: string) => {
        try {
            const result = await deleteDoctorCertification(certificationId, doctorId)

            if (result.success) {
                fetchDoctorData()
            } else {
                console.error("Failed to delete certification:", result.error)
            }
        } catch (error) {
            console.error("Error deleting certification:", error)
        }
    }

    const getSpecializations = () => {
        if (!doctor?.doctor_specializations || doctor.doctor_specializations.length === 0) {
            return doctor?.specialization || "General"
        }

        return doctor.doctor_specializations.map((ds) => ds.specializations.name).join(", ")
    }

    const getDayName = (day: number) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return days[day]
    }

    const formatTime = (time: string) => {
        return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <MedicalLoader size={60} />
            </div>
        )
    }

    if (!doctor) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">Doctor not found.</p>
                <Button variant="outline" className="mt-4" onClick={() => router.push("/admin/doctors")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Doctors
                </Button>
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
                        <h2 className="text-3xl font-bold tracking-tight">
                            {doctor.title ? `${doctor.title} ` : ""}
                            {doctor.first_name} {doctor.last_name}
                        </h2>
                        <p className="text-muted-foreground">{getSpecializations()}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href={`/admin/doctors/${doctor.id}/edit`}>
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                {doctor.profile_image ? (
                                    <img
                                        src={doctor.profile_image || "/placeholder.svg"}
                                        alt={`${doctor.first_name} ${doctor.last_name}`}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-4xl font-medium text-gray-500">
                                        {doctor.first_name[0]}
                                        {doctor.last_name[0]}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-xl font-bold">
                                {doctor.title ? `${doctor.title} ` : ""}
                                {doctor.first_name} {doctor.last_name}
                            </h3>
                            <p className="text-muted-foreground">{getSpecializations()}</p>
                            <div className="flex items-center mt-2">
                                <Badge
                                    variant="outline"
                                    className={doctor.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                                >
                                    {doctor.is_active ? "Active" : "Inactive"}
                                </Badge>
                                {doctor.is_verified && (
                                    <Badge variant="outline" className="bg-blue-100 text-blue-800 ml-2">
                                        Verified
                                    </Badge>
                                )}
                            </div>
                            {doctor.rating && (
                                <div className="flex items-center mt-2">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                    <span>{doctor.rating.toFixed(1)}</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-2">
                                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-muted-foreground">{doctor.contact_email || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-muted-foreground">{doctor.contact_phone || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="text-muted-foreground">
                                        {doctor.address ? (
                                            <>
                                                {doctor.address}
                                                {doctor.city && `, ${doctor.city}`}
                                                {doctor.state && `, ${doctor.state}`}
                                                {doctor.postal_code && ` ${doctor.postal_code}`}
                                                {doctor.country && `, ${doctor.country}`}
                                            </>
                                        ) : (
                                            "Not provided"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">License Number</p>
                                    <p className="text-muted-foreground">{doctor.license_number || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Experience</p>
                                    <p className="text-muted-foreground">
                                        {doctor.years_of_experience ? `${doctor.years_of_experience} years` : "Not provided"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Consultation Fee</p>
                                    <p className="text-muted-foreground">
                                        {doctor.consultation_fee ? `₹${doctor.consultation_fee}` : "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="md:col-span-2 space-y-6">
                    <Tabs defaultValue="bio">
                        <TabsList>
                            <TabsTrigger value="bio">Bio</TabsTrigger>
                            <TabsTrigger value="education">Education</TabsTrigger>
                            <TabsTrigger value="certifications">Certifications</TabsTrigger>
                            <TabsTrigger value="availability">Availability</TabsTrigger>
                        </TabsList>

                        <TabsContent value="bio" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Biography</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {doctor.bio ? (
                                        <p className="whitespace-pre-line">{doctor.bio}</p>
                                    ) : (
                                        <p className="text-muted-foreground">No biography provided.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="education" className="mt-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Education</CardTitle>
                                    <Dialog open={isEducationDialogOpen} onOpenChange={setIsEducationDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button size="sm">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Education
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add Education</DialogTitle>
                                                <DialogDescription>Add educational qualification for this doctor.</DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="degree" className="text-right text-sm font-medium">
                                                        Degree
                                                    </label>
                                                    <Input
                                                        id="degree"
                                                        value={educationForm.degree}
                                                        onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                                                        className="col-span-3"
                                                        placeholder="e.g. MBBS, MD, MS"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="institution" className="text-right text-sm font-medium">
                                                        Institution
                                                    </label>
                                                    <Input
                                                        id="institution"
                                                        value={educationForm.institution}
                                                        onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                                                        className="col-span-3"
                                                        placeholder="e.g. AIIMS, Delhi"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="yearCompleted" className="text-right text-sm font-medium">
                                                        Year
                                                    </label>
                                                    <Input
                                                        id="yearCompleted"
                                                        type="number"
                                                        value={educationForm.yearCompleted}
                                                        onChange={(e) => setEducationForm({ ...educationForm, yearCompleted: e.target.value })}
                                                        className="col-span-3"
                                                        placeholder="e.g. 2015"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="additionalInfo" className="text-right text-sm font-medium">
                                                        Additional Info
                                                    </label>
                                                    <Textarea
                                                        id="additionalInfo"
                                                        value={educationForm.additionalInfo}
                                                        onChange={(e) => setEducationForm({ ...educationForm, additionalInfo: e.target.value })}
                                                        className="col-span-3"
                                                        placeholder="Any additional information"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsEducationDialogOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={handleAddEducation}
                                                    disabled={!educationForm.degree || !educationForm.institution}
                                                >
                                                    Add
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardHeader>
                                <CardContent>
                                    {doctor.doctor_education && doctor.doctor_education.length > 0 ? (
                                        <div className="space-y-4">
                                            {doctor.doctor_education.map((education) => (
                                                <div
                                                    key={education.id}
                                                    className="flex justify-between items-start border-b pb-4 last:border-0"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <GraduationCap className="h-5 w-5 text-blue-600 mt-1" />
                                                        <div>
                                                            <h4 className="font-medium">{education.degree}</h4>
                                                            <p className="text-sm text-muted-foreground">{education.institution}</p>
                                                            {education.year_completed && (
                                                                <p className="text-sm text-muted-foreground">Year: {education.year_completed}</p>
                                                            )}
                                                            {education.additional_info && <p className="text-sm mt-1">{education.additional_info}</p>}
                                                        </div>
                                                    </div>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Delete Education</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete this education record? This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeleteEducation(education.id)}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">No education records found.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="certifications" className="mt-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Certifications</CardTitle>
                                    <Dialog open={isCertificationDialogOpen} onOpenChange={setIsCertificationDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button size="sm">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Certification
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add Certification</DialogTitle>
                                                <DialogDescription>Add certification details for this doctor.</DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="certificationName" className="text-right text-sm font-medium">
                                                        Name
                                                    </label>
                                                    <Input
                                                        id="certificationName"
                                                        value={certificationForm.certificationName}
                                                        onChange={(e) =>
                                                            setCertificationForm({ ...certificationForm, certificationName: e.target.value })
                                                        }
                                                        className="col-span-3"
                                                        placeholder="e.g. Advanced Cardiac Life Support"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="issuingOrganization" className="text-right text-sm font-medium">
                                                        Organization
                                                    </label>
                                                    <Input
                                                        id="issuingOrganization"
                                                        value={certificationForm.issuingOrganization}
                                                        onChange={(e) =>
                                                            setCertificationForm({ ...certificationForm, issuingOrganization: e.target.value })
                                                        }
                                                        className="col-span-3"
                                                        placeholder="e.g. American Heart Association"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="issueDate" className="text-right text-sm font-medium">
                                                        Issue Date
                                                    </label>
                                                    <Input
                                                        id="issueDate"
                                                        type="date"
                                                        value={certificationForm.issueDate}
                                                        onChange={(e) => setCertificationForm({ ...certificationForm, issueDate: e.target.value })}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="expiryDate" className="text-right text-sm font-medium">
                                                        Expiry Date
                                                    </label>
                                                    <Input
                                                        id="expiryDate"
                                                        type="date"
                                                        value={certificationForm.expiryDate}
                                                        onChange={(e) => setCertificationForm({ ...certificationForm, expiryDate: e.target.value })}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="certificationId" className="text-right text-sm font-medium">
                                                        Certificate ID
                                                    </label>
                                                    <Input
                                                        id="certificationId"
                                                        value={certificationForm.certificationId}
                                                        onChange={(e) =>
                                                            setCertificationForm({ ...certificationForm, certificationId: e.target.value })
                                                        }
                                                        className="col-span-3"
                                                        placeholder="e.g. ACLS-123456"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsCertificationDialogOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={handleAddCertification}
                                                    disabled={!certificationForm.certificationName || !certificationForm.issuingOrganization}
                                                >
                                                    Add
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardHeader>
                                <CardContent>
                                    {doctor.doctor_certifications && doctor.doctor_certifications.length > 0 ? (
                                        <div className="space-y-4">
                                            {doctor.doctor_certifications.map((certification) => (
                                                <div
                                                    key={certification.id}
                                                    className="flex justify-between items-start border-b pb-4 last:border-0"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <FileText className="h-5 w-5 text-green-600 mt-1" />
                                                        <div>
                                                            <h4 className="font-medium">{certification.certification_name}</h4>
                                                            <p className="text-sm text-muted-foreground">{certification.issuing_organization}</p>
                                                            <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                                                                {certification.issue_date && (
                                                                    <p>Issued: {new Date(certification.issue_date).toLocaleDateString()}</p>
                                                                )}
                                                                {certification.expiry_date && (
                                                                    <p>Expires: {new Date(certification.expiry_date).toLocaleDateString()}</p>
                                                                )}
                                                            </div>
                                                            {certification.certification_id && (
                                                                <p className="text-sm mt-1">ID: {certification.certification_id}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Delete Certification</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete this certification? This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeleteCertification(certification.id)}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">No certifications found.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="availability" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Availability Schedule</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {availability && availability.length > 0 ? (
                                        <div className="space-y-4">
                                            {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                                                const daySlots = availability.filter((slot) => slot.day_of_week === day)
                                                return (
                                                    <div key={day} className="border-b pb-4 last:border-0">
                                                        <h4 className="font-medium mb-2">{getDayName(day)}</h4>
                                                        {daySlots.length > 0 ? (
                                                            <div className="space-y-2">
                                                                {daySlots.map((slot) => (
                                                                    <div key={slot.id} className="flex items-center gap-2">
                                                                        <Badge
                                                                            variant="outline"
                                                                            className={
                                                                                slot.is_available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                                            }
                                                                        >
                                                                            {slot.is_available ? "Available" : "Unavailable"}
                                                                        </Badge>
                                                                        <span>
                                                                            {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm text-muted-foreground">No slots configured</p>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">No availability schedule found.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
