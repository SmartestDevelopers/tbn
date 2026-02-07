'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, FileText, ExternalLink } from 'lucide-react';
import { deleteBlogPost } from '@/app/actions/blog';
import { format } from 'date-fns';

interface BlogListProps {
    initialBlogs: any[];
}

export default function BlogList({ initialBlogs }: BlogListProps) {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        setIsDeleting(id);
        const result = await deleteBlogPost(id);
        if (result.success) {
            setBlogs(blogs.filter(b => b.id !== id));
        } else {
            alert('Failed to delete');
        }
        setIsDeleting(null);
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-gold/20 text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Link
                    href="/admin/blogs/create"
                    className="flex items-center space-x-2 bg-primary-navy text-white px-6 py-3 rounded-xl hover:bg-primary-gold transition-colors font-bold shadow-lg shadow-primary-navy/20"
                >
                    <Plus size={20} />
                    <span>New Post</span>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                        <tr>
                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Published Date</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredBlogs.map((blog) => (
                            <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-8 py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            {blog.coverImage ? (
                                                <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <FileText size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-primary-navy">{blog.title}</p>
                                            <p className="text-xs text-gray-400 truncate w-64">{blog.excerpt}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">
                                        {blog.category}
                                    </span>
                                </td>
                                <td className="px-8 py-4 text-sm text-gray-500">
                                    {format(new Date(blog.createdAt), 'MMM d, yyyy')}
                                </td>
                                <td className="px-8 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/blog/${blog.slug}`} target="_blank" className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-primary-navy">
                                            <ExternalLink size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"
                                            disabled={isDeleting === blog.id}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredBlogs.length === 0 && (
                <div className="p-12 text-center text-gray-400">
                    <FileText size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No blog posts found.</p>
                </div>
            )}
        </div>
    );
}
