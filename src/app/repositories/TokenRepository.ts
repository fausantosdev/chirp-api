import { PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient()

type CreateTokenType = {
    emailToken: string
    expiration: Date
    email: string
}

class TokenRepository {
    async create ({ email, emailToken, expiration }: CreateTokenType) {  
        const token = await prisma.token.create({
            data: {
                type: 'EMAIL',
                emailToken,
                expiration,
                // Se existir um usuário com esse email, conecte a este token,
                // se não, crie um, e conect a este token
                user: {
                    connectOrCreate: {
                        where: {
                            email
                        },
                        create: {
                            email
                        }
                    }
                }
            }
        })

        if(!token) return false

        return token
    }
 
    async read (where: {}) {

    }

    async readOne (where = {}) {

    }

    async update (data: object, where: object) {

    }

    async delete (where: object) {

    }
}

export default new TokenRepository()