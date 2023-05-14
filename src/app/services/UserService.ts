import UserRepository from '../repositories/UserRepository'

import CustomException from '../../utils/CustomException'

type ICreateUser = {
    name: string,
    username: string,
    email: string,
}

type IUpdatedUser = {
    name?: string,
    username?: string,
    email?: string,
}

class UserService {
    async create ({ name, username, email }: ICreateUser) {
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

    async update (data: IUpdatedUser, id: number) {
        const userExists = await UserRepository.readOne({ id })

        if (!userExists) throw new CustomException('Usuário não encontrado')

        // OBS: findOne retorma um objeto, findMany retorna um array

        if ( data.email ) {
            const sameEmail = await UserRepository.read({
                AND: [
                    { id: id },
                    { email: data.email }
                ]
            })

            console.log(sameEmail)

            if (sameEmail.length != 0) throw new CustomException('Você já esta utilizando este email')

            const emailExists = await UserRepository.readOne({ email: data.email })

            if (emailExists) throw new CustomException('Email já esta sendo utilizado')
        }

        const updatedUser = await UserRepository.update(data, id)

        return  updatedUser
    }

    async delete (where: object) {
        return where
    }
}

export default new UserService()