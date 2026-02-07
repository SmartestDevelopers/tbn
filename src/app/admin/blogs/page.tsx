import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/Sidebar";
import BlogList from "@/components/admin/BlogList";
import { seedBlogs } from "@/lib/blog-data";

export const dynamic = 'force-dynamic';

export default async function AdminBlogsPage() {
    // Seed blogs if none exist
    await seedBlogs();

    const blogs = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-primary-navy mb-2">Blog Posts</h1>
                    <p className="text-gray-500">Manage your content and drive organic traffic.</p>
                </div>
                <BlogList initialBlogs={blogs} />
            </div>
        </div>
    );
}
