'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { NavItem } from '../../types';

interface MegaMenuProps {
    items: NavItem[];
    isScrolled?: boolean;
}

export default function MegaMenu({ items, isScrolled }: MegaMenuProps) {
    return (
        <nav className="hidden lg:flex items-center space-x-8">
            {items.map((item) => (
                <div key={item.label} className="relative group">
                    <Link
                        href={item.href}
                        className={`font-bold transition-all py-4 ${isScrolled
                                ? 'text-primary-navy hover:text-primary-gold'
                                : 'text-white hover:text-primary-gold'
                            }`}
                    >
                        {item.label}
                    </Link>

                    {item.children && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, visibility: 'hidden' }}
                            whileHover={{ opacity: 1, y: 0, visibility: 'visible' }}
                            className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl p-4 border border-gray-100 mt-2 z-50 invisible group-hover:visible"
                        >
                            <div className="grid gap-2">
                                {item.children.map((child: NavItem) => (
                                    <Link
                                        key={child.label}
                                        href={child.href}
                                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-all group/item hover:translate-x-1"
                                    >
                                        {child.icon && (
                                            <span className="text-primary-gold group-hover/item:scale-110 transition-transform bg-primary-gold/5 p-2 rounded-lg">
                                                {child.icon}
                                            </span>
                                        )}
                                        <span className="text-primary-navy font-bold text-sm">{child.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            ))}
        </nav>
    );
}
