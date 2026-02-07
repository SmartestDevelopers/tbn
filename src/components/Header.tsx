'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Shield, FileText, Globe, Gavel, Award } from 'lucide-react';
import MegaMenu from './ui/MegaMenu';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
        label: 'Services',
        href: '/services',
        children: [
            { label: 'Remote Online Notary', href: '/services/remote-online-notary', icon: <Globe size={18} /> },
            { label: 'Mobile Notary', href: '/services/mobile-notary', icon: <Shield size={18} /> },
            { label: 'Loan Signing', href: '/services/loan-signing', icon: <FileText size={18} /> },
            { label: 'Apostille Services', href: '/services/apostille-authentication', icon: <Award size={18} /> },
            { label: 'Wedding Officiant', href: '/services/wedding-officiant', icon: <Gavel size={18} /> },
        ]
    },
    { label: 'Blog', href: '/blog' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

interface HeaderProps {
    variant?: 'light' | 'dark';
}

export default function Header({ variant = 'dark' }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Determine effective text color state
    // If scrolled, always proper contrast (navy on white header)
    // If not scrolled:
    //   - variant 'light' (light bg) -> text-primary-navy
    //   - variant 'dark' (dark bg) -> text-white
    const isDarkText = isScrolled || variant === 'light';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center group">
                    <div className="relative w-48 h-14 transition-transform group-hover:scale-105 duration-500 flex items-center justify-center">
                        <Image
                            src="https://img1.wsimg.com/isteam/ip/229ea690-42c2-4058-a5c9-f993ebb37281/blob.png/:/rs=h:265,cg:true,m/qt=q:100/ll"
                            alt="The Global Notariat Official Logo"
                            fill
                            className="object-contain object-left border-none bg-transparent"
                            priority
                        />
                    </div>
                </Link>

                <MegaMenu items={navItems} isScrolled={isDarkText} />

                <div className="hidden lg:block">
                    <Link
                        href="/contact"
                        className={`px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-xl ${isDarkText ? 'bg-primary-navy text-white hover:bg-primary-gold' : 'bg-primary-gold text-primary-navy hover:bg-white hover:scale-105'
                            }`}
                    >
                        Get Notarized
                    </Link>
                </div>

                <button
                    className={`lg:hidden transition-colors duration-300 ${isDarkText ? 'text-primary-navy' : 'text-primary-navy lg:text-white'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
                >
                    <div className="px-4 py-6 space-y-4">
                        {navItems.map((item) => (
                            <div key={item.label}>
                                <Link
                                    href={item.href}
                                    className="block text-lg font-medium text-primary-navy"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                        <Link
                            href="/contact"
                            className="block bg-primary-navy text-white text-center py-3 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Get Notarized
                        </Link>
                    </div>
                </motion.div>
            )}
        </header>
    );
}
