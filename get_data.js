const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const blogs = await prisma.blogPost.findMany({ select: { id: true, title: true, category: true, slug: true } });
    const services = await prisma.service.findMany({ select: { id: true, title: true, slug: true } });
    console.log(JSON.stringify({ blogs, services }, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
