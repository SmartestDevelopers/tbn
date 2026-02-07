'use client';

import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import Subscribe from "@/components/sections/Subscribe";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Globe, Heart, FileText, Briefcase, Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-primary-navy text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-gold/20 -skew-x-12" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">ABOUT THE GLOBAL <span className="text-primary-gold">NOTARIAT</span></h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Your trusted partner for professional, reliable, and accessible notary services worldwide.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50">
                                <Image
                                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop"
                                    alt="Expert Notary Services"
                                    width={800}
                                    height={600}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-6">
                                Expert Mobile & Remote Online Notary
                            </h2>
                            <div className="prose prose-lg text-gray-600 leading-relaxed">
                                <p className="mb-6">
                                    At <strong>The Global Notariat</strong>, we are proud to provide professional, reliable, and accessible notary services tailored to meet the needs of today’s fast-paced and connected world. Based in Central Florida, we offer Mobile Notary Services throughout the region—bringing trusted notarial services directly to your door.
                                </p>
                                <p className="mb-6">
                                    For clients across the United States and beyond, our <strong>Remote Online Notary (RON)</strong> capabilities allow us to securely notarize documents anytime, anywhere in the world. Whether you're down the street or across the globe, The Global Notariat is your trusted partner to serve with integrity, precision, and convenience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">THE GLOBAL NOTARIAT - YOUR NOTARY WITHOUT BORDERS PARTNER</h2>
                        <div className="w-24 h-1 bg-primary-gold mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Service Item 1 */}
                        <Link href="/services/healthcare-senior-living" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group block">
                            <div className="h-48 overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop"
                                    alt="Healthcare Services"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors">Healthcare and Senior Living Services</h3>
                                <p className="text-gray-600 text-sm">
                                    We provide notary services for medical directives, ensuring that they are properly executed and notarized. Sensitive and senior-friendly approach for patients and residents.
                                </p>
                            </div>
                        </Link>

                        {/* Service Item 2 */}
                        <Link href="/services/expatriates-worldwide" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group block">
                            <div className="h-48 overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop"
                                    alt="Expatriates"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors">Serving Expatriates Worldwide</h3>
                                <p className="text-gray-600 text-sm">
                                    Living abroad doesn't mean you're out of reach for essential U.S.-based notarizations. We specialize in helping American expatriates and global citizens get their important documents notarized.
                                </p>
                            </div>
                        </Link>

                        {/* Service Item 3 */}
                        <Link href="/services/remote-online-notary" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group block">
                            <div className="h-48 overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=1600&auto=format&fit=crop"
                                    alt="Remote Online Notary"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors">Remote Online Notarization (RON)</h3>
                                <p className="text-gray-600 text-sm">
                                    Wherever you are in the world, The Global Notariat brings the notary to you. Our RON services allow you to legally and securely notarize documents from the comfort of your home or office.
                                </p>
                            </div>
                        </Link>

                        {/* Service Item 4 */}
                        <Link href="/services/wedding-officiant" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group block">
                            <div className="h-48 overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1600&auto=format&fit=crop"
                                    alt="Wedding Officiating"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors">Wedding Officiating Services</h3>
                                <p className="text-gray-600 text-sm">
                                    We believe that every union deserves a memorable and meaningful ceremony. In addition to our notarization services, we are proud to offer professional wedding officiating services.
                                </p>
                            </div>
                        </Link>

                        {/* Service Item 5 */}
                        <Link href="/services/loan-signing" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group block">
                            <div className="h-48 overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop"
                                    alt="Loan Signing"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors">Loan Signing Services</h3>
                                <p className="text-gray-600 text-sm">
                                    We provide loan signing services for mortgage lenders, title companies, and signing agencies. Our notary will ensure that all loan documents are correctly signed and notarized.
                                </p>
                            </div>
                        </Link>

                        {/* Service Item 6 */}
                        <Link href="/services/business-financial-documents" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group block">
                            <div className="h-48 overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop"
                                    alt="Business Documents"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors">Business and Financial Documents</h3>
                                <p className="text-gray-600 text-sm">
                                    We understand the importance of accuracy, confidentiality, and timeliness when handling business and financial documents. Whether executing contracts or authorizing transactions.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <Subscribe />
            <Footer />
        </main>
    );
}
