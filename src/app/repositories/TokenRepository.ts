import { Prisma, PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient()

type CreateTokenType = {
    type: string
    emailToken?: string
    expiration: Date
    email: string,
    user: object
}

class TokenRepository {
    async create ({ type, emailToken, expiration, user }: CreateTokenType) {  
        const token = await prisma.token.create({
            data: {
                type: type,
                emailToken,
                expiration,
                user
            }
        })

        if(!token) return false

        return token
    }
 
    async read (where: Prisma.TokenWhereInput) {
        const token = prisma.token.findMany({ where })

        if(!token) return false

        return token
    }

    async readOne (where: Prisma.TokenWhereUniqueInput) {
        const token = await prisma.token.findUnique({ 
            where,
            include: {
                user: true
            }
        })

        //console.log(token)

        if (!token) return false

        return token    
    }

    async update (data: object, where: Prisma.TokenWhereUniqueInput) {
        const updatedToken = await prisma.token.update({ where, data })

        if (!updatedToken) return false

        return updatedToken 
    }

    async delete (where: Prisma.TokenWhereUniqueInput) {
        let deletedToken
        
        if (Object.keys(where).length === 0) {
            deletedToken = await prisma.token.delete({ where })
        } else {
            deletedToken = await prisma.token.deleteMany()
        }

        if (Object.keys(deletedToken).length == 0) return false
        
        if (!deletedToken) return false

        return deletedToken  
    }
}

export { TokenRepository }