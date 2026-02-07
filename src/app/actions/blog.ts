'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBlogPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const category = formData.get('category') as string;
    const coverImage = formData.get('coverImage') as string;

    // Simple slug generator
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
        await prisma.blogPost.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                category,
                coverImage,
                seoTitle: title,
                seoDescription: excerpt
            }
        });
        revalidatePath('/blog');
        revalidatePath('/admin/blogs');
        return { success: true };
    } catch (e) {
        return { error: 'Failed to create blog post' };
    }
}

export async function deleteBlogPost(id: string) {
    try {
        await prisma.blogPost.delete({ where: { id } });
        revalidatePath('/blog');
        revalidatePath('/admin/blogs');
        return { success: true };
    } catch (e) {
        return { error: 'Failed to delete blog post' };
    }
}
