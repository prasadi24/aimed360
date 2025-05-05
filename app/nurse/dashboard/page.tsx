import { checkAuthStatus } from "@/app/actions/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { CalendarView } from "@/components/dashboard/calendar-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { Users, Clock, Plus, Clipboard, Thermometer, Stethoscope } from "lucide-react"
import Link from "next/link"

// Sample data for appointments
const appointments = [
    {
        id: "A001",
        title: "Patient Check-in: John Smith",
        date: new Date(2023, 4, 5, 9, 0),
        time: "9:00 AM",
        type: "Check-in",
        status: "scheduled",
    },
    {
        id: "A002",
        title: "Vitals Check: Emily Johnson",
        date: new Date(2023, 4, 5, 10, 15),
        time: "10:15 AM",
        type: "Vitals",
        status: "scheduled",
    },
    {
        id: "A003",
        title: "Medication Administration: Robert Davis",
        date: new Date(2023, 4, 5, 11, 30),
        time: "11:30 AM",
        type: "Medication",
        status: "scheduled",
    },
    {
        id: "A004",
        title: "Patient Check-in: Sarah Williams",
        date: new Date(2023, 4, 5, 13, 45),
        time: "1:45 PM",
        type: "Check-in",
        status: "scheduled",
    },
]

// Sample data for tasks
const tasks = [
    {
        id: "T001",
        title: "Prepare Room 203 for new patient",
        priority: "high",
        status: "pending",
        dueTime: "9:30 AM",
    },
    {
        id: "T002",
        title: "Collect blood samples from Room 105",
        priority: "medium",
        status: "pending",
        dueTime: "10:45 AM",
    },
    {
        id: "T003",
        title: "Update patient charts for Dr. Johnson",
        priority: "medium",
        status: "pending",
        dueTime: "11:15 AM",
    },
    {
        id: "T004",
        title: "Medication inventory check",
        priority: "low",
        status: "pending",
        dueTime: "2:00 PM",
    },
    {
        id: "T005",
        title: "Follow up with lab about test results",
        priority: "high",
        status: "pending",
        dueTime: "3:30 PM",
    },
]

export default async function NurseDashboardPage() {
    const { authenticated, user, role } = await checkAuthStatus()

    if (!authenticated || role !== "Nurse") {
        redirect("/login")
    }

    const userName = user.user_metadata?.first_name
        ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
        : user.email

    return (
        <DashboardLayout role="Nurse" userName={userName}>
            <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Assigned Patients"
                        value="12"
                        description="3 new today"
                        icon={Users}
                        trend={{ value: "+2", positive: false }}
                    />
                    <StatCard
                        title="Today's Tasks"
                        value="15"
                        description="5 completed"
                        icon={Clipboard}
                        trend={{ value: "10 remaining", positive: true }}
                    />
                    <StatCard title="Medication Schedule" value="8" description="Next: 10:30 AM" icon={Clock} />
                    <StatCard title="Vital Checks" value="6" description="2 pending" icon={Thermometer} />
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button className="flex items-center gap-2" asChild>
                        <Link href="/nurse/vitals/new">
                            <Plus className="h-4 w-4" />
                            <span>Record Vitals</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                        <Link href="/nurse/tasks">
                            <Clipboard className="h-4 w-4" />
                            <span>View All Tasks</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                        <Link href="/nurse/patients">
                            <Users className="h-4 w-4" />
                            <span>Patient List</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                        <Link href="/nurse/doctors">
                            <Stethoscope className="h-4 w-4" />
                            <span>Doctor Schedules</span>
                        </Link>
                    </Button>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="schedule">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger value="patients">Patient Monitoring</TabsTrigger>
                    </TabsList>

                    {/* Schedule Tab */}
                    <TabsContent value="schedule">
                        <CalendarView
                            events={appointments}
                            title="Today's Schedule"
                            onEventClick={(event) => console.log("Clicked appointment:", event)}
                        />
                    </TabsContent>

                    {/* Tasks Tab */}
                    <TabsContent value="tasks">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tasks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {tasks.map((task) => (
                                        <div key={task.id} className="p-4 border rounded-md flex items-center justify-between">
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`w-3 h-3 rounded-full mt-1.5 ${task.priority === "high"
                                                        ? "bg-red-500"
                                                        : task.priority === "medium"
                                                            ? "bg-yellow-500"
                                                            : "bg-blue-500"
                                                        }`}
                                                />
                                                <div>
                                                    <p className="font-medium">{task.title}</p>
                                                    <p className="text-sm text-muted-foreground">Due: {task.dueTime}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm">
                                                    Complete
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    Reassign
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Patients Tab */}
                    <TabsContent value="patients">
                        <Card>
                            <CardHeader>
                                <CardTitle>Patient Monitoring</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="p-4 border rounded-md">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="font-medium">John Smith</p>
                                                <p className="text-sm text-muted-foreground">Room 203 • Admitted: May 1, 2023</p>
                                            </div>
                                            <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                Needs Attention
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                <p className="text-xs text-muted-foreground">Blood Pressure</p>
                                                <p className="text-lg font-medium">140/90 mmHg</p>
                                                <p className="text-xs text-yellow-600">Above normal</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                <p className="text-xs text-muted-foreground">Heart Rate</p>
                                                <p className="text-lg font-medium">88 bpm</p>
                                                <p className="text-xs text-green-600">Normal</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                <p className="text-xs text-muted-foreground">Temperature</p>
                                                <p className="text-lg font-medium">99.1 °F</p>
                                                <p className="text-xs text-green-600">Normal</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href="/nurse/patients/P001">View Details</Link>
                                            </Button>
                                            <Button size="sm">Record Vitals</Button>
                                        </div>
                                    </div>

                                    <div className="p-4 border rounded-md">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="font-medium">Emily Johnson</p>
                                                <p className="text-sm text-muted-foreground">Room 105 • Admitted: April 28, 2023</p>
                                            </div>
                                            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                Stable
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                <p className="text-xs text-muted-foreground">Blood Pressure</p>
                                                <p className="text-lg font-medium">120/80 mmHg</p>
                                                <p className="text-xs text-green-600">Normal</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                <p className="text-xs text-muted-foreground">Heart Rate</p>
                                                <p className="text-lg font-medium">72 bpm</p>
                                                <p className="text-xs text-green-600">Normal</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                <p className="text-xs text-muted-foreground">Temperature</p>
                                                <p className="text-lg font-medium">98.6 °F</p>
                                                <p className="text-xs text-green-600">Normal</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href="/nurse/patients/P002">View Details</Link>
                                            </Button>
                                            <Button size="sm">Record Vitals</Button>
                                        </div>
                                    </div>

                                    <div className="p-4 border rounded-md">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="font-medium">Robert Davis</p>
                                                <p className="text-sm text-muted-foreground">Room 118 • Admitted: April 30, 2023</p>
                                            </div>
                                            <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Critical</div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                <p className="text-xs text-muted-foreground">Blood Pressure</p>
                                                <p className="text-lg font-medium">160/100 mmHg</p>
                                                <p className="text-xs text-red-600">High</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                <p className="text-xs text-muted-foreground">Heart Rate</p>
                                                <p className="text-lg font-medium">95 bpm</p>
                                                <p className="text-xs text-yellow-600">Elevated</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                <p className="text-xs text-muted-foreground">Temperature</p>
                                                <p className="text-lg font-medium">101.2 °F</p>
                                                <p className="text-xs text-red-600">Fever</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href="/nurse/patients/P003">View Details</Link>
                                            </Button>
                                            <Button size="sm" variant="destructive">
                                                Alert Doctor
                                            </Button>
                                        </div>
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
