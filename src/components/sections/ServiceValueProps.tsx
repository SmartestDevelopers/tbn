'use client';

import { motion } from 'framer-motion';
import { Clock, DollarSign, ShieldCheck, Zap } from 'lucide-react';

const values = [
    {
        icon: <Clock className="w-8 h-8" />,
        title: "24/7 Availability",
        desc: "We understand that notarization needs can arise at any time, which is why we offer 24/7 availability for our notary services. We are here for you whenever you need us."
    },
    {
        icon: <DollarSign className="w-8 h-8" />,
        title: "Affordable Rates",
        desc: "We offer competitive and affordable rates for all of our notary services. Professional service shouldn't come with a premium price tag."
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "Legally Compliant",
        desc: "All our services are fully compliant with state and federal laws, ensuring your documents are legally binding and recognized worldwide."
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: "Fast Turnaround",
        desc: "Our streamlined process ensures that your documents are notarized quickly, whether mobile or remote, so you can move forward without delay."
    }
];

export default function ServiceValueProps() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group"
                        >
                            <div className="w-16 h-16 bg-primary-gold/10 rounded-2xl flex items-center justify-center text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-white transition-all duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary-navy mb-4">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
