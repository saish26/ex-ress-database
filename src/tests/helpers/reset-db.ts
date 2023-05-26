import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async () => {
    await prisma.$transaction([
        prisma.post.deleteMany(),
        prisma.user.deleteMany(),
    ])
    await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice@prisma.io',
            name: 'Alice',
        },
    })
}
