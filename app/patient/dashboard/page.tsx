import { checkAuthStatus } from "@/app/actions/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { Calendar, FileText, Pill, Activity, Wallet } from "lucide-react"
import Link from "next/link"

export default async function PatientDashboardPage() {
    const { authenticated, user, role } = await checkAuthStatus()

    if (!authenticated || role !== "Patient") {
        redirect("/login")
    }

    const userName = user.user_metadata?.first_name
        ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
        : user.email

    return (
        <DashboardLayout role="Patient" userName={userName}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">Next: May 15, 2023</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">Last updated: 3 days ago</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
                        <Pill className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">1 refill needed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Health Metrics</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Good</div>
                        <p className="text-xs text-muted-foreground">Based on recent checkup</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Subscription</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Family</div>
                        <p className="text-xs text-muted-foreground">Active plan</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Upcoming Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 border rounded-md">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium">Dr. Sarah Johnson</p>
                                        <p className="text-sm text-muted-foreground">Cardiology</p>
                                    </div>
                                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Upcoming</div>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mb-3">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>May 15, 2023 - 10:30 AM</span>
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="outline" size="sm">
                                        Reschedule
                                    </Button>
                                    <Button size="sm">View Details</Button>
                                </div>
                            </div>
                            <div className="p-4 border rounded-md">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium">Dr. Michael Brown</p>
                                        <p className="text-sm text-muted-foreground">General Checkup</p>
                                    </div>
                                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Upcoming</div>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mb-3">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>May 28, 2023 - 2:15 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="outline" size="sm">
                                        Reschedule
                                    </Button>
                                    <Button size="sm">View Details</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Medical Records</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 border rounded-md">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium">Blood Test Results</p>
                                        <p className="text-sm text-muted-foreground">Complete Blood Count</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">3 days ago</div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Results analyzed by Dr. Johnson. All values within normal range.
                                </p>
                                <Link href="/patient/records/123">
                                    <Button variant="outline" size="sm" className="w-full">
                                        View Full Report
                                    </Button>
                                </Link>
                            </div>
                            <div className="p-4 border rounded-md">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium">Radiology Report</p>
                                        <p className="text-sm text-muted-foreground">Chest X-Ray</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">2 weeks ago</div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">No abnormalities detected. Follow-up not required.</p>
                                <Link href="/patient/records/124">
                                    <Button variant="outline" size="sm" className="w-full">
                                        View Full Report
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Current Medications</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border rounded-md">
                                <p className="font-medium">Lisinopril</p>
                                <p className="text-sm text-muted-foreground">10mg, Once daily</p>
                                <div className="flex items-center mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                                    </div>
                                    <span className="text-xs text-muted-foreground ml-2">70% left</span>
                                </div>
                                <Button variant="outline" size="sm" className="w-full mt-3">
                                    Request Refill
                                </Button>
                            </div>
                            <div className="p-4 border rounded-md">
                                <p className="font-medium">Metformin</p>
                                <p className="text-sm text-muted-foreground">500mg, Twice daily</p>
                                <div className="flex items-center mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                                    </div>
                                    <span className="text-xs text-muted-foreground ml-2">30% left</span>
                                </div>
                                <Button variant="outline" size="sm" className="w-full mt-3">
                                    Request Refill
                                </Button>
                            </div>
                            <div className="p-4 border rounded-md">
                                <p className="font-medium">Atorvastatin</p>
                                <p className="text-sm text-muted-foreground">20mg, Once daily</p>
                                <div className="flex items-center mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                                    </div>
                                    <span className="text-xs text-muted-foreground ml-2">10% left</span>
                                </div>
                                <Button size="sm" className="w-full mt-3">
                                    Request Refill Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    )
}
