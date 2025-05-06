"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Users,
    CreditCard,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    BarChart3,
    UserPlus,
    FileText,
    Bell,
} from "lucide-react"
//import { createClient } from "@/lib/supabase/client"
import { MedicalLoader } from "@/components/ui/loader"

interface DashboardStats {
    totalUsers: number
    activeSubscriptions: number
    monthlyRevenue: number
    newUsersToday: number
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        activeSubscriptions: 0,
        monthlyRevenue: 0,
        newUsersToday: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchDashboardStats() {
            try {
                //const supabase = createClient()

                // In a real application, these would be actual database queries
                // For now, we'll simulate the data

                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 1000))

                // Set mock data
                setStats({
                    totalUsers: 1248,
                    activeSubscriptions: 842,
                    monthlyRevenue: 128750,
                    newUsersToday: 24,
                })
            } catch (error) {
                console.error("Error fetching dashboard stats:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardStats()
    }, [])

    // Format currency in Indian Rupees
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <MedicalLoader size={60} />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
                    <p className="text-muted-foreground">Overview of your healthcare platform's performance and metrics.</p>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-green-500 flex items-center">
                                        +12.5%
                                        <ArrowUpRight className="ml-1 h-3 w-3" />
                                    </span>{" "}
                                    from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.activeSubscriptions.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-green-500 flex items-center">
                                        +7.2%
                                        <ArrowUpRight className="ml-1 h-3 w-3" />
                                    </span>{" "}
                                    from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-green-500 flex items-center">
                                        +18.7%
                                        <ArrowUpRight className="ml-1 h-3 w-3" />
                                    </span>{" "}
                                    from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">New Users Today</CardTitle>
                                <UserPlus className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.newUsersToday}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-red-500 flex items-center">
                                        -4.5%
                                        <ArrowDownRight className="ml-1 h-3 w-3" />
                                    </span>{" "}
                                    from yesterday
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>User Growth</CardTitle>
                                <CardDescription>User acquisition over the past 30 days</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[200px] w-full flex items-center justify-center">
                                    <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                                    <span className="ml-2 text-muted-foreground">Chart visualization will appear here</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Subscription Distribution</CardTitle>
                                <CardDescription>Active subscriptions by plan</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] w-full flex items-center justify-center">
                                    <div className="space-y-4 w-full">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Basic</span>
                                                <span className="text-sm font-medium">35%</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: "35%" }}></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Standard</span>
                                                <span className="text-sm font-medium">42%</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-teal-500 rounded-full" style={{ width: "42%" }}></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Premium</span>
                                                <span className="text-sm font-medium">23%</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-purple-500 rounded-full" style={{ width: "23%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest actions and events on the platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <Users className="h-4 w-4 text-blue-700" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">New user registered</p>
                                            <p className="text-xs text-muted-foreground">Dr. Sarah Johnson registered as a Doctor</p>
                                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics" className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                        <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
                        <p className="text-sm text-muted-foreground mt-2">Detailed analytics will be displayed here.</p>
                    </div>
                </TabsContent>

                <TabsContent value="reports" className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                        <FileText className="h-16 w-16 mx-auto text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-medium">Reports Dashboard</h3>
                        <p className="text-sm text-muted-foreground mt-2">Generated reports will be displayed here.</p>
                    </div>
                </TabsContent>

                <TabsContent value="notifications" className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                        <Bell className="h-16 w-16 mx-auto text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-medium">Notifications Center</h3>
                        <p className="text-sm text-muted-foreground mt-2">System notifications will be displayed here.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
