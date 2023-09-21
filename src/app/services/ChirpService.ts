import { ChirpRepository } from '../repositories/ChirpRepository'
import { UserRepository } from '../repositories/UserRepository' 

import CustomException from '../../utils/CustomException'

type ICreateChirp = {
    userId: number,
    content: string,
    image?: string,
}

type TypeUser = {
    id: number
    name: string
    username: string
    email: string
    image: string
    bio: string
    isVerified: boolean
    isAdmin: boolean
    createdAt: Date
    updatedAt: Date
}

class ChirpService {
    private chirpRepository: ChirpRepository
    private userRepository: UserRepository

    constructor() {
        this.chirpRepository = new ChirpRepository()
        this.userRepository = new UserRepository()
    }

    async create ({ userId, content, image }: ICreateChirp) {

        const hasDefinedUsername = await this.userRepository.readOne({ id: userId }) as TypeUser

        if(!hasDefinedUsername.username)throw new CustomException('Antes de fazer uma publicação você precisa definir seu nome de usuário')

        const result = await this.chirpRepository.create({
            userId,
            content,
            image
        })

        return result
    }

    async read (where = {}) {
        const result = await this.chirpRepository.read(where)

        if ( !result ) throw new CustomException('Nenhum chirp encontrado')

        return result
    }

    async readOne (where = {}) {
        const result = await this.chirpRepository.readOne(where)

        if ( !result ) throw new CustomException('Chirp não encontrado')

        return result
    }

    async update (data: object, where: object) {
        return where
    }

    async delete (where: object) {

        const exists = await this.chirpRepository.readOne(where)

        if(!exists) {
            throw new CustomException('Chirp não encontrado')
        }

        const { id } = exists

        const deleted = await this.chirpRepository.delete({ id })

        return deleted.id
    }
}

export { ChirpService }