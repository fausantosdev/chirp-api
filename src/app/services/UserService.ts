import UserRepository from '../repositories/UserRepository'

import CustomException from '../../utils/CustomException'

type CreateUser = {
    name: string,
    username: string,
    email: string,
    password: string
}

class UserService {
    async create ({}: CreateUser) {
        return {}
    }

    async read (where = {}) {

        const result = await UserRepository.read(where)

        if ( !result ) throw new CustomException('Nenhum usuário encontrado')

        return result
    }

    async readOne (where = {}) {
        const result = await UserRepository.readOne(where)

        if ( !result ) throw new CustomException('Usuário não encontrado')

        return result
    }

    async update (data: object, where: object) {
        return where
    }

    async delete (where: object) {
        return where
    }
}

export default new UserService()