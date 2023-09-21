import { PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient()

type CreateUser = {
    email: string
}

class UserRepository {
    async create ({ email }: CreateUser) {  
        const user = await prisma.user.create({
            data: {
                email
            }
        })

        return user
    }
 
    async read (where = {}) {
        /**
         *   where: {
         *       email: 'email@mail.com',
         *   }
         */
        const users = await prisma.user.findMany({ where, select: { 
            id: true,
            username: true,
            email: true,
            image: true
        } })
        
        if(!users) return false

        return users
    }

    async readOne (where = {}) {
        const user = await prisma.user.findUnique({ where })

        if (!user) return false

        return user
    }

    async update (data: object, id: number) {
        const user = await prisma.user.update({ where: { id } , data })

        return user
    }

    async delete (where: object) {
        const deleted = await prisma.user.delete({ where })
        
        return deleted
    }
}

export { UserRepository }