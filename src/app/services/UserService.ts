import UserRepository from '../repositories/UserRepository'

import CustomException from '../../utils/CustomException'

type CreateUser = {
    name: string,
    username: string,
    email: string,
}

class UserService {
    async create ({ name, username, email }: CreateUser) {
        const usernameExists = await UserRepository.readOne({ username })

        if (usernameExists) throw new CustomException('Username já está sendo utilizado')

        const emailExixts = await UserRepository.readOne({ email })

        if (emailExixts) throw new CustomException('E-mail já está sendo utilizado')

        const result = await UserRepository.create({
            name,
            username,
            email
        })

        return result
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