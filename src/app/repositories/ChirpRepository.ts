import { PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient()

type ICreateChirp = {
    userId: number
    content: string
    image?: string
}

class ChirpRepository {
    async create ({ userId, content, image }: ICreateChirp) {  
        const chirp = await prisma.chirp.create({
            data: {
                userId,
                content,
                image
            }
        })

        return chirp
    }
 
    async read (where: {}) {
        const chirps = await prisma.chirp.findMany({ 
            where,  
            select: { 
                id: true,
                image: true,
                content: true,
                createdAt: true,
                user: { 
                    select: { 
                        username: true 
                    } 
                } 
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        
        if(!chirps) return false

        return chirps
    }

    async readOne (where = {}) {
        const chirp = await prisma.chirp.findUnique({ where, include: { user: true } })

        if (!chirp) return false

        return chirp
    }

    async update (data: object, where: object) {
        return where
    }

    async delete (where: object) {
        const deleted = await prisma.chirp.delete({ where })

        return deleted
    }
}

export { ChirpRepository }