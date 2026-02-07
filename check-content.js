const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkContent() {
    try {
        const post = await prisma.blogPost.findFirst({
            where: { slug: 'your-online-notary-session-guide' }
        });

        if (post) {
            console.log('=== POST FOUND ===');
            console.log('Title:', post.title);
            console.log('\n=== CONTENT (first 800 chars) ===');
            console.log(post.content.substring(0, 800));
            console.log('\n=== CONTENT ANALYSIS ===');
            console.log('Has ** symbols:', post.content.includes('**'));
            console.log('Has # symbols:', post.content.includes('#'));
            console.log('Has * symbols:', post.content.includes('*'));
        } else {
            console.log('Post not found');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkContent();
