import { PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient()

type CreateUser = {
    name: string,
    username: string,
    email: string,
}

class UserRepository {
    async create ({ name, username, email }: CreateUser) {  
        const user = await prisma.user.create({
            data: {
                name,
                username,
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

export default new UserRepository()