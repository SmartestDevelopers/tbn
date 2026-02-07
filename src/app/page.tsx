import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import BlogVerticalCarousel from "@/components/sections/BlogVerticalCarousel";
import Subscribe from "@/components/sections/Subscribe";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const blogs = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 6
  });

  return (
    <main className="min-h-screen">
      <Header variant="light" />
      <Hero />

      {/* Short About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary-gold/20 via-transparent to-primary-navy/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-gray-100 p-2">
                <div className="w-full h-full relative rounded-2xl overflow-hidden bg-white">
                  <Image
                    src="https://img1.wsimg.com/isteam/getty/1604275664/:/cr=t:14.99%25,l:0%25,w:100%25,h:70.02%25/rs=w:1200,h:600,cg:true"
                    alt="Official Professional Notary - The Global Notariat Secure Signing Service"
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary-gold text-white p-8 rounded-3xl shadow-2xl z-10">
                <p className="text-4xl font-bold">100%</p>
                <p className="text-[10px] font-bold uppercase tracking-widest">Legal Integrity</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-primary-navy mb-6">Expert Mobile & <span className="text-primary-gold">Remote Online Notary</span></h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                At The Global Notariat, we are proud to provide professional, reliable, and accessible notary services tailored to the needs of today's fast-paced and connected world. Based in Central Florida, we offer Mobile Notary Services throughout the region—bringing trusted notarial services directly to your door.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary-gold/20 rounded-full flex items-center justify-center text-primary-gold">✓</div>
                    <span className="font-semibold text-primary-navy">24/7 Availability</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary-gold/20 rounded-full flex items-center justify-center text-primary-gold">✓</div>
                    <span className="font-semibold text-primary-navy">Identity Verification</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary-gold/20 rounded-full flex items-center justify-center text-primary-gold">✓</div>
                    <span className="font-semibold text-primary-navy">Remote Notarization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary-gold/20 rounded-full flex items-center justify-center text-primary-gold">✓</div>
                    <span className="font-semibold text-primary-navy">Mobile Service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogVerticalCarousel blogs={blogs} />

      <Subscribe />

      <Contact />

      <Footer />
    </main>
  );
}
