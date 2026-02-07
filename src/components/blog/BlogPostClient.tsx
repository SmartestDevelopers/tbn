'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import ShareButton from "@/components/blog/ShareButton";
import { Calendar, User, ArrowLeft, Clock, Tag } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string | null;
    author: string;
    category: string;
    createdAt: Date;
}

export default function BlogPostClient({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
    const [contentElements, setContentElements] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        const parseContent = () => {
            const elements: React.ReactElement[] = [];
            const sections = post.content.split('\n\n');
            let keyCounter = 0;

            // Helper function to parse bold text
            const parseBoldText = (text: string) => {
                const parts: (string | React.ReactElement)[] = [];
                let lastIndex = 0;
                const regex = /\*\*(.+?)\*\*/g;
                let match;
                let partKey = 0;

                while ((match = regex.exec(text)) !== null) {
                    // Add text before the match
                    if (match.index > lastIndex) {
                        parts.push(<span key={`text-${partKey++}`}>{text.substring(lastIndex, match.index)}</span>);
                    }
                    // Add the bold text
                    parts.push(<strong key={`bold-${partKey++}`} className="font-bold text-primary-navy">{match[1]}</strong>);
                    lastIndex = regex.lastIndex;
                }

                // Add remaining text
                if (lastIndex < text.length) {
                    parts.push(<span key={`text-${partKey++}`}>{text.substring(lastIndex)}</span>);
                }

                return parts.length > 0 ? parts : [text];
            };

            sections.forEach((section) => {
                const trimmed = section.trim();
                if (!trimmed) return;

                // Handle main headings (# )
                if (trimmed.startsWith('# ')) {
                    const text = trimmed.substring(2);
                    elements.push(
                        <div key={keyCounter++} className="mb-10">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-2 h-12 bg-gradient-to-b from-primary-gold to-primary-navy rounded-full" />
                                <h2 className="text-3xl md:text-4xl font-bold text-primary-navy">
                                    {text}
                                </h2>
                            </div>
                        </div>
                    );
                }
                // Handle subheadings (## )
                else if (trimmed.startsWith('## ')) {
                    const text = trimmed.substring(3);
                    elements.push(
                        <div key={keyCounter++} className="mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-primary-navy mb-4">
                                {text}
                            </h3>
                        </div>
                    );
                }
                // Handle list items
                else if (trimmed.startsWith('*   ') || trimmed.match(/^\d+\.\s+/)) {
                    const lines = section.split('\n').filter(line => {
                        const t = line.trim();
                        return t.startsWith('*   ') || t.match(/^\d+\.\s+/);
                    });

                    const listItems = lines.map((line, idx) => {
                        // Remove list marker
                        let content = line.trim();
                        if (content.startsWith('*   ')) {
                            content = content.substring(4);
                        } else if (content.match(/^\d+\.\s+/)) {
                            content = content.replace(/^\d+\.\s+/, '');
                        }

                        return (
                            <div key={idx} className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-primary-gold/30 transition-all group">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-gold to-yellow-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1 text-gray-600">
                                    {parseBoldText(content)}
                                </div>
                            </div>
                        );
                    });

                    elements.push(
                        <div key={keyCounter++} className="mb-10 space-y-4">
                            {listItems}
                        </div>
                    );
                }
                // Handle regular paragraphs
                else {
                    elements.push(
                        <p key={keyCounter++} className="text-lg text-gray-700 leading-relaxed mb-8">
                            {parseBoldText(trimmed)}
                        </p>
                    );
                }
            });

            setContentElements(elements);
        };

        parseContent();
    }, [post.content]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Header variant="light" />

            {/* Hero Section with Cover Image */}
            <section className="pt-24 pb-0 relative">
                {/* Cover Image */}
                {post.coverImage && (
                    <div className="relative w-full h-[60vh] mb-16">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10" />
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Article Header */}
                <div className="container mx-auto px-4 max-w-4xl -mt-32 relative z-20">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                        {/* Back Button */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center space-x-2 text-gray-500 hover:text-primary-gold mb-6 group transition-colors"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium">Back to Articles</span>
                        </Link>

                        {/* Category Badge */}
                        <div className="flex items-center space-x-2 mb-6">
                            <Tag size={16} className="text-primary-gold" />
                            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-primary-gold/10 to-primary-gold/5 text-primary-gold border border-primary-gold/20">
                                {post.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-8 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-500 pb-8 border-b border-gray-200">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 rounded-full bg-primary-gold/10 flex items-center justify-center">
                                    <User size={18} className="text-primary-gold" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Written by</p>
                                    <p className="font-bold text-primary-navy text-sm">{post.author}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar size={18} className="text-primary-gold" />
                                <span className="text-sm">{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock size={18} className="text-primary-gold" />
                                <span className="text-sm">5 min read</span>
                            </div>
                            <div className="ml-auto">
                                <ShareButton
                                    url={`/blog/${post.slug}`}
                                    title={post.title}
                                    description={post.excerpt}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                        {/* Excerpt/Introduction */}
                        <div className="mb-12 pb-12 border-b border-gray-200">
                            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light italic">
                                {post.excerpt}
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="prose prose-lg max-w-none">
                            {contentElements}
                        </div>

                        {/* Call to Action */}
                        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary-navy to-blue-900 text-white">
                            <div className="flex flex-col md:flex-row items-center justify-between">
                                <div className="mb-6 md:mb-0">
                                    <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
                                    <p className="text-blue-100">Experience professional notary services today.</p>
                                </div>
                                <Link
                                    href="/contact"
                                    className="px-8 py-4 bg-primary-gold text-primary-navy font-bold rounded-full hover:bg-white transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                                >
                                    Get Notarized Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">Related Articles</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-primary-gold to-yellow-600 mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
                                >
                                    {relatedPost.coverImage && (
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={relatedPost.coverImage}
                                                alt={relatedPost.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <span className="text-xs font-bold text-primary-gold mb-2 block">{relatedPost.category}</span>
                                        <h3 className="text-xl font-bold text-primary-navy mb-2 group-hover:text-primary-gold transition-colors line-clamp-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3">{relatedPost.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
