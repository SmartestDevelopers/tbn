import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/Sidebar";
import { Mail, Clock, MessageSquare } from "lucide-react";
import MessageActionButtons from "@/components/admin/MessageActionButtons";

export const dynamic = 'force-dynamic';

export default async function AdminMessages() {
    const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />
            <main className="flex-grow ml-64 p-10">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-primary-navy">Messages</h1>
                    <p className="text-gray-500">Manage all incoming inquiries from the contact form.</p>
                </header>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#f8fafc] border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Sender</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Subject & Message</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {messages.map((msg: any) => (
                                <tr key={msg.id} className={`hover:bg-gray-50 transition-colors ${msg.status === 'new' ? 'bg-blue-50/30 font-semibold' : ''}`}>
                                    <td className="px-8 py-6">
                                        <p className="text-primary-navy">{msg.name}</p>
                                        <p className="text-xs text-gray-400 flex items-center mt-1 uppercase tracking-tight italic">
                                            <Mail size={12} className="mr-1" /> {msg.email}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6 max-w-md">
                                        <p className="text-primary-navy truncate mb-1">{msg.subject}</p>
                                        <p className="text-sm text-gray-500 line-clamp-2">{msg.message}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center text-xs text-gray-400">
                                            <Clock size={14} className="mr-1.5" />
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase ${msg.status === 'new' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {msg.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <MessageActionButtons id={msg.id} status={msg.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {messages.length === 0 && (
                        <div className="p-20 text-center">
                            <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-gray-400 font-medium">No messages found.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
