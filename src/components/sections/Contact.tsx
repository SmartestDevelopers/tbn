'use client';

import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { FloatingLabelInput } from '../ui/FloatingLabelInput';
import { FloatingLabelTextArea } from '../ui/FloatingLabelTextArea';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            await axios.post('/api/contact', data);
            setSubmitStatus('success');
            reset();
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="min-h-screen bg-primary-navy text-white relative overflow-hidden pt-32 pb-24">
            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-gold/10 rounded-full -mr-40 -mt-20 blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full -ml-40 -mb-40 blur-3xl opacity-50" />

            {/* World Map Texture or Subtle Design */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-no-repeat bg-center bg-cover" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/2 sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-primary-gold/10 text-primary-gold rounded-full text-xs font-bold tracking-widest mb-6 border border-primary-gold/20">
                                ALWAYS AVAILABLE
                            </span>
                            <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                                Let's Start a <span className="text-primary-gold">Conversation</span>
                            </h2>
                            <p className="text-blue-100 text-lg mb-12 leading-relaxed opacity-90 max-w-xl">
                                Ready to notarize? Whether you need a simple document signed or a complex loan closing, our team is ready to assist you 24/7.
                            </p>

                            <div className="space-y-8 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
                                <div className="flex items-center space-x-6 group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-gold to-yellow-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                        <Phone size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-widest text-primary-gold mb-1">Call Us Now</h4>
                                        <p className="text-2xl font-bold font-mono">+1 (407) 684-5550</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6 group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-primary-navy rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/10 group-hover:scale-110 transition-transform">
                                        <Mail size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-widest text-primary-gold mb-1">Email Support</h4>
                                        <p className="text-xl font-medium">info@theglobalnotariat.com</p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/10">
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <MapPin size={16} className="text-primary-gold" />
                                        <span>Headquartered in Orlando, FL • Serving Clients Worldwide</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] overflow-hidden relative"
                        >
                            <div className="h-2 w-full bg-gradient-to-r from-primary-navy via-primary-gold to-primary-navy" />
                            <div className="p-8 lg:p-12">
                                <h3 className="text-2xl font-bold text-primary-navy mb-8">Send us a message</h3>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Form Fields - Floating Labels */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FloatingLabelInput
                                            label="Full Name"
                                            register={register('name')}
                                            error={errors.name?.message}
                                        />
                                        <FloatingLabelInput
                                            label="Email Address"
                                            register={register('email')}
                                            error={errors.email?.message}
                                            type="email"
                                        />
                                    </div>

                                    <FloatingLabelInput
                                        label="Subject"
                                        register={register('subject')}
                                        error={errors.subject?.message}
                                    />

                                    <FloatingLabelTextArea
                                        label="Message"
                                        register={register('message')}
                                        error={errors.message?.message}
                                        rows={5}
                                    />

                                    <button
                                        disabled={isSubmitting}
                                        className="w-full bg-primary-navy text-white py-5 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 hover:bg-primary-gold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="animate-spin" />
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send size={20} />
                                            </>
                                        )}
                                    </button>

                                    {submitStatus === 'success' && (
                                        <div className="text-green-600 bg-green-50 p-4 rounded-xl text-center font-bold border border-green-100 flex items-center justify-center">
                                            <CheckCircle size={20} className="mr-2" /> Message sent successfully!
                                        </div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <div className="text-red-600 bg-red-50 p-4 rounded-xl text-center font-bold border border-red-100">
                                            Failed to send. Please try again.
                                        </div>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
