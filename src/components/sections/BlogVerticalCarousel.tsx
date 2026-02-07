'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronUp, ChevronDown, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

interface BlogCarouselProps {
    blogs: any[];
}

export default function BlogVerticalCarousel({ blogs }: BlogCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-scroll logic
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % blogs.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
    };

    if (!blogs || blogs.length === 0) return null;

    const currentBlog = blogs[currentIndex];

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background Text Decor */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-20 text-[20vw] font-black text-primary-navy/5 select-none pointer-events-none whitespace-nowrap leading-none">
                INSIGHTS EXPERTISE LAW NEWS
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Content and Controls */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="max-w-xl"
                        >
                            <span className="inline-block px-4 py-1.5 bg-primary-gold/10 text-primary-gold rounded-full text-xs font-bold tracking-widest mb-6 border border-primary-gold/20">
                                LATEST FROM OUR BLOG
                            </span>
                            <h2 className="text-4xl lg:text-6xl font-bold text-primary-navy mb-8 leading-tight">
                                Expert Knowledge, <span className="text-primary-gold">Vertical</span>ly Delivered
                            </h2>

                            <div className="flex items-center gap-6 mb-12">
                                <button
                                    onClick={prevSlide}
                                    className="w-14 h-14 rounded-full border-2 border-primary-navy/10 flex items-center justify-center text-primary-navy hover:bg-primary-navy hover:text-white hover:border-primary-navy transition-all duration-300"
                                >
                                    <ChevronUp size={24} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-14 h-14 rounded-full border-2 border-primary-navy/10 flex items-center justify-center text-primary-navy hover:bg-primary-navy hover:text-white hover:border-primary-navy transition-all duration-300"
                                >
                                    <ChevronDown size={24} />
                                </button>
                                <div className="text-primary-navy/30 font-bold text-lg tracking-tighter">
                                    <span className="text-primary-navy text-2xl">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(blogs.length).padStart(2, '0')}
                                </div>
                            </div>

                            <Link
                                href="/blog"
                                className="inline-flex items-center space-x-3 text-primary-navy font-bold group"
                            >
                                <span className="border-b-2 border-primary-gold group-hover:pr-4 transition-all pb-1">Explore Full Knowledge Base</span>
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Vertical Carousel Cards */}
                    <div className="lg:w-1/2 w-full relative h-[600px] flex items-center justify-center">
                        <AnimatePresence mode='wait' custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                initial={{ opacity: 0, y: direction > 0 ? 100 : -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: direction > 0 ? -100 : 100 }}
                                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                                className="w-full max-w-[450px]"
                            >
                                <Link href={`/blog/${currentBlog.slug}`} className="block group">
                                    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-[0_50px_120px_rgba(0,0,0,0.15)] transition-all duration-500">
                                        <div className="relative h-72 w-full overflow-hidden">
                                            {currentBlog.coverImage ? (
                                                <Image
                                                    src={currentBlog.coverImage}
                                                    alt={currentBlog.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-primary-navy flex items-center justify-center">
                                                    <span className="text-6xl">📄</span>
                                                </div>
                                            )}
                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-2 bg-primary-gold text-white text-xs font-bold rounded-full shadow-lg">
                                                    {currentBlog.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-10">
                                            <div className="flex items-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-primary-gold" />
                                                    <span>{format(new Date(currentBlog.createdAt), 'MMM dd, yyyy')}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User size={14} className="text-primary-gold" />
                                                    <span>{currentBlog.author}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold text-primary-navy mb-4 group-hover:text-primary-gold transition-colors leading-tight">
                                                {currentBlog.title}
                                            </h3>

                                            <p className="text-gray-500 line-clamp-3 mb-8 text-sm leading-relaxed font-medium">
                                                {currentBlog.excerpt}
                                            </p>

                                            <div className="flex items-center gap-3 text-primary-gold font-bold text-sm tracking-widest uppercase">
                                                View Article <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </AnimatePresence>

                        {/* Pagination Pillar */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                            {blogs.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setDirection(idx > currentIndex ? 1 : -1);
                                        setCurrentIndex(idx);
                                    }}
                                    className={`w-2 transition-all duration-500 rounded-full ${idx === currentIndex ? 'h-12 bg-primary-gold' : 'h-2 bg-gray-200 hover:bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
