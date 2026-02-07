import Header from "@/components/Header";
import Services from "@/components/sections/Services";
import Footer from "@/components/layout/Footer";
import ServiceValueProps from "@/components/sections/ServiceValueProps";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | The Global Notariat",
    description: "Explore our comprehensive range of notary services, including Remote Online Notarization, Mobile Notary, Loan Signing, and more.",
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            <Header variant="dark" />
            <div>
                <div className="bg-primary-navy pt-40 pb-20 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="container mx-auto px-4 relative z-10">
                        <span className="inline-block px-4 py-1 bg-primary-gold/10 text-primary-gold rounded-full text-xs font-bold tracking-widest mb-4 border border-primary-gold/20">
                            PROFESSIONAL SOLUTIONS
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">Our <span className="text-primary-gold">Services</span></h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Comprehensive notarial solutions tailored to your needs. Secure, efficient, and globally accessible.
                        </p>
                    </div>
                </div>
                <Services />
                <ServiceValueProps />
            </div>
            <Footer />
        </main>
    );
}
