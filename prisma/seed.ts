import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const services = [
        {
            title: 'Remote Online Notary',
            slug: 'remote-online-notary',
            description: 'Notarize your documents from anywhere in the world using our secure video conferencing platform. Fast, legal, and globally accessible.',
            fullDesc: 'Remote Online Notarization (RON) allows you to legally notarize documents from any device with a camera and internet connection. Our platform uses state-of-the-art encryption and multifactor authentication to ensure your documents are secure and fully compliant with state and international laws. Whether you are across town or across the globe, we bring the notary to you.',
            features: ['24/7 Global Access', 'KBA/Identity Proofing', 'Digital Seals', 'Tamper-Evident Tech'],
            icon: 'Globe',
            order: 1
        },
        {
            title: 'Mobile Notary',
            slug: 'mobile-notary',
            description: 'We come to you! Professional mobile notary services available at your home, office, hospital, or any location in Central Florida.',
            fullDesc: 'Our Mobile Notary services provide the ultimate convenience for individuals and businesses in Central Florida. We travel to your preferred location—be it your residence, place of business, coffee shop, or even a medical facility. Our certified notaries arrive on time, verify identities with precision, and ensure your signing process is smooth and professional.',
            features: ['On-Site Signing', 'Flexible Scheduling', 'Emergency Services', 'Travel to Orlando/Kissimmee'],
            icon: 'Shield',
            order: 2
        },
        {
            title: 'Loan Signing',
            slug: 'loan-signing',
            description: 'Expert certified loan signing agents specialized in real estate transactions, refinances, and mortgage documents.',
            fullDesc: 'For mortgage lenders, title companies, and signing services, our Certified Loan Signing Agents provide error-free execution of real estate documents. We handles Purchases, Refinances, HELOCs, Seller Packages, and Reverse Mortgages with the highest level of professionalism, ensuring all signatures and initials are captured correctly for a timely closing.',
            features: ['NNA Certified', 'E&O Insured', 'Prompt Return Delivery', 'Scan Backs Available'],
            icon: 'FileText',
            order: 3
        },
        {
            title: 'Apostille Authentication',
            slug: 'apostille-authentication',
            description: 'Expedited Apostille and document authentication services for documents being used in foreign countries (Hague Convention).',
            fullDesc: 'Navigating international document requirements can be complex. We simplify the Apostille process for documents intended for use in Hague Convention countries. We handle the coordination with the Secretary of State to ensure your birth certificates, diplomas, power of attorney, and corporate documents are authenticated correctly for international recognition.',
            features: ['International Validity', 'Secretary of State Filing', 'Document Review', 'Express Processing'],
            icon: 'Award',
            order: 4
        },
        {
            title: 'Wedding Officiant',
            slug: 'wedding-officiant',
            description: 'Legal wedding officiant services to make your special day official. Available for ceremonies and simple license signings.',
            fullDesc: 'Celebrate your union with a professional who understands the legal requirements of marriage. We provide wedding officiant services throughout Central Florida, ranging from simple marriage license signings to full ceremony officiating. We ensure your license is completed correctly and filed promptly with the appropriate county court.',
            features: ['Legal License Filing', 'Ceremony Officiating', 'Bilingual Services', 'Vow Customization'],
            icon: 'Gavel',
            order: 5
        }
    ]

    console.log('Start seeding...')

    for (const s of services) {
        const service = await prisma.service.upsert({
            where: { slug: s.slug },
            update: {
                title: s.title,
                description: s.description,
                fullDesc: s.fullDesc,
                features: JSON.stringify(s.features),
                icon: s.icon,
                order: s.order,
            },
            create: {
                slug: s.slug,
                title: s.title,
                description: s.description,
                fullDesc: s.fullDesc,
                features: JSON.stringify(s.features),
                icon: s.icon,
                order: s.order,
            }
        })
        console.log(`Created service: ${service.title}`)
    }

    // Also add missing fields to Prisma for slugs, fullDesc, features if possible 
    // Wait, I should update the Prisma schema first to match the full data
    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
