'use client';

import { useState, useEffect } from 'react';
import {
    Share2, X, Facebook, Twitter, Linkedin, Mail,
    Link as LinkIcon, MessageCircle, Send, Plus,
    Check, Copy, Globe, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonProps {
    url: string;
    title: string;
    description: string;
}

export default function ShareButton({ url, title, description }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const fullUrl = typeof window !== 'undefined' ? window.location.origin + url : url;

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const shareLinks = [
        {
            name: 'Facebook',
            icon: <Facebook className="w-5 h-5" />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
            color: '#1877F2',
            bgColor: 'bg-[#1877F2]/10',
            hoverBg: 'hover:bg-[#1877F2]',
            textColor: 'text-[#1877F2]'
        },
        {
            name: 'Twitter',
            icon: <Twitter className="w-5 h-5" />,
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
            color: '#1DA1F2',
            bgColor: 'bg-[#1DA1F2]/10',
            hoverBg: 'hover:bg-[#1DA1F2]',
            textColor: 'text-[#1DA1F2]'
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin className="w-5 h-5" />,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
            color: '#0A66C2',
            bgColor: 'bg-[#0A66C2]/10',
            hoverBg: 'hover:bg-[#0A66C2]',
            textColor: 'text-[#0A66C2]'
        },
        {
            name: 'WhatsApp',
            icon: <MessageCircle className="w-5 h-5" />,
            url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + fullUrl)}`,
            color: '#25D366',
            bgColor: 'bg-[#25D366]/10',
            hoverBg: 'hover:bg-[#25D366]',
            textColor: 'text-[#25D366]'
        },
        {
            name: 'Telegram',
            icon: <Send className="w-5 h-5" />,
            url: `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
            color: '#0088CC',
            bgColor: 'bg-[#0088CC]/10',
            hoverBg: 'hover:bg-[#0088CC]',
            textColor: 'text-[#0088CC]'
        },
        {
            name: 'Reddit',
            icon: <Globe className="w-5 h-5" />,
            url: `https://reddit.com/submit?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`,
            color: '#FF4500',
            bgColor: 'bg-[#FF4500]/10',
            hoverBg: 'hover:bg-[#FF4500]',
            textColor: 'text-[#FF4500]'
        },
        {
            name: 'Email',
            icon: <Mail className="w-5 h-5" />,
            url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + fullUrl)}`,
            color: '#EA4335',
            bgColor: 'bg-[#EA4335]/10',
            hoverBg: 'hover:bg-[#EA4335]',
            textColor: 'text-[#EA4335]'
        },
        {
            name: 'Pinterest',
            icon: <Plus className="w-5 h-5" />,
            url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}&description=${encodeURIComponent(title)}`,
            color: '#BD081C',
            bgColor: 'bg-[#BD081C]/10',
            hoverBg: 'hover:bg-[#BD081C]',
            textColor: 'text-[#BD081C]'
        }
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:text-primary-gold hover:border-primary-gold transition-all shadow-sm"
            >
                <Share2 size={18} />
                <span className="font-semibold text-sm">Share</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-primary-navy/40 backdrop-blur-sm z-[100]"
                        />

                        {/* Modal Container */}
                        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] pointer-events-auto w-full max-w-md overflow-hidden"
                            >
                                {/* Header */}
                                <div className="relative pt-10 pb-6 px-8 text-center bg-gradient-to-b from-gray-50 to-white">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                                    >
                                        <X size={20} />
                                    </button>

                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary-gold/10 text-primary-gold mb-4">
                                        <Share2 size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-primary-navy tracking-tight">Spread the Word</h3>
                                    <p className="text-sm text-gray-500 mt-2">Share this professional insight with your network</p>
                                </div>

                                {/* Content */}
                                <div className="px-8 pb-10">
                                    {/* Grid */}
                                    <div className="grid grid-cols-4 gap-4 mb-8">
                                        {shareLinks.map((platform, idx) => (
                                            <motion.a
                                                key={platform.name}
                                                href={platform.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className={`flex flex-col items-center group`}
                                            >
                                                <div className={`w-12 h-12 rounded-2xl ${platform.bgColor} ${platform.textColor} ${platform.hoverBg} group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1`}>
                                                    {platform.icon}
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider group-hover:text-gray-900 transition-colors">
                                                    {platform.name}
                                                </span>
                                            </motion.a>
                                        ))}
                                    </div>

                                    {/* Copy Link Section */}
                                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                        <div className="flex items-center justify-between mb-3 px-1">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Article Link</span>
                                            {copied && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full"
                                                >
                                                    COPIED!
                                                </motion.span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-white rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-500 font-medium truncate">
                                                {fullUrl}
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={copyToClipboard}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm ${copied
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-primary-navy text-white hover:bg-primary-navy/90'
                                                    }`}
                                            >
                                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                                <span>{copied ? 'Copied' : 'Copy'}</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Decor */}
                                <div className="h-2 bg-gradient-to-r from-primary-navy via-primary-gold to-primary-navy opacity-80" />
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
