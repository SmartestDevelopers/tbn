const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanMarkdown() {
    try {
        const posts = await prisma.blogPost.findMany();

        for (const post of posts) {
            let cleanContent = post.content;

            // Remove # and ## from headings
            cleanContent = cleanContent.replace(/^#\s+(.+)$/gm, '$1');
            cleanContent = cleanContent.replace(/^##\s+(.+)$/gm, '$1');

            // Remove ** from bold text
            cleanContent = cleanContent.replace(/\*\*(.+?)\*\*/g, '$1');

            // Remove list markers
            cleanContent = cleanContent.replace(/^\d+\.\s\s+/gm, '');
            cleanContent = cleanContent.replace(/^\*\s\s\s/gm, '');

            console.log(`Updating post: ${post.title}`);
            console.log(`Old length: ${post.content.length}, New length: ${cleanContent.length}`);

            await prisma.blogPost.update({
                where: { id: post.id },
                data: { content: cleanContent }
            });
        }

        console.log('\n✅ All posts updated successfully!');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

cleanMarkdown();
