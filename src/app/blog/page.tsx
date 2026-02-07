import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import BlogHeroContent from "@/components/blog/BlogHeroContent";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Blog | The Global Notariat - Expert Notary Insights",
    description: "Stay informed with expert articles on remote online notarization, mobile notary services, legal document authentication, and more from The Global Notariat.",
};

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    });

    const categories = Array.from(new Set(posts.map(p => p.category)));

    return (
        <main className="min-h-screen bg-white">
            <Header variant="dark" />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-navy via-primary-navy to-blue-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-gold/10 rounded-full -mr-40 -mt-20 blur-3xl" />
                <div className="container mx-auto px-4 relative z-10">
                    <SectionWrapper>
                        <BlogHeroContent />
                    </SectionWrapper>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <SectionWrapper>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
                                >
                                    <div className="relative h-56 bg-gray-100 overflow-hidden">
                                        {post.coverImage ? (
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary-navy to-blue-900 flex items-center justify-center">
                                                <span className="text-6xl text-white/20">📰</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-gold text-white shadow-lg">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-4 text-xs text-gray-400 mb-4">
                                            <div className="flex items-center space-x-1">
                                                <Calendar size={14} />
                                                <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <User size={14} />
                                                <span>{post.author}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center text-primary-gold font-bold text-sm group-hover:gap-2 transition-all">
                                            <span>Read More</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </SectionWrapper>
                </div>
            </section>

            <Footer />
        </main>
    );
}
