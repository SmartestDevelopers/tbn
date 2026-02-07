const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const updates = [
        {
            slug: "notarizing-wills-and-trusts-for-seniors",
            url: "https://images.unsplash.com/photo-1555421217-d8cf0f0d1aa6?auto=format&fit=crop&q=80&w=1200"
        },
        {
            slug: "validity-of-electronic-signatures",
            url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200"
        },
        {
            slug: "your-online-notary-session-guide",
            url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200"
        },
        {
            slug: "corporate-solutions-bulk-authentications",
            url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
        }
    ];

    for (const update of updates) {
        try {
            await prisma.blogPost.update({
                where: { slug: update.slug },
                data: { coverImage: update.url }
            });
            console.log(`✅ Updated ${update.slug}`);
        } catch (e) {
            console.log(`❌ Failed to update ${update.slug}: ${e.message}`);
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
