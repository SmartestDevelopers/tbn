'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/Sidebar';
import { ArrowLeft, Save, Eye, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { createBlogPost } from '@/app/actions/blog';

export default function CreateBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: '',
        category: 'General',
        author: 'The Global Notariat Team',
        published: true,
        seoTitle: '',
        seoDescription: ''
    });

    const categories = [
        'General',
        'Remote Online Notary',
        'Legal',
        'Real Estate',
        'Healthcare',
        'Business',
        'Expat Services',
        'Authentication',
        'Mobile Notary'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataObj = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataObj.append(key, value.toString());
            });

            await createBlogPost(formDataObj);
            router.push('/admin/blogs');
        } catch (error) {
            console.error('Error creating blog post:', error);
            alert('Failed to create blog post');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
            seoTitle: title
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />

            <div className="flex-1 ml-64">
                <div className="p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/admin/blogs"
                            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-navy mb-4 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Blog Posts</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-primary-navy">Create New Blog Post</h1>
                        <p className="text-gray-600 mt-2">Write and publish a new article for your blog</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="max-w-4xl">
                        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-primary-navy mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-gold focus:border-transparent text-lg"
                                    placeholder="Enter blog post title..."
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-sm font-bold text-primary-navy mb-2">
                                    URL Slug *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                                    placeholder="url-friendly-slug"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    URL: /blog/{formData.slug || 'your-slug-here'}
                                </p>
                            </div>

                            {/* Category & Author */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-primary-navy mb-2">
                                        Category *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-navy mb-2">
                                        Author *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Cover Image */}
                            <div>
                                <label className="block text-sm font-bold text-primary-navy mb-2">
                                    Cover Image URL
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="url"
                                        value={formData.coverImage}
                                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                    <button
                                        type="button"
                                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        <ImageIcon size={20} />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Use Unsplash or other image hosting services
                                </p>
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-sm font-bold text-primary-navy mb-2">
                                    Excerpt *
                                </label>
                                <textarea
                                    required
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-gold focus:border-transparent resize-none"
                                    placeholder="Brief summary of the blog post (shown in listings)..."
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-bold text-primary-navy mb-2">
                                    Content * (Markdown supported)
                                </label>
                                <textarea
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={20}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-gold focus:border-transparent resize-none font-mono text-sm"
                                    placeholder="# Main Heading&#10;&#10;Your content here...&#10;&#10;## Subheading&#10;&#10;*   **Bold text**: Description&#10;*   **Another point**: More info"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Use # for headings, ## for subheadings, **text** for bold, *   for lists
                                </p>
                            </div>

                            {/* SEO Fields */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-bold text-primary-navy mb-4">SEO Settings</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-primary-navy mb-2">
                                            SEO Title
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.seoTitle}
                                            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                                            placeholder="Leave blank to use post title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-primary-navy mb-2">
                                            SEO Description
                                        </label>
                                        <textarea
                                            value={formData.seoDescription}
                                            onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-gold focus:border-transparent resize-none"
                                            placeholder="Leave blank to use excerpt"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Published Toggle */}
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="w-5 h-5 text-primary-gold focus:ring-primary-gold rounded"
                                />
                                <label htmlFor="published" className="text-sm font-bold text-primary-navy">
                                    Publish immediately
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-4 pt-6 border-t">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center space-x-2 px-6 py-3 bg-primary-gold text-white font-bold rounded-xl hover:bg-primary-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save size={20} />
                                    <span>{loading ? 'Creating...' : 'Create Post'}</span>
                                </button>

                                <Link
                                    href="/admin/blogs"
                                    className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
