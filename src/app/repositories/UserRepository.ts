import { PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient()

class UserRepository {
    async create ({}) {  
        return {}
    }
 
    async read (where = {}) {
        /**
         *   where: {
         *       email: 'email@mail.com',
         *   }
         */
        const users = await prisma.user.findMany({ where })
        
        if(!users) return false

        return users
    }

    async readOne (where = {}) {
        const user = await prisma.user.findUnique({ where })

        if (!user) return false

        return user
    }

    async update (data: object, where: object) {
        return where
    }

    async delete (where: object) {
        return where
    }
}

export default new UserRepository()