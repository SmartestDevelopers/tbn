'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { LayoutDashboard, MessageSquare, Settings, Users, Shield, LogOut, FileText, ExternalLink } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
        { label: 'Messages', href: '/admin/messages', icon: <MessageSquare size={20} /> },
        { label: 'Blog Posts', href: '/admin/blogs', icon: <FileText size={20} /> },
        { label: 'Subscribers', href: '/admin/subscribers', icon: <Users size={20} /> },
        { label: 'Services', href: '/admin/services', icon: <Shield size={20} /> },
        { label: 'Users', href: '/admin/users', icon: <Users size={20} /> },
        { label: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="w-64 bg-primary-navy min-h-screen text-white/70 p-6 flex flex-col fixed left-0 top-0">
            <div className="flex items-center space-x-2 mb-6 text-white">
                <Shield className="text-primary-gold" />
                <span className="font-bold text-lg tracking-tight">TBN ADMIN</span>
            </div>

            {/* Go to Website Button */}
            <Link
                href="/"
                target="_blank"
                className="flex items-center justify-center space-x-2 px-4 py-3 mb-8 rounded-xl bg-primary-gold text-primary-navy font-bold hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
            >
                <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
                <span>Go to Website</span>
            </Link>

            <nav className="flex-grow space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${pathname === item.href
                            ? 'bg-primary-gold text-white font-bold shadow-lg shadow-primary-gold/20'
                            : 'hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <button
                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all mt-auto"
                onClick={() => { }} // Handle logout
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
    );
}
