const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const existingUser = await prisma.user.findFirst({
        where: { email: 'admin@tbn.com' }
    });

    if (!existingUser) {
        await prisma.user.create({
            data: {
                name: 'Admin',
                email: 'admin@tbn.com',
                password: 'password123',
                role: 'admin',
            },
        });
        console.log('Admin user created');
    }

    const settings = await prisma.siteSettings.findFirst();
    if (!settings) {
        await prisma.siteSettings.create({
            data: {
                siteName: 'The Global Notariat',
                contactEmail: 'info@theglobalnotariat.com',
                contactPhone: '+1 (407) 684-5550',
                address: 'Central Florida, USA',
            },
        });
        console.log('Initial settings created');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
