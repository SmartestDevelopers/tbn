'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Shield, Globe, FileText, Award, Gavel, Zap, Heart, Briefcase } from 'lucide-react';

const iconMap: any = {
    Globe: <Globe size={48} />,
    FileText: <FileText size={48} />,
    Shield: <Shield size={48} />,
    Award: <Award size={48} />,
    Gavel: <Gavel size={48} />,
    Zap: <Zap size={48} />,
    Heart: <Heart size={48} />,
    Briefcase: <Briefcase size={48} />,
};

interface ServiceHeroProps {
    service: {
        title: string;
        desc: string;
        icon: string;
        image?: string;
    };
}

export default function ServiceHero({ service }: ServiceHeroProps) {
    return (
        <section className="pt-32 pb-20 bg-primary-navy text-white relative overflow-hidden min-h-[60vh] flex items-center">
            {/* Background Textures */}
            <div className="absolute inset-0 opacity-20">
                <Image
                    src="https://www.transparenttextures.com/patterns/cubes.png"
                    alt="texture"
                    fill
                    className="object-cover opacity-10"
                />
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary-gold/10 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <Link href="/services" className="inline-flex items-center text-primary-gold mb-8 hover:underline font-bold transition-all bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10">
                    <ArrowLeft className="mr-2" size={18} /> Back to Services
                </Link>

                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1 bg-primary-gold text-primary-navy rounded-full text-xs font-bold tracking-widest mb-6 uppercase shadow-lg shadow-primary-gold/20">
                                Premium Service
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-xl text-blue-100/90 max-w-xl leading-relaxed font-light border-l-4 border-primary-gold pl-6">
                                {service.desc}
                            </p>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-8 border-white/10"
                        >
                            <div className="aspect-[4/3] relative">
                                {service.image && (
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/80 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 flex items-center space-x-4 shadow-xl">
                                <div className={`p-3 rounded-xl bg-white text-primary-navy shadow-lg`}>
                                    {iconMap[service.icon]}
                                </div>
                                <div>
                                    <p className="text-xs text-primary-gold uppercase font-bold tracking-wider">Certified</p>
                                    <p className="text-white font-bold text-lg">Professional Service</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative Blob */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-gold/20 rounded-full blur-[100px] -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
