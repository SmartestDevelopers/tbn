import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/Sidebar";
import { Plus } from "lucide-react";
import ServicesClient from "@/components/admin/ServicesClient";

export default async function AdminServices() {
    const services = await prisma.service.findMany({
        orderBy: { order: 'asc' },
    });

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />
            <main className="flex-grow ml-64 p-10">
                <header className="mb-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-primary-navy">Manage Services</h1>
                        <p className="text-gray-500">Add, edit, or remove services offered on the website.</p>
                    </div>
                </header>

                <ServicesClient initialServices={services} />
            </main>
        </div>
    );
}
