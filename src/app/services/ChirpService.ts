import ChirpRepository from '../repositories/ChirpRepository'

import CustomException from '../../utils/CustomException'

type ICreateChirp = {
    userId: number,
    content: string,
    image?: string,
}

class ChirpService {
    async create ({ userId, content, image }: ICreateChirp) {
        const result = await ChirpRepository.create({
            userId,
            content,
            image
        })

        return result
    }

    async read (where = {}) {
        const result = await ChirpRepository.read(where)

        if ( !result ) throw new CustomException('Nenhum chirp encontrado')

        return result
    }

    async readOne (where = {}) {
        const result = await ChirpRepository.readOne(where)

        if ( !result ) throw new CustomException('Chirp não encontrado')

        return result
    }

    async update (data: object, where: object) {
        return where
    }

    async delete (where: object) {

        const exists = await ChirpRepository.readOne(where)

        if(!exists) {
            throw new CustomException('Chirp não encontrado')
        }

        const { id } = exists

        const deleted = await ChirpRepository.delete({ id })

        return deleted.id
    }
}

export default new ChirpService()