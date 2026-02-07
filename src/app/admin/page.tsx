import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/Sidebar";
import { MessageSquare, Shield, Users, ArrowUpRight } from "lucide-react";
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    let stats = [
        { label: 'Total Messages', value: 0, icon: <MessageSquare />, color: 'text-blue-600 bg-blue-50' },
        { label: 'New Messages', value: 0, icon: <MessageSquare />, color: 'text-green-600 bg-green-50' },
        { label: 'Active Services', value: 0, icon: <Shield />, color: 'text-gold-600 bg-gold-50' },
        { label: 'Admin Users', value: 0, icon: <Users />, color: 'text-purple-600 bg-purple-50' },
    ];
    let recentMessages: any[] = [];

    try {
        stats = [
            { label: 'Total Messages', value: await prisma.contactMessage.count(), icon: <MessageSquare />, color: 'text-blue-600 bg-blue-50' },
            { label: 'New Messages', value: await prisma.contactMessage.count({ where: { status: 'new' } }), icon: <MessageSquare />, color: 'text-green-600 bg-green-50' },
            { label: 'Active Services', value: await prisma.service.count(), icon: <Shield />, color: 'text-gold-600 bg-gold-50' },
            { label: 'Admin Users', value: await prisma.user.count(), icon: <Users />, color: 'text-purple-600 bg-purple-50' },
        ];

        recentMessages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
    } catch (error) {
        console.error("Admin dashboard data fetch failed:", error);
    }

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />
            <main className="flex-grow ml-64 p-10">
                <header className="mb-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-primary-navy">Overview</h1>
                        <p className="text-gray-500">Welcome back to your administration panel.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-primary-navy">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-primary-navy">Recent Messages</h3>
                            <a href="/admin/messages" className="text-primary-gold font-bold text-sm flex items-center">
                                View All <ArrowUpRight size={16} className="ml-1" />
                            </a>
                        </div>
                        <div className="space-y-4">
                            {recentMessages.map((msg) => (
                                <div key={msg.id} className="p-4 bg-gray-50 rounded-xl flex justify-between items-center group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                                    <div>
                                        <p className="font-bold text-primary-navy">{msg.name}</p>
                                        <p className="text-sm text-gray-400 truncate max-w-[200px]">{msg.subject}</p>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${msg.status === 'new' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                                        {msg.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-primary-navy mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/admin/settings" className="p-4 bg-primary-navy text-white rounded-xl font-bold hover:bg-primary-gold transition-all text-sm flex items-center justify-center text-center">Update Settings</Link>
                            <Link href="/admin/services" className="p-4 bg-white border-2 border-primary-navy text-primary-navy rounded-xl font-bold hover:bg-gray-50 transition-all text-sm flex items-center justify-center text-center">Manage Services</Link>
                            <Link href="/admin/settings" className="p-4 bg-white border-2 border-primary-navy text-primary-navy rounded-xl font-bold hover:bg-gray-50 transition-all text-sm flex items-center justify-center text-center">Site Settings</Link>
                            <Link href="/admin/users" className="p-4 bg-white border-2 border-primary-navy text-primary-navy rounded-xl font-bold hover:bg-gray-50 transition-all text-sm flex items-center justify-center text-center">Manage Users</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
