import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/Sidebar";

export const dynamic = 'force-dynamic';

export default async function AdminSubscribers() {
    const subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />
            <main className="flex-grow ml-64 p-10">
                <header className="mb-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-primary-navy">Subscribers</h1>
                        <p className="text-gray-500">View and manage your newsletter subscribers.</p>
                    </div>
                    <div className="bg-primary-navy text-white px-4 py-2 rounded-lg font-bold">
                        Total: {subscribers.length}
                    </div>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date Subscribed</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {subscribers.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                                            No subscribers yet.
                                        </td>
                                    </tr>
                                ) : (
                                    subscribers.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 border-l-4 border-transparent hover:border-primary-gold">
                                                {sub.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(sub.createdAt).toLocaleDateString()} at {new Date(sub.createdAt).toLocaleTimeString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
