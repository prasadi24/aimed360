"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ClipboardList,
    Video,
    FlaskRoundIcon as Flask,
    CreditCard,
    Shield,
    Zap,
    Lock,
    CheckCircle,
    ArrowRight,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Menu,
    X,
    ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { GradientCard } from "@/components/ui/gradient-card"
import { DoctorCSSIllustration } from "@/components/illustrations/doctor-css"
import { SubscriptionSlider } from "@/components/subscription-slider"
import { BillingIcon } from "@/components/icons/billing-icon"
import { TelemedicineIcon } from "@/components/icons/telemedicine-icon"
import { TreatmentIcon } from "@/components/icons/treatment-icon"
import { LabTestIcon } from "@/components/icons/lab-test-icon"

export default function HomePage() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const testimonials = [
        {
            quote:
                "AIMED360 has transformed how we manage patient care. The AI-powered insights have helped us identify trends we would have missed otherwise.",
            name: "Dr. Rebecca Chen",
            title: "Cardiologist, Heart Care Center",
            initials: "RC",
            color: "blue",
        },
        {
            quote:
                "The telemedicine feature has allowed us to expand our practice beyond our physical location. Our patients love the convenience.",
            name: "Dr. James Miller",
            title: "Family Physician, Wellness Medical Group",
            initials: "JM",
            color: "teal",
        },
        {
            quote:
                "The billing system has reduced our administrative overhead by 60%. Claims are processed faster and with fewer errors.",
            name: "Sarah Peterson",
            title: "Practice Manager, City Medical Associates",
            initials: "SP",
            color: "green",
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [testimonials.length])

    return (
        <div className="flex min-h-screen flex-col">
            <header
                className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/60" : "bg-transparent"
                    }`}
            >
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                            <span className="font-bold text-white">A</span>
                        </div>
                        <span className="font-bold text-xl">AIMED360</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="#features"
                            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer hover:underline"
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer hover:underline"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="#why-us"
                            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer hover:underline"
                        >
                            Why Us
                        </Link>
                        <Link
                            href="#testimonials"
                            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer hover:underline"
                        >
                            Testimonials
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="cursor-pointer">
                            <Button variant="outline" size="sm" className="hidden md:flex">
                                Log In
                            </Button>
                        </Link>
                        <Link href="/register" className="cursor-pointer">
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
                            >
                                Register
                            </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 bg-gray-950/70 backdrop-blur-sm">
                        <div className="fixed right-0 top-0 h-full w-3/4 max-w-xs bg-white shadow-xl p-6 animate-in slide-in-from-right">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                                        <span className="font-bold text-white">A</span>
                                    </div>
                                    <span className="font-bold">AIMED360</span>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <nav className="flex flex-col space-y-4">
                                <Link
                                    href="#features"
                                    className="flex items-center justify-between px-2 py-3 text-sm font-medium hover:bg-gray-100 rounded-md cursor-pointer"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Features
                                    <ChevronRight className="h-4 w-4 opacity-50" />
                                </Link>
                                <Link
                                    href="#how-it-works"
                                    className="flex items-center justify-between px-2 py-3 text-sm font-medium hover:bg-gray-100 rounded-md cursor-pointer"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    How It Works
                                    <ChevronRight className="h-4 w-4 opacity-50" />
                                </Link>
                                <Link
                                    href="#why-us"
                                    className="flex items-center justify-between px-2 py-3 text-sm font-medium hover:bg-gray-100 rounded-md cursor-pointer"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Why Us
                                    <ChevronRight className="h-4 w-4 opacity-50" />
                                </Link>
                                <Link
                                    href="#testimonials"
                                    className="flex items-center justify-between px-2 py-3 text-sm font-medium hover:bg-gray-100 rounded-md cursor-pointer"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Testimonials
                                    <ChevronRight className="h-4 w-4 opacity-50" />
                                </Link>
                                <div className="pt-4 mt-4 border-t border-gray-200">
                                    <Button className="w-full mb-2 transition-all duration-300 hover:shadow-md">Book a Demo</Button>
                                    <Link href="/login" className="w-full cursor-pointer">
                                        <Button variant="outline" className="w-full transition-all duration-300 hover:bg-gray-100">
                                            Log In
                                        </Button>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="flex-1 space-y-6 text-center md:text-left relative z-10">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4 cursor-pointer">
                                <span className="text-xs">AI-Powered Healthcare Platform</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                One Platform. <br />
                                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                                    Total Care.
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground">
                                Revolutionizing healthcare with AI-powered solutions.
                            </p>
                            <p className="text-muted-foreground max-w-md mx-auto md:mx-0">
                                Streamline your medical practice with our comprehensive platform that integrates patient records,
                                telemedicine, lab tests, and billing.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                                <Link href="/register" className="cursor-pointer">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                    >
                                        Get Started
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/login" className="cursor-pointer">
                                    <Button variant="outline" size="lg" className="transition-all duration-300 hover:bg-gray-100">
                                        Log In
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="w-full aspect-square md:aspect-auto md:h-[500px] relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full filter blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-400/10 rounded-full filter blur-3xl"></div>
                                <div className="relative z-10 h-full w-full flex items-center justify-center">
                                    <div className="w-4/5 h-4/5">
                                        <TelemedicineIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 z-20 animate-bounce-slow">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium">HIPAA Compliant</p>
                                    <p className="text-xs text-muted-foreground">Secure & Protected</p>
                                </div>
                            </div>
                            <div className="absolute top-1/4 -right-6 bg-white rounded-lg shadow-xl p-3 z-20 animate-pulse-slow">
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <Shield className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <p className="text-xs font-medium">Patient Data Protected</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-gray-100">
                        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <p className="text-center text-sm text-muted-foreground mb-6">Trusted by leading healthcare providers</p>
                            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
                                {/* Replace client logos with text */}
                                <div className="w-32 h-8 flex items-center justify-center">
                                    <p className="font-semibold text-gray-400">MediCorp</p>
                                </div>
                                <div className="w-32 h-8 flex items-center justify-center">
                                    <p className="font-semibold text-gray-400">HealthPlus</p>
                                </div>
                                <div className="w-32 h-8 flex items-center justify-center">
                                    <p className="font-semibold text-gray-400">CareGroup</p>
                                </div>
                                <div className="w-32 h-8 flex items-center justify-center">
                                    <p className="font-semibold text-gray-400">MedTech</p>
                                </div>
                                <div className="w-32 h-8 flex items-center justify-center">
                                    <p className="font-semibold text-gray-400">VitalCare</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Platform Highlights */}
                <section id="features" className="py-20 bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-50/80 to-transparent"></div>

                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 relative z-10">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4 cursor-pointer">
                                FEATURES
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Healthcare Platform</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Our cutting-edge features are designed to streamline your practice and improve patient care through
                                innovative technology.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <GradientCard
                                title="AI-Powered Medical Records"
                                description="Smart EMR system that uses AI to organize, analyze, and extract valuable insights from patient data."
                                icon={<ClipboardList className="h-7 w-7 text-blue-600" />}
                                colorFrom="blue"
                                colorTo="cyan"
                            />

                            <Card className="group border-none shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-teal-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <CardHeader className="pb-2 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors duration-300">
                                        <Video className="h-7 w-7 text-teal-600" />
                                    </div>
                                    <CardTitle>Telemedicine Consultations</CardTitle>
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <CardDescription className="text-sm">
                                        Secure video consultations with integrated scheduling, notes, and prescription capabilities.
                                    </CardDescription>
                                    <div className="mt-4 h-40 relative">
                                        <div className="w-full h-full">
                                            <TelemedicineIcon />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group border-none shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <CardHeader className="pb-2 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                                        <Flask className="h-7 w-7 text-green-600" />
                                    </div>
                                    <CardTitle>Smart Lab Test Management</CardTitle>
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <CardDescription className="text-sm">
                                        Automated lab test ordering, result tracking, and abnormality detection with AI analysis.
                                    </CardDescription>
                                    <div className="mt-4 h-40 relative">
                                        <div className="w-full h-full">
                                            <LabTestIcon />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group border-none shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <CardHeader className="pb-2 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                                        <CreditCard className="h-7 w-7 text-purple-600" />
                                    </div>
                                    <CardTitle>Integrated Billing & Invoicing</CardTitle>
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <CardDescription className="text-sm">
                                        Streamlined billing system with insurance verification, claims processing, and payment tracking.
                                    </CardDescription>
                                    <div className="mt-4 h-40 relative">
                                        <div className="w-full h-full">
                                            <BillingIcon />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-12 flex justify-center">
                            <Button variant="outline" className="gap-2 group transition-all duration-300 hover:bg-gray-100">
                                View All Features
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Subscription Plans */}
                <section className="py-20 bg-gray-50">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4 cursor-pointer">
                                PRICING
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Healthcare Plans for Everyone</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Choose the perfect healthcare plan for you and your family with our flexible subscription options.
                            </p>
                        </div>

                        <SubscriptionSlider />

                        <div className="mt-10 text-center">
                            <Link href="/subscriptions" className="cursor-pointer">
                                <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
                                    View All Plans
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 bg-gradient-to-r from-blue-600 to-teal-500">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center text-white">
                                <p className="text-4xl font-bold">93%</p>
                                <p className="text-sm font-medium mt-1 opacity-90">Reduction in paperwork</p>
                            </div>
                            <div className="text-center text-white">
                                <p className="text-4xl font-bold">24/7</p>
                                <p className="text-sm font-medium mt-1 opacity-90">Platform availability</p>
                            </div>
                            <div className="text-center text-white">
                                <p className="text-4xl font-bold">3.2K+</p>
                                <p className="text-sm font-medium mt-1 opacity-90">Healthcare providers</p>
                            </div>
                            <div className="text-center text-white">
                                <p className="text-4xl font-bold">2.5M+</p>
                                <p className="text-sm font-medium mt-1 opacity-90">Patients served</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="py-20 bg-gray-50">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4 cursor-pointer">
                                WORKFLOW
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Our platform seamlessly integrates into your workflow, making healthcare management simple and efficient
                                for both providers and patients.
                            </p>
                        </div>

                        <div className="relative">
                            {/* Timeline connector */}
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-teal-400 to-green-400 hidden md:block"></div>

                            {/* Steps */}
                            <div className="space-y-16 relative">
                                {/* Step 1 */}
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="md:w-1/2 md:text-right order-2 md:order-1 space-y-4">
                                        <h3 className="text-2xl font-bold">Patient Registration</h3>
                                        <p className="text-muted-foreground">
                                            Patients register through a user-friendly portal, entering their information securely and
                                            scheduling their first appointment.
                                        </p>
                                        <ul className="space-y-2 list-disc list-inside md:list-outside text-sm text-muted-foreground">
                                            <li>Simple onboarding process</li>
                                            <li>Secure data collection</li>
                                            <li>Automated appointment scheduling</li>
                                        </ul>
                                    </div>
                                    <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center z-10 shadow-lg absolute -left-6 top-1/2 transform -translate-y-1/2 md:left-0">
                                                <span className="text-blue-600 font-bold text-lg">1</span>
                                            </div>
                                            <div className="h-64 w-64 relative">
                                                <DoctorCSSIllustration />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="md:w-1/2 flex justify-center">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-teal-100 border-4 border-white flex items-center justify-center z-10 shadow-lg absolute -left-6 top-1/2 transform -translate-y-1/2 md:right-0">
                                                <span className="text-teal-600 font-bold text-lg">2</span>
                                            </div>
                                            <div className="h-64 w-64 relative">
                                                <TelemedicineIcon />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 space-y-4">
                                        <h3 className="text-2xl font-bold">Doctor Consultation</h3>
                                        <p className="text-muted-foreground">
                                            Doctors access comprehensive patient information, conduct consultations in-person or via
                                            telemedicine, and document findings.
                                        </p>
                                        <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                                            <li>Complete medical history at a glance</li>
                                            <li>Integrated telemedicine platform</li>
                                            <li>AI-assisted diagnosis suggestions</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="md:w-1/2 md:text-right order-2 md:order-1 space-y-4">
                                        <h3 className="text-2xl font-bold">Treatment & Monitoring</h3>
                                        <p className="text-muted-foreground">
                                            AI-assisted treatment plans are created, prescriptions are sent electronically, and patient
                                            progress is monitored continuously.
                                        </p>
                                        <ul className="space-y-2 list-disc list-inside md:list-outside text-sm text-muted-foreground">
                                            <li>Automated prescription management</li>
                                            <li>Real-time patient monitoring</li>
                                            <li>Treatment effectiveness tracking</li>
                                        </ul>
                                    </div>
                                    <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-green-100 border-4 border-white flex items-center justify-center z-10 shadow-lg absolute -left-6 top-1/2 transform -translate-y-1/2 md:left-0">
                                                <span className="text-green-600 font-bold text-lg">3</span>
                                            </div>
                                            <div className="h-64 w-64 relative">
                                                <TreatmentIcon />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="md:w-1/2 flex justify-center">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-purple-100 border-4 border-white flex items-center justify-center z-10 shadow-lg absolute -left-6 top-1/2 transform -translate-y-1/2 md:right-0">
                                                <span className="text-purple-600 font-bold text-lg">4</span>
                                            </div>
                                            <div className="h-64 w-64 relative">
                                                <BillingIcon />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 space-y-4">
                                        <h3 className="text-2xl font-bold">Billing & Follow-up</h3>
                                        <p className="text-muted-foreground">
                                            Automated billing processes handle insurance claims and patient payments, while the system
                                            schedules follow-up appointments.
                                        </p>
                                        <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                                            <li>Streamlined insurance processing</li>
                                            <li>Automated payment collection</li>
                                            <li>Smart follow-up scheduling</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why AIMED360 */}
                <section id="why-us" className="py-20 bg-white">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4 cursor-pointer">
                                ADVANTAGES
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AIMED360</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We&apos;re committed to transforming healthcare delivery with technology that you can trust and that helps
                                your practice thrive.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex gap-4 p-6 rounded-xl transition-all hover:bg-slate-50 cursor-pointer">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <Shield className="h-7 w-7 text-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Trusted Security</h3>
                                    <p className="text-muted-foreground">
                                        Bank-level encryption and security protocols ensure your patient data is always protected. Our
                                        platform is built with privacy at its core.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-6 rounded-xl transition-all hover:bg-slate-50 cursor-pointer">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center">
                                        <Zap className="h-7 w-7 text-teal-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                                    <p className="text-muted-foreground">
                                        Optimized for speed and efficiency, our platform reduces administrative time by up to 70%, letting
                                        you focus more on patient care.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-6 rounded-xl transition-all hover:bg-slate-50 cursor-pointer">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                                        <Lock className="h-7 w-7 text-green-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">HIPAA Compliant</h3>
                                    <p className="text-muted-foreground">
                                        Fully compliant with healthcare regulations including HIPAA, ensuring you meet all legal
                                        requirements for patient data handling.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-6 rounded-xl transition-all hover:bg-slate-50 cursor-pointer">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                                        <CheckCircle className="h-7 w-7 text-purple-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">99.9% Uptime</h3>
                                    <p className="text-muted-foreground">
                                        Our reliable infrastructure ensures your practice never experiences downtime, with continuous
                                        monitoring and redundant systems.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl overflow-hidden">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold mb-4">See how AIMED360 transforms healthcare delivery</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Watch our demo to see how our platform streamlines workflows, improves patient outcomes, and boosts
                                        practice efficiency.
                                    </p>
                                    <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 w-fit transition-all duration-300 hover:shadow-lg hover:scale-105">
                                        Watch Demo Video
                                    </Button>
                                </div>
                                <div className="lg:w-1/2 relative min-h-[300px] bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                                    <div className="absolute inset-0">
                                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full"></div>
                                        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-200/30 rounded-full"></div>
                                    </div>
                                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg z-10 cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section id="testimonials" className="py-20 bg-gray-50 overflow-hidden">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4 cursor-pointer">
                                TESTIMONIALS
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Healthcare professionals across the country trust AIMED360 to power their practices.
                            </p>
                        </div>

                        <div className="relative w-full max-w-4xl mx-auto">
                            <div className="absolute -left-8 -right-8 top-1/2 transform -translate-y-1/2 flex items-center justify-between z-10">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-110"
                                    onClick={() =>
                                        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                                    }
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-110"
                                    onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                                <div className="flex flex-col items-center">
                                    <svg className="h-12 w-12 text-gray-300 mb-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                                    </svg>
                                    <p className="text-xl md:text-2xl text-center italic font-medium mb-8">
                                        {testimonials[currentTestimonial].quote}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-12 h-12 rounded-full bg-${testimonials[currentTestimonial].color}-100 flex items-center justify-center`}
                                        >
                                            <span className={`font-medium text-${testimonials[currentTestimonial].color}-600`}>
                                                {testimonials[currentTestimonial].initials}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-lg">{testimonials[currentTestimonial].name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-6 gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === currentTestimonial ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"}`}
                                        onClick={() => setCurrentTestimonial(i)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your healthcare practice?</h2>
                            <p className="mb-8 opacity-90 text-lg">
                                Join thousands of healthcare professionals who are already using AIMED360 to improve patient care and
                                streamline their operations.
                            </p>

                            <div className="bg-white p-8 rounded-2xl shadow-2xl">
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Request a Demo</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <Input type="text" placeholder="First Name" className="bg-white text-gray-900" />
                                    </div>
                                    <div>
                                        <Input type="text" placeholder="Last Name" className="bg-white text-gray-900" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <Input type="email" placeholder="Email Address" className="bg-white text-gray-900" />
                                </div>
                                <div className="mb-4">
                                    <Input type="text" placeholder="Organization" className="bg-white text-gray-900" />
                                </div>
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                                    Book Your Free Demo
                                </Button>
                                <p className="text-xs text-gray-500 mt-4 text-center">
                                    By submitting this form, you agree to our privacy policy and terms of service.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                                    <span className="font-bold text-white">A</span>
                                </div>
                                <span className="font-bold text-xl text-white">AIMED360</span>
                            </div>
                            <p className="text-sm mb-6">
                                Revolutionizing healthcare with AI-powered solutions for medical professionals and patients alike.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white mb-4">Platform</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        Security
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        Integrations
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        Pricing
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-white mb-4">Resources</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        API Reference
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        Community
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-white mb-4">Company</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-4 pt-8 text-sm text-center">
                        <p>&copy; {new Date().getFullYear()} AIMED360. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
