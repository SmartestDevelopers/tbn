const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const updates = [
        {
            slug: "notarizing-wills-and-trusts-for-seniors",
            url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200"
        },
        {
            slug: "validity-of-electronic-signatures",
            url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200"
        },
        {
            slug: "your-online-notary-session-guide",
            url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200"
        }
    ];

    for (const update of updates) {
        await prisma.blogPost.update({
            where: { slug: update.slug },
            data: { coverImage: update.url }
        });
        console.log(`✅ Updated ${update.slug}`);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
