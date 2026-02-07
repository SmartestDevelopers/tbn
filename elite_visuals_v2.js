const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const updates = [
        {
            slug: "your-online-notary-session-guide",
            url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
        },
        {
            slug: "validity-of-electronic-signatures",
            url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200"
        },
        {
            slug: "after-hours-mobile-notary-benefits",
            url: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&q=80&w=1200"
        },
        {
            slug: "corporate-solutions-bulk-authentications",
            url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
        },
        {
            slug: "notarizing-wills-and-trusts-for-seniors",
            url: "https://images.unsplash.com/photo-1581578731522-745505146317?auto=format&fit=crop&q=80&w=1200"
        }
    ];

    for (const update of updates) {
        await prisma.blogPost.update({
            where: { slug: update.slug },
            data: { coverImage: update.url }
        });
        console.log(`✅ Elite Visual applied to: ${update.slug}`);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
