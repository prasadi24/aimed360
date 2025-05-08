"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, Activity, Bell, MessageSquare, Video } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { MedicalLoader } from "@/components/ui/loader"

interface Appointment {
    id: number
    title: string
    doctor: string
    date: string
    time: string
}

interface Activity {
    id: number
    type: string
    description: string
    date: string
}

interface Notification {
    id: number
    message: string
    date: string
}

interface UserDashboardData {
    appointments: Appointment[]
    recentActivities: Activity[]
    notifications: Notification[]
}

export default function DashboardPage() {
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState<UserDashboardData | null>(null)

    useEffect(() => {
        async function fetchUserData() {
            try {
                const supabase = createClient()

                // Get current user
                const {
                    data: { user },
                } = await supabase.auth.getUser()

                if (!user) throw new Error("User not found")

                // In a real app, you would fetch user-specific data here
                // For now, we'll simulate a delay and set mock data
                await new Promise((resolve) => setTimeout(resolve, 1000))

                setUserData({
                    appointments: [
                        { id: 1, title: "Annual Checkup", doctor: "Dr. Sarah Johnson", date: "2023-06-15", time: "10:00 AM" },
                        { id: 2, title: "Dental Cleaning", doctor: "Dr. Michael Chen", date: "2023-06-22", time: "2:30 PM" },
                    ],
                    recentActivities: [
                        { id: 1, type: "Prescription", description: "Prescription for Amoxicillin", date: "2023-06-10" },
                        { id: 2, type: "Lab Result", description: "Blood Test Results", date: "2023-06-08" },
                        { id: 3, type: "Appointment", description: "Scheduled Annual Checkup", date: "2023-06-05" },
                    ],
                    notifications: [
                        { id: 1, message: "Your appointment is confirmed for June 15", date: "2023-06-11" },
                        { id: 2, message: "New message from Dr. Johnson", date: "2023-06-10" },
                        { id: 3, message: "Your prescription is ready for pickup", date: "2023-06-09" },
                    ],
                })
            } catch (error) {
                console.error("Error fetching user data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-16rem)]">
                <MedicalLoader size={60} />
            </div>
        )
    }
    if (!userData) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-muted-foreground">Unable to load dashboard data. Please try again later.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back to your healthcare dashboard</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Schedule Appointment</span>
                    </Button>
                    <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>Message Doctor</span>
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
                <TabsList className="grid grid-cols-3 md:w-[400px]">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="records">Medical Records</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {userData.appointments.length > 0 ? (
                                    <div className="space-y-4">
                                        {userData.appointments.map((appointment) => (
                                            <div key={appointment.id} className="flex items-start gap-3">
                                                <div className="bg-blue-100 p-2 rounded-full">
                                                    <Calendar className="h-4 w-4 text-blue-700" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{appointment.title}</p>
                                                    <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                                        <p className="text-xs text-muted-foreground">
                                                            {appointment.date} at {appointment.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No upcoming appointments</p>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                    View All Appointments
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {userData.recentActivities.length > 0 ? (
                                    <div className="space-y-4">
                                        {userData.recentActivities.map((activity) => (
                                            <div key={activity.id} className="flex items-start gap-3">
                                                <div className="bg-green-100 p-2 rounded-full">
                                                    <Activity className="h-4 w-4 text-green-700" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{activity.type}</p>
                                                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No recent activity</p>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                    View All Activity
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Notifications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {userData.notifications.length > 0 ? (
                                    <div className="space-y-4">
                                        {userData.notifications.map((notification) => (
                                            <div key={notification.id} className="flex items-start gap-3">
                                                <div className="bg-purple-100 p-2 rounded-full">
                                                    <Bell className="h-4 w-4 text-purple-700" />
                                                </div>
                                                <div>
                                                    <p className="text-sm">{notification.message}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No notifications</p>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                    View All Notifications
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <div className="bg-white p-3 rounded-full mb-3">
                                    <Calendar className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="font-medium text-blue-800">Schedule Appointment</h3>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <div className="bg-white p-3 rounded-full mb-3">
                                    <MessageSquare className="h-6 w-6 text-teal-600" />
                                </div>
                                <h3 className="font-medium text-teal-800">Message Doctor</h3>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <div className="bg-white p-3 rounded-full mb-3">
                                    <Video className="h-6 w-6 text-purple-600" />
                                </div>
                                <h3 className="font-medium text-purple-800">Video Consultation</h3>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <div className="bg-white p-3 rounded-full mb-3">
                                    <FileText className="h-6 w-6 text-amber-600" />
                                </div>
                                <h3 className="font-medium text-amber-800">View Medical Records</h3>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="appointments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Appointments</CardTitle>
                            <CardDescription>View and manage your upcoming appointments</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {userData.appointments.length > 0 ? (
                                userData.appointments.map((appointment) => (
                                    <div key={appointment.id} className="flex items-start gap-4 p-4 border rounded-lg">
                                        <div className="bg-blue-100 p-3 rounded-full">
                                            <Calendar className="h-5 w-5 text-blue-700" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                                <div>
                                                    <h3 className="font-medium">{appointment.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    <p className="text-sm text-muted-foreground">
                                                        {appointment.date} at {appointment.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <Button variant="outline" size="sm">
                                                    Reschedule
                                                </Button>
                                                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-medium">No Appointments</h3>
                                    <p className="text-sm text-muted-foreground mt-2">You don&apos;t have any upcoming appointments.</p>
                                    <Button className="mt-4">Schedule an Appointment</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="records">
                    <Card>
                        <CardHeader>
                            <CardTitle>Medical Records</CardTitle>
                            <CardDescription>Access your medical history and documents</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8">
                                <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-medium">Medical Records</h3>
                                <p className="text-sm text-muted-foreground mt-2">Your medical records will be displayed here.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
