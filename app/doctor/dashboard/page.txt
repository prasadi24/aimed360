import { checkAuthStatus } from "@/app/actions/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { CalendarView } from "@/components/dashboard/calendar-view"
import { DataTable } from "@/components/dashboard/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { Users, Calendar, Clock, FileText, Plus, Search, MessageSquare, Stethoscope } from "lucide-react"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"

// Sample data for patients
type Patient = {
    id: string
    name: string
    age: number
    gender: string
    condition: string
    lastVisit: string
    status: "active" | "scheduled" | "discharged"
}

const patients: Patient[] = [
    {
        id: "P001",
        name: "John Smith",
        age: 45,
        gender: "Male", \
        condition: "Hypertension\",  = [
  {
        id: "P001",
        name: "John Smith",
        age: 45,
        gender: "Male",
        condition: "Hypertension",
        lastVisit: "2023-04-28",
        status: "active"
    },
    {
        id: "P002",
        name: "Emily Johnson",
        age: 32,
        gender: "Female",
        condition: "Diabetes Type 2",
        lastVisit: "2023-05-01",
        status: "active"
    },
    {
        id: "P003",
        name: "Robert Davis",
        age: 58,
        gender: "Male",
        condition: "Coronary Artery Disease",
        lastVisit: "2023-04-15",
        status: "scheduled"
    },
    {
        id: "P004",
        name: "Sarah Williams",
        age: 29,
        gender: "Female",
        condition: "Asthma",
        lastVisit: "2023-04-22",
        status: "active"
    },
    {
        id: "P005",
        name: "Michael Brown",
        age: 67,
        gender: "Male",
        condition: "Arthritis",
        lastVisit: "2023-04-30",
        status: "discharged"
    },
]

// Sample data for appointments
const appointments = [
    {
        id: "A001",
        title: "John Smith",
        date: new Date(2023, 4, 5, 10, 30),
        time: "10:30 AM",
        type: "Follow-up",
        status: "scheduled",
    },
    {
        id: "A002",
        title: "Emily Johnson",
        date: new Date(2023, 4, 5, 14, 15),
        time: "2:15 PM",
        type: "Initial Consultation",
        status: "scheduled",
    },
    {
        id: "A003",
        title: "Robert Davis",
        date: new Date(2023, 4, 6, 9, 0),
        time: "9:00 AM",
        type: "Test Results",
        status: "scheduled",
    },
    {
        id: "A004",
        title: "Sarah Williams",
        date: new Date(2023, 4, 7, 11, 45),
        time: "11:45 AM",
        type: "Follow-up",
        status: "scheduled",
    },
    {
        id: "A005",
        title: "Michael Brown",
        date: new Date(2023, 4, 4, 15, 30),
        time: "3:30 PM",
        type: "Prescription Renewal",
        status: "completed",
    },
]

// Define columns for the patients table
const patientColumns: ColumnDef<Patient>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "age",
        header: "Age",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "condition",
        header: "Condition",
    },
    {
        accessorKey: "lastVisit",
        header: "Last Visit",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <div className="flex items-center">
                    <span
                        className={`h-2 w-2 rounded-full mr-2 ${status === "active" ? "bg-green-500" : status === "scheduled" ? "bg-blue-500" : "bg-gray-500"
                            }`}
                    />
                    <span className="capitalize">{status}</span>
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const patient = row.original
            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/doctor/patients/${patient.id}`}>View</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/doctor/patients/${patient.id}/records`}>Records</Link>
                    </Button>
                </div>
            )
        },
    },
]

export default async function DoctorDashboardPage() {
    const { authenticated, user, role } = await checkAuthStatus()

    if (!authenticated || role !== "Doctor") {
        redirect("/login")
    }

    const userName = user.user_metadata?.first_name
        ? `Dr. ${user.user_metadata.first_name} ${user.user_metadata.last_name}`
        : user.email

    return (
        <DashboardLayout role="Doctor" userName={userName}>
            <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="My Patients"
                        value="128"
                        description="+3 new this week"
                        icon={Users}
                        trend={{ value: "+2.4%", positive: true }}
                    />
                    <StatCard
                        title="Today's Appointments"
                        value="8"
                        description="2 remaining"
                        icon={Calendar}
                        trend={{ value: "Same as yesterday", positive: true }}
                    />
                    <StatCard
                        title="Pending Reports"
                        value="5"
                        description="Due by tomorrow"
                        icon={FileText}
                        trend={{ value: "-2", positive: true }}
                    />
                    <StatCard
                        title="On-call Hours"
                        value="12h"
                        description="This week"
                        icon={Clock}
                        trend={{ value: "+2h", positive: false }}
                    />
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button className="flex items-center gap-2" asChild>
                        <Link href="/doctor/appointments/new">
                            <Plus className="h-4 w-4" />
                            <span>New Appointment</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                        <Link href="/doctor/patients">
                            <Search className="h-4 w-4" />
                            <span>Find Patient</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                        <Link href="/doctor/messages">
                            <MessageSquare className="h-4 w-4" />
                            <span>Messages</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                        <Link href="/doctor/consultations">
                            <Stethoscope className="h-4 w-4" />
                            <span>Start Consultation</span>
                        </Link>
                    </Button>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="appointments">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="appointments">Appointments</TabsTrigger>
                        <TabsTrigger value="patients">Patients</TabsTrigger>
                        <TabsTrigger value="medical">Medical Records</TabsTrigger>
                    </TabsList>

                    {/* Appointments Tab */}
                    <TabsContent value="appointments">
                        <CalendarView
                            events={appointments}
                            title="Upcoming Appointments"
                            onEventClick={(event) => console.log("Clicked appointment:", event)}
                        />
                    </TabsContent>

                    {/* Patients Tab */}
                    <TabsContent value="patients" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Patients</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DataTable
                                    columns={patientColumns}
                                    data={patients}
                                    searchKey="name"
                                    searchPlaceholder="Search patients..."
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Medical Records Tab */}
                    <TabsContent value="medical" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Patient Updates</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-medium text-blue-800">Sarah Williams</p>
                                            <p className="text-xs text-blue-700">1 hour ago</p>
                                        </div>
                                        <p className="text-xs text-blue-700">Lab results uploaded: Complete Blood Count</p>
                                        <Button variant="link" size="sm" className="p-0 h-auto text-blue-700 mt-1">
                                            View Results
                                        </Button>
                                    </div>
                                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-medium text-green-800">Michael Brown</p>
                                            <p className="text-xs text-green-700">3 hours ago</p>
                                        </div>
                                        <p className="text-xs text-green-700">Treatment plan completed successfully</p>
                                        <Button variant="link" size="sm" className="p-0 h-auto text-green-700 mt-1">
                                            View Treatment Plan
                                        </Button>
                                    </div>
                                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-medium text-yellow-800">Jessica Lee</p>
                                            <p className="text-xs text-yellow-700">Yesterday</p>
                                        </div>
                                        <p className="text-xs text-yellow-700">Medication refill requested</p>
                                        <Button variant="link" size="sm" className="p-0 h-auto text-yellow-700 mt-1">
                                            Approve Refill
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Medical Records</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border rounded-md">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                                <FileText className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">John Smith - Blood Test Results</p>
                                                <p className="text-sm text-muted-foreground">Uploaded 2 hours ago</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            View
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-md">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                                <FileText className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Emily Johnson - X-Ray Report</p>
                                                <p className="text-sm text-muted-foreground">Uploaded 1 day ago</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            View
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-md">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                                <FileText className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Robert Davis - Cardiology Report</p>
                                                <p className="text-sm text-muted-foreground">Uploaded 3 days ago</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            View
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}
