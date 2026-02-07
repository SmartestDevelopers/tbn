'use client';

import { motion } from 'framer-motion';

export default function BlogHeroContent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
        >
            <span className="inline-block px-4 py-1.5 bg-primary-gold/10 text-primary-gold rounded-full text-xs font-bold tracking-widest mb-6 border border-primary-gold/20 backdrop-blur-sm">
                KNOWLEDGE CENTER
            </span>
            <h1 className="text-5xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter shadow-sm">
                Expert <span className="text-primary-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">Notary</span> Insights
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed font-medium opacity-90 border-l-4 border-primary-gold pl-6">
                Stay informed with the latest trends, guides, and best practices in notarization, authentication, and legal document services.
            </p>
        </motion.div>
    );
}
