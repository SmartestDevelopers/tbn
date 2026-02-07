import { services } from "@/lib/services-data";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { Shield, Globe, FileText, Award, Gavel, Zap, CheckCircle, Heart, GraduationCap, FileCheck, Briefcase } from "lucide-react";
import Link from "next/link";
import ServiceHero from "@/components/sections/ServiceHero";
import ServiceValueProps from "@/components/sections/ServiceValueProps";

const iconMap: any = {
    Globe: <Globe size={48} />,
    FileText: <FileText size={48} />,
    Shield: <Shield size={48} />,
    Award: <Award size={48} />,
    Gavel: <Gavel size={48} />,
    Zap: <Zap size={48} />,
    Heart: <Heart size={48} />,
    GraduationCap: <GraduationCap size={48} />,
    FileCheck: <FileCheck size={48} />,
    Briefcase: <Briefcase size={48} />,
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Header variant="dark" />

            <ServiceHero service={service} />

            {/* Content Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-20">
                        <div className="lg:w-3/5">
                            <h2 className="text-3xl font-bold text-primary-navy mb-8">Detailed Information</h2>
                            <div className="prose prose-lg text-gray-600 mb-12">
                                <p className="leading-relaxed text-lg">
                                    {service.fullDesc}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {service.features.map((feature, i) => (
                                    <div key={i} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <CheckCircle className="text-primary-gold" size={20} />
                                        <span className="font-bold text-primary-navy">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-2/5">
                            <div className="bg-[#f8fafc] p-8 lg:p-10 rounded-3xl border border-gray-100 sticky top-32 shadow-xl">
                                <h3 className="text-2xl font-bold text-primary-navy mb-6">Need this service?</h3>
                                <p className="text-gray-500 mb-8 font-medium">Get in touch today to schedule your {service.title} with our professional team.</p>

                                <div className="space-y-4">
                                    <Link href="/contact" className="block w-full bg-primary-navy text-white text-center py-4 rounded-xl font-bold hover:bg-primary-gold transition-all shadow-lg hover:shadow-primary-gold/20">
                                        Request Appointment
                                    </Link>
                                    <button className="block w-full bg-white border-2 border-primary-navy text-primary-navy py-4 rounded-xl font-bold hover:bg-primary-navy hover:text-white transition-all">
                                        Call Now: +1 (407) 684-5550
                                    </button>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                            <Shield size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-primary-navy">Fully Guaranteed</p>
                                            <p className="text-sm text-gray-400">100% Secure & Compliant</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ServiceValueProps />

            <Footer />
        </main>
    );
}
