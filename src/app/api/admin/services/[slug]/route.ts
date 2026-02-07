import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    try {
        const body = await req.json();

        const service = await prisma.service.update({
            where: { slug: slug },
            data: {
                title: body.title,
                description: body.description,
                fullDesc: body.fullDesc,
                features: body.features,
                icon: body.icon,
                // Do not update slug typically, or handle with care
            },
        });
        return NextResponse.json(service);
    } catch (error) {
        console.error('Update Service Error:', error);
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    try {
        await prisma.service.delete({
            where: { slug: slug },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete Service Error:', error);
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
