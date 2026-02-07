'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from 'bcryptjs';

// --- USERS ---

export async function getUsers() {
    return await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function createUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string || 'user';

    if (!email || !password) return { error: 'Email and password required' };

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });
        revalidatePath('/admin/users');
        return { success: true };
    } catch (e) {
        return { error: 'Failed to create user. Email might be in use.' };
    }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({ where: { id } });
        revalidatePath('/admin/users');
        return { success: true };
    } catch (e) {
        return { error: 'Failed to delete user' };
    }
}

// --- SETTINGS ---

export async function getSettings() {
    const settings = await prisma.siteSettings.findFirst();
    if (!settings) {
        // Create default if not exists
        return await prisma.siteSettings.create({
            data: {
                siteName: 'The Global Notariat',
            }
        });
    }
    return settings;
}

export async function updateSettings(formData: FormData) {
    const siteName = formData.get('siteName') as string;
    const contactEmail = formData.get('contactEmail') as string;
    const contactPhone = formData.get('contactPhone') as string;
    const address = formData.get('address') as string;
    const facebookUrl = formData.get('facebookUrl') as string;
    const twitterUrl = formData.get('twitterUrl') as string;
    const instagramUrl = formData.get('instagramUrl') as string;

    try {
        const settings = await prisma.siteSettings.findFirst();

        if (settings) {
            await prisma.siteSettings.update({
                where: { id: settings.id },
                data: {
                    siteName,
                    contactEmail,
                    contactPhone,
                    address,
                    facebookUrl,
                    twitterUrl,
                    instagramUrl
                }
            });
        } else {
            await prisma.siteSettings.create({
                data: {
                    siteName,
                    contactEmail,
                    contactPhone,
                    address,
                    facebookUrl,
                    twitterUrl,
                    instagramUrl
                }
            });
        }
        revalidatePath('/admin/settings');
        return { success: true };
    } catch (e) {
        return { error: 'Failed to update settings' };
    }
}
