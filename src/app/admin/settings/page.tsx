import { getSettings } from "@/app/actions/admin";
import AdminSidebar from "@/components/admin/Sidebar";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
    const settings = await getSettings();

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />
            <main className="flex-grow ml-64 p-10">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-primary-navy">Global Settings</h1>
                    <p className="text-gray-500">Configure core website information and contacts.</p>
                </header>

                <SettingsForm initialSettings={settings} />
            </main>
        </div>
    );
}
