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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            <span className="font-bold text-xl">AIMED360</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#why-us" className="text-sm font-medium hover:text-primary">
              Why Us
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Log In
            </Button>
            <Button size="sm">Book a Demo</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  AIMED360
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground">One platform. Total care.</p>
              <p className="text-muted-foreground max-w-md mx-auto md:mx-0">
                Revolutionizing healthcare with AI-powered solutions for medical professionals and patients alike.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg">
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full aspect-square md:aspect-auto md:h-[450px] relative">
                <Image
                  src="/placeholder.svg?key=4j7ui"
                  alt="Healthcare Technology"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,rgba(56,189,248,0.05),rgba(255,255,255,0))]" />
        </section>

        {/* Platform Highlights */}
        <section id="features" className="py-16 bg-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Platform Highlights</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive healthcare platform offers cutting-edge features designed to streamline your practice
                and improve patient care.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                    <ClipboardList className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>AI-Powered Medical Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Smart EMR system that uses AI to organize, analyze, and extract insights from patient data.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-2">
                    <Video className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle>Telemedicine Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Secure video consultations with integrated scheduling, notes, and prescription capabilities.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                    <Flask className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Smart Lab Test Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Automated lab test ordering, result tracking, and abnormality detection with AI analysis.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Integrated Billing & Invoicing</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Streamlined billing system with insurance verification, claims processing, and payment tracking.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform seamlessly integrates into your workflow, making healthcare management simple and
                efficient.
              </p>
            </div>

            <div className="relative">
              {/* Timeline connector */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-teal-500 hidden md:block" />

              {/* Steps */}
              <div className="space-y-12 relative">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-2">Patient Registration</h3>
                    <p className="text-muted-foreground">
                      Patients register through a user-friendly portal, entering their information securely and
                      scheduling their first appointment.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center z-10">
                      <span className="text-white font-bold">1</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center z-10">
                      <span className="text-white font-bold">2</span>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mb-2">Doctor Consultation</h3>
                    <p className="text-muted-foreground">
                      Doctors access comprehensive patient information, conduct consultations in-person or via
                      telemedicine, and document findings.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-2">Treatment & Monitoring</h3>
                    <p className="text-muted-foreground">
                      AI-assisted treatment plans are created, prescriptions are sent electronically, and patient
                      progress is monitored continuously.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center z-10">
                      <span className="text-white font-bold">3</span>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center z-10">
                      <span className="text-white font-bold">4</span>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mb-2">Billing & Follow-up</h3>
                    <p className="text-muted-foreground">
                      Automated billing processes handle insurance claims and patient payments, while the system
                      schedules follow-up appointments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why AIMED360 */}
        <section id="why-us" className="py-16 bg-gradient-to-b from-white to-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why AIMED360</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to transforming healthcare delivery with technology that you can trust.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
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

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-teal-600" />
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

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-green-600" />
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

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
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
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Healthcare professionals across the country trust AIMED360 to power their practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="italic text-muted-foreground">
                      "AIMED360 has transformed how we manage patient care. The AI-powered insights have helped us
                      identify trends we would have missed otherwise."
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-medium text-blue-600">DR</span>
                    </div>
                    <div>
                      <p className="font-medium">Dr. Rebecca Chen</p>
                      <p className="text-sm text-muted-foreground">Cardiologist, Heart Care Center</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="italic text-muted-foreground">
                      "The telemedicine feature has allowed us to expand our practice beyond our physical location. Our
                      patients love the convenience."
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="font-medium text-teal-600">JM</span>
                    </div>
                    <div>
                      <p className="font-medium">Dr. James Miller</p>
                      <p className="text-sm text-muted-foreground">Family Physician, Wellness Medical Group</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="italic text-muted-foreground">
                      "The billing system has reduced our administrative overhead by 60%. Claims are processed faster
                      and with fewer errors."
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="font-medium text-green-600">SP</span>
                    </div>
                    <div>
                      <p className="font-medium">Sarah Peterson</p>
                      <p className="text-sm text-muted-foreground">Practice Manager, City Medical Associates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your healthcare practice?</h2>
              <p className="mb-8 opacity-90">
                Join thousands of healthcare professionals who are already using AIMED360 to improve patient care and
                streamline their operations.
              </p>

              <div className="bg-white p-8 rounded-lg shadow-lg">
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
                <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
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

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                  <span className="font-bold text-white">A</span>
                </div>
                <span className="font-bold text-xl text-white">AIMED360</span>
              </div>
              <p className="text-sm mb-4">
                Revolutionizing healthcare with AI-powered solutions for medical professionals and patients alike.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} AIMED360. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
