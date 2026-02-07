'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Subscribe() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Mocking API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-primary-gold rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-navy rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto bg-primary-navy rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl"
                >
                    {/* Decorative gold stripe */}
                    <div className="absolute top-0 right-0 w-32 h-full bg-primary-gold opacity-10 skew-x-12 translate-x-16" />

                    <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                                Stay <span className="text-primary-gold">Informed</span> on Global Notary Trends
                            </h2>
                            <p className="text-blue-100 text-lg leading-relaxed opacity-80">
                                Join our exclusive newsletter to receive expert insights, legal updates, and special priority session alerts directly in your inbox.
                            </p>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center"
                                >
                                    <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="text-primary-navy w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                                    <p className="text-blue-100">Thank you for subscribing to our updates.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="relative group">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your professional email"
                                            required
                                            className="flex-grow bg-white/10 border border-white/20 text-white placeholder:text-blue-100/50 px-8 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-gold transition-all backdrop-blur-sm text-lg"
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="bg-primary-gold hover:bg-white text-primary-navy font-bold px-10 py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-primary-gold/20 active:scale-95 disabled:opacity-50"
                                        >
                                            {status === 'loading' ? (
                                                <div className="w-6 h-6 border-3 border-primary-navy/30 border-t-primary-navy rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Subscribe <Send size={18} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-blue-100/40 text-xs mt-4 text-center lg:text-left">
                                        * We promise never to spam you. Unsubscribe at any time.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
