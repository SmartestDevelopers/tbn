'use client';

import { motion } from 'framer-motion';
import { Globe, Shield, FileText, Award, Gavel, Zap, Heart, GraduationCap, FileCheck, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services-data';

const iconMap: any = {
    Globe: <Globe className="w-8 h-8" />,
    FileText: <FileText className="w-8 h-8" />,
    Shield: <Shield className="w-8 h-8" />,
    Award: <Award className="w-8 h-8" />,
    Gavel: <Gavel className="w-8 h-8" />,
    Zap: <Zap className="w-8 h-8" />,
    Heart: <Heart className="w-8 h-8" />,
    GraduationCap: <GraduationCap className="w-8 h-8" />,
    FileCheck: <FileCheck className="w-8 h-8" />,
    Briefcase: <Briefcase className="w-8 h-8" />,
};

export default function Services() {
    return (
        <section id="services" className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-bold text-primary-navy mb-6"
                    >
                        Our Professional <span className="text-primary-gold">Notary Services</span>
                    </motion.h2>
                    <p className="text-gray-600 text-lg italic">
                        "Your Notary Without Borders" — providing fast, secure, and legally compliant services 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="rounded-[2rem] bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 group flex flex-col h-full overflow-hidden"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                {service.image && (
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                <div className={`absolute bottom-4 left-6 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md bg-white/90 shadow-lg ${service.color.replace('bg-', 'text-').split(' ')[1]}`}>
                                    {iconMap[service.icon]}
                                </div>
                            </div>

                            <div className="p-8 pt-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-6 text-sm flex-grow line-clamp-3">
                                    {service.desc}
                                </p>
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="text-primary-navy font-bold flex items-center text-sm group/btn mt-auto"
                                >
                                    Learn More
                                    <span className="ml-2 group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
