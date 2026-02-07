import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary-navy pt-24 pb-12 text-white/80">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="w-48 h-14 flex items-center justify-center mb-6">
                            <div className="relative w-full h-full">
                                <Image
                                    src="https://img1.wsimg.com/isteam/ip/229ea690-42c2-4058-a5c9-f993ebb37281/blob.png/:/rs=h:265,cg:true,m/qt=q:100/ll"
                                    alt="The Global Notariat Footer Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <p className="line-clamp-3">Timeless Notarial Services for a Connected World. Professional, Reliable, and Accessible.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-gold transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-gold transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-gold transition-colors"><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="hover:text-primary-gold transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-primary-gold transition-colors">About Us</Link></li>
                            <li><Link href="/#services" className="hover:text-primary-gold transition-colors">Services</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-gold transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Services</h4>
                        <ul className="space-y-4">
                            <li><Link href="/services/remote-online-notary" className="hover:text-primary-gold transition-colors">Remote Online Notary</Link></li>
                            <li><Link href="/services/mobile-notary" className="hover:text-primary-gold transition-colors">Mobile Notary</Link></li>
                            <li><Link href="/services/loan-signing" className="hover:text-primary-gold transition-colors">Loan Signing</Link></li>
                            <li><Link href="/services/apostille-authentication" className="hover:text-primary-gold transition-colors">Apostille Services</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Contact Info</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center space-x-3"><Phone size={18} className="text-primary-gold" /> <span>+1 (407) 684-5550</span></li>
                            <li className="flex items-center space-x-3"><Mail size={18} className="text-primary-gold" /> <span>info@theglobalnotariat.com</span></li>
                            <li className="flex items-center space-x-3"><MapPin size={18} className="text-primary-gold" /> <span>Central Florida, USA</span></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>© 2026 The Global Notariat - All Rights Reserved.</p>
                    <p className="mt-4 md:mt-0">
                        Built professionally by{' '}
                        <a
                            href="https://astechcommunity.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-gold hover:text-white transition-colors font-bold"
                        >
                            ASTECH Community
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
