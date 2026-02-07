const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const blogs = {
        "future-of-notarization-why-ron-is-taking-over": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
        "how-to-notarize-documents-from-abroad": "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=1200",
        "mobile-notary-vs-remote-online-notary": "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=1200",
        "5-mistakes-to-avoid-when-notarizing-loan-documents": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
        "understanding-apostilles-when-you-need-one": "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80&w=1200",
        "notary-responsibilities-in-real-estate": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
        "digital-security-keeping-your-data-safe": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
        "notarizing-wills-and-trusts-for-seniors": "https://images.unsplash.com/photo-1581578731522-745505146317?auto=format&fit=crop&q=80&w=1200",
        "after-hours-mobile-notary-benefits": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
        "corporate-solutions-bulk-authentications": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
        "validity-of-electronic-signatures": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
        "your-online-notary-session-guide": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200"
    };

    const services = {
        "remote-online-notary": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
        "mobile-notary": "https://images.unsplash.com/photo-1549194382-70420ac81290?auto=format&fit=crop&q=80&w=1200",
        "loan-signing": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1200",
        "apostille-authentication": "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1200",
        "wedding-officiant": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
    };

    for (const [slug, url] of Object.entries(blogs)) {
        await prisma.blogPost.update({
            where: { slug },
            data: { coverImage: url }
        });
    }

    for (const [slug, url] of Object.entries(services)) {
        // Note: We might need to add icon field if missing, but we'll update the main image field if available
        // Looking at schema, Service has 'icon' but maybe heroImageUrl? Wait, schema has imageUrl in HeroSection and AboutSection but not Service.
        // Service has 'icon' string. We'll use these as high-quality icon/image backgrounds.
        await prisma.service.update({
            where: { slug },
            data: { icon: url }
        });
    }

    console.log("✅ All blog posts and services updated with high-quality professional images!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
