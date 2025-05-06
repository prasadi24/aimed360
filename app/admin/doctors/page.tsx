"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { getDoctors, toggleDoctorStatus, deleteDoctor } from "@/app/actions/doctors"
import { MedicalLoader } from "@/components/ui/loader"
import { DoctorFormModal } from "@/components/admin/doctor-form-modal"
import { Search, Edit, Trash2, Eye, ArrowUpDown, UserPlus, RefreshCw } from "lucide-react"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Doctor {
    id: string
    first_name: string
    last_name: string
    title?: string
    specialization?: string
    license_number?: string
    contact_email?: string
    contact_phone?: string
    is_active: boolean
    doctor_specializations?: {
        specializations: {
            id: string
            name: string
        }
    }[]
}

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null)
    const [statusUpdating, setStatusUpdating] = useState<string | null>(null)
    const router = useRouter()

    const fetchDoctors = async () => {
        setIsLoading(true)
        try {
            const result = await getDoctors()
            if (result.success) {
                setDoctors(result.doctors || [])
            } else {
                toast.error(`Failed to fetch doctors: ${result.error}`)
            }
        } catch (error) {
            console.error("Error fetching doctors:", error)
            toast.error("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchDoctors()
    }, [])

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            setStatusUpdating(id)
            // Pass both the doctor ID and the new status (opposite of current)
            const result = await toggleDoctorStatus(id, !currentStatus)
            if (result.success) {
                setDoctors(doctors.map((doctor) => (doctor.id === id ? { ...doctor, is_active: !currentStatus } : doctor)))
                toast.success(`Doctor status ${!currentStatus ? "activated" : "deactivated"}`)
            } else {
                toast.error(`Failed to update status: ${result.error}`)
            }
        } catch (error) {
            console.error("Error toggling doctor status:", error)
            toast.error("An unexpected error occurred")
        } finally {
            setStatusUpdating(null)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const result = await deleteDoctor(id)
            if (result.success) {
                setDoctors(doctors.filter((doctor) => doctor.id !== id))
                toast.success("Doctor deleted successfully")
            } else {
                toast.error(`Failed to delete doctor: ${result.error}`)
            }
        } catch (error) {
            console.error("Error deleting doctor:", error)
            toast.error("An unexpected error occurred")
        }
    }

    const handleEdit = (id: string) => {
        setSelectedDoctorId(id)
        setIsEditModalOpen(true)
    }

    const handleView = (id: string) => {
        router.push(`/admin/doctors/${id}`)
    }

    const getSpecializations = (doctor: Doctor) => {
        if (doctor.doctor_specializations && doctor.doctor_specializations.length > 0) {
            return doctor.doctor_specializations.map((ds) => ds.specializations.name).join(", ")
        }
        return doctor.specialization || "Not specified"
    }

    const filteredDoctors = doctors.filter(
        (doctor) =>
            doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            getSpecializations(doctor).toLowerCase().includes(searchTerm.toLowerCase()) ||
            (doctor.license_number && doctor.license_number.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl">Doctors Management</CardTitle>
                        <CardDescription>Manage your medical staff and their information</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={fetchDoctors} className="flex items-center">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                        <Button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all"
                            size="lg"
                        >
                            <UserPlus className="h-5 w-5 mr-2" />
                            Add Doctor
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search doctors..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <MedicalLoader size={40} />
                        </div>
                    ) : filteredDoctors.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No doctors found</p>
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[250px]">
                                            <div className="flex items-center space-x-1">
                                                <span>Name</span>
                                                <ArrowUpDown className="h-3 w-3" />
                                            </div>
                                        </TableHead>
                                        <TableHead>Specialization</TableHead>
                                        <TableHead>License</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredDoctors.map((doctor) => (
                                        <TableRow key={doctor.id}>
                                            <TableCell className="font-medium">
                                                {doctor.title ? `${doctor.title} ` : ""}
                                                {doctor.first_name} {doctor.last_name}
                                            </TableCell>
                                            <TableCell>
                                                {doctor.doctor_specializations && doctor.doctor_specializations.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1">
                                                        {doctor.doctor_specializations.slice(0, 2).map((ds) => (
                                                            <Badge key={ds.specializations.id} variant="outline">
                                                                {ds.specializations.name}
                                                            </Badge>
                                                        ))}
                                                        {doctor.doctor_specializations.length > 2 && (
                                                            <Badge variant="outline">+{doctor.doctor_specializations.length - 2} more</Badge>
                                                        )}
                                                    </div>
                                                ) : doctor.specialization ? (
                                                    <Badge variant="outline">{doctor.specialization}</Badge>
                                                ) : (
                                                    <span className="text-gray-400">Not specified</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {doctor.license_number || <span className="text-gray-400">Not specified</span>}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    {doctor.contact_email && <span className="text-xs">{doctor.contact_email}</span>}
                                                    {doctor.contact_phone && <span className="text-xs">{doctor.contact_phone}</span>}
                                                    {!doctor.contact_email && !doctor.contact_phone && (
                                                        <span className="text-gray-400">Not specified</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    {statusUpdating === doctor.id ? (
                                                        <MedicalLoader size={16} />
                                                    ) : (
                                                        <Switch
                                                            checked={doctor.is_active}
                                                            onCheckedChange={() => handleToggleStatus(doctor.id, doctor.is_active)}
                                                        />
                                                    )}
                                                    <span>{doctor.is_active ? "Active" : "Inactive"}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button variant="outline" size="icon" onClick={() => handleView(doctor.id)}>
                                                                    <Eye className="h-4 w-4" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>View Doctor</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button variant="outline" size="icon" onClick={() => handleEdit(doctor.id)}>
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Edit Doctor</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <AlertDialog>
                                                                    <AlertDialogTrigger asChild>
                                                                        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700">
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle>Delete Doctor</AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                                Are you sure you want to delete this doctor? This action cannot be undone.
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                            <AlertDialogAction
                                                                                onClick={() => handleDelete(doctor.id)}
                                                                                className="bg-red-500 hover:bg-red-600"
                                                                            >
                                                                                Delete
                                                                            </AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Delete Doctor</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <DoctorFormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={fetchDoctors} />

            {selectedDoctorId && (
                <DoctorFormModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false)
                        setSelectedDoctorId(null)
                    }}
                    doctorId={selectedDoctorId}
                    onSuccess={fetchDoctors}
                />
            )}
        </div>
    )
}
