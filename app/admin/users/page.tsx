"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, UserCog, UserX, MoreHorizontal } from "lucide-react"
import { MedicalLoader } from "@/components/ui/loader"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
    id: string
    email: string
    role: string
    created_at: string
    last_sign_in_at: string | null
    user_metadata: {
        name?: string
        firstName?: string
        lastName?: string
    }
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [selectedRole, setSelectedRole] = useState("")

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        try {
            setLoading(true)
            // In a real application, you would fetch users from your database
            // For now, we'll simulate the data
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Mock data
            const mockUsers: User[] = [
                {
                    id: "1",
                    email: "john.doe@example.com",
                    role: "Patient",
                    created_at: "2023-01-15T10:30:00Z",
                    last_sign_in_at: "2023-05-20T14:45:00Z",
                    user_metadata: {
                        firstName: "John",
                        lastName: "Doe",
                    },
                },
                {
                    id: "2",
                    email: "jane.smith@example.com",
                    role: "Doctor",
                    created_at: "2023-02-10T09:15:00Z",
                    last_sign_in_at: "2023-05-22T11:30:00Z",
                    user_metadata: {
                        firstName: "Jane",
                        lastName: "Smith",
                    },
                },
                {
                    id: "3",
                    email: "robert.johnson@example.com",
                    role: "Admin",
                    created_at: "2023-01-05T08:45:00Z",
                    last_sign_in_at: "2023-05-23T16:20:00Z",
                    user_metadata: {
                        firstName: "Robert",
                        lastName: "Johnson",
                    },
                },
                {
                    id: "4",
                    email: "sarah.williams@example.com",
                    role: "Nurse",
                    created_at: "2023-03-20T13:10:00Z",
                    last_sign_in_at: "2023-05-21T10:15:00Z",
                    user_metadata: {
                        firstName: "Sarah",
                        lastName: "Williams",
                    },
                },
                {
                    id: "5",
                    email: "michael.brown@example.com",
                    role: "Staff",
                    created_at: "2023-04-05T11:30:00Z",
                    last_sign_in_at: "2023-05-19T09:45:00Z",
                    user_metadata: {
                        firstName: "Michael",
                        lastName: "Brown",
                    },
                },
            ]

            setUsers(mockUsers)
        } catch (error) {
            console.error("Error fetching users:", error)
        } finally {
            setLoading(false)
        }
    }

    const filteredUsers = users.filter(
        (user) =>
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.user_metadata?.firstName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (user.user_metadata?.lastName?.toLowerCase() || "").includes(searchQuery.toLowerCase()),
    )

    const handleDeleteUser = async () => {
        if (!currentUser) return

        try {
            // In a real application, you would delete the user from your database
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== currentUser.id))
            setIsDeleteDialogOpen(false)
            setCurrentUser(null)
        } catch (error) {
            console.error("Error deleting user:", error)
        }
    }

    const handleChangeRole = async () => {
        if (!currentUser || !selectedRole) return

        try {
            // In a real application, you would update the user's role in your database
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === currentUser.id ? { ...user, role: selectedRole } : user)),
            )
            setIsRoleDialogOpen(false)
            setCurrentUser(null)
            setSelectedRole("")
        } catch (error) {
            console.error("Error changing user role:", error)
        }
    }

    const openDeleteDialog = (user: User) => {
        setCurrentUser(user)
        setIsDeleteDialogOpen(true)
    }

    const openRoleDialog = (user: User) => {
        setCurrentUser(user)
        setSelectedRole(user.role)
        setIsRoleDialogOpen(true)
    }

    const getUserName = (user: User) => {
        if (user.user_metadata?.firstName && user.user_metadata?.lastName) {
            return `${user.user_metadata.firstName} ${user.user_metadata.lastName}`
        }
        if (user.user_metadata?.name) {
            return user.user_metadata.name
        }
        return "Unknown"
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case "Admin":
                return "bg-red-100 text-red-800 hover:bg-red-200"
            case "Doctor":
                return "bg-blue-100 text-blue-800 hover:bg-blue-200"
            case "Nurse":
                return "bg-green-100 text-green-800 hover:bg-green-200"
            case "Patient":
                return "bg-purple-100 text-purple-800 hover:bg-purple-200"
            case "Staff":
                return "bg-orange-100 text-orange-800 hover:bg-orange-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground">Manage users and their roles in the system.</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle>All Users</CardTitle>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search users..."
                                className="w-full md:w-64 pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <MedicalLoader size={60} />
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No users found.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Last Sign In</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{getUserName(user)}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : "Never"}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => openRoleDialog(user)}>
                                                        <UserCog className="mr-2 h-4 w-4" />
                                                        Change Role
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openDeleteDialog(user)}>
                                                        <UserX className="mr-2 h-4 w-4" />
                                                        Delete User
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Delete Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the user &quot;{currentUser?.email}&quot;? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteUser}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change Role Dialog */}
            <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change User Role</DialogTitle>
                        <DialogDescription>Change the role for user &quot;{currentUser?.email}&quot;.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <label htmlFor="role" className="text-sm font-medium leading-none mb-2 block">
                            Select Role
                        </label>
                        <select
                            id="role"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Select a role</option>
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Patient">Patient</option>
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleChangeRole} disabled={!selectedRole}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
