'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe, Shield, Clock } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#f8fafc]">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-navy/5 -skew-x-12 transform origin-top-right" />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute bottom-10 left-10 w-64 h-64 bg-primary-gold/10 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-primary-gold/10 text-primary-gold rounded-full text-sm font-bold tracking-wider mb-6">
                                AWARD WINNING NOTARY SERVICES
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-bold text-primary-navy leading-tight mb-6">
                                Timeless Notarial Services for a <span className="text-primary-gold">Connected World</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                                Experience the next generation of notarization. Secure, efficient, and accessible from anywhere in the world. Your trusted partner for legal integrity.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Link href="/services/remote-online-notary" className="bg-primary-navy text-white px-8 py-4 rounded-full font-bold flex items-center group hover:bg-primary-gold transition-all shadow-xl">
                                    Start Online Notarization
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/services" className="border-2 border-primary-navy text-primary-navy px-8 py-4 rounded-full font-bold hover:bg-primary-navy hover:text-white transition-all">
                                    Our Services
                                </Link>
                            </div>

                            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-8 text-sm font-medium text-gray-500">
                                <div className="flex items-center"><CheckCircle className="text-primary-gold mr-2" size={18} /> 24/7 Availability</div>
                                <div className="flex items-center"><CheckCircle className="text-primary-gold mr-2" size={18} /> Fully Legal & RON</div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, rotate: -3, scale: 0.95 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative z-20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[12px] border-white/50 backdrop-blur-sm"
                        >
                            <div className="aspect-[4/3] relative bg-gradient-to-br from-primary-navy via-[#2a4365] to-primary-gold p-12 flex items-center justify-center overflow-hidden">
                                {/* Animated background patterns */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 opacity-10"
                                >
                                    <Globe size={400} className="text-white" />
                                </motion.div>
                                <div className="relative z-10 text-center">
                                    <Shield size={140} className="text-primary-gold mb-6 mx-auto drop-shadow-2xl" />
                                    <div className="h-1 w-24 bg-primary-gold mx-auto rounded-full mb-4" />
                                    <p className="text-white/40 font-bold tracking-[0.3em] uppercase text-xs">Certified Notarial Integrity</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Info Cards */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="absolute -right-6 top-1/4 z-30 bg-white p-4 rounded-xl shadow-xl flex items-center space-x-3"
                        >
                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <Globe size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold">GLOBAL ACCESS</p>
                                <p className="text-sm font-bold text-primary-navy italic text-nowrap">Online Now</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="absolute -left-6 bottom-1/4 z-30 bg-white p-4 rounded-xl shadow-xl flex items-center space-x-3"
                        >
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <Clock size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold">FAST PROCESS</p>
                                <p className="text-sm font-bold text-primary-navy italic text-nowrap">Under 15 Mins</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
