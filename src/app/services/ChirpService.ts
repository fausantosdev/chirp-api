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

        if ( !result ) throw new CustomException('Nenhum post encontrado')

        return result
    }

    async readOne (where = {}) {
        const result = await ChirpRepository.readOne(where)

        if ( !result ) throw new CustomException('Post não encontrado')

        return result
    }

    async update (data: object, where: object) {
        return where
    }

    async delete (where: object) {
        return where
    }
}

export default new ChirpService()