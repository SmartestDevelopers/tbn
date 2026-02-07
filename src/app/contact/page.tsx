import Header from "@/components/Header";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <div className="flex flex-col">
                <Contact />
            </div>
            <Footer />
        </main>
    );
}
