import Chirp from '../repositories/ChirpRepository'
import customException from '../../utils/CustomException'

class ChirpService {
    async create ({}) {
        return {}
    }

    async read (where: object) {
        return where
    }

    async readById (id: object) {
        if ( !id ) {
            return id
        }
        return id
    }

    async update (data: object, where: object) {
        return where
    }

    async delete (where: object) {
        return where
    }
}

export default new ChirpService()