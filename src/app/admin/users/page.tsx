import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/Sidebar";
import UsersClient from "@/components/admin/UsersClient";

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />
            <main className="flex-grow ml-64 p-10">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-primary-navy">User Management</h1>
                    <p className="text-gray-500">Manage system users, roles, and permissions.</p>
                </header>

                <UsersClient initialUsers={users} />
            </main>
        </div>
    );
}
