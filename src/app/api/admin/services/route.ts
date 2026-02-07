import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // body.features is already a serialized string from the client

        const service = await prisma.service.create({
            data: {
                slug: body.slug,
                title: body.title,
                description: body.description,
                fullDesc: body.fullDesc,
                features: body.features, // JSON string
                icon: body.icon,
                order: body.order || 0,
            },
        });
        return NextResponse.json(service);
    } catch (error) {
        console.error('Create Service Error:', error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
