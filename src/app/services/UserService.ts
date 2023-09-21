import { UserRepository } from '../repositories/UserRepository'

import CustomException from '../../utils/CustomException'

type ICreateUser = {
    name: string,
    username: string,
    email: string,
}

type IUpdatedUser = {
    name?: string,
    username?: string,
    email: string,
}

type UserListType = {
    id: number
    username: string | null
    email: string
    image: string | null
}

class UserService {
    private userRepository: UserRepository
    
    constructor() {
        this.userRepository = new UserRepository()
    }

    async create ({ email }: ICreateUser) {

        const emailExixts = await this.userRepository.readOne({ email })

        if (emailExixts) throw new CustomException('E-mail já está sendo utilizado')

        const result = await this.userRepository.create({
            email
        })

        return result
    }

    async read (where = {}) {

        const result = await this.userRepository.read(where)

        if ( !result ) throw new CustomException('Nenhum usuário encontrado')

        return result
    }

    async readOne (where = {}) {
        const result = await this.userRepository.readOne(where)

        if ( !result ) throw new CustomException('Usuário não encontrado')

        return result
    }

    async update (data: IUpdatedUser, id: number) {
        const userExists = await this.userRepository.readOne({ id })

        if (!userExists) throw new CustomException('Usuário não encontrado')

        // OBS: findOne retorma um objeto, findMany retorna um array

        if ( data.email ) {
            const sameEmail = await this.userRepository.read({
                AND: [
                    { id: id },
                    { email: data.email }
                ]
            })

            if (Object.keys(sameEmail).length != 0) throw new CustomException('Você já esta utilizando este email')

            const emailExists = await this.userRepository.readOne({ email: data.email })

            if (emailExists) throw new CustomException('Email já esta sendo utilizado')
        }

        const updatedUser = await this.userRepository.update(data, id)

        return  updatedUser
    }

    async delete (where: object) {
        const userExists = await this.userRepository.readOne(where)

        if (!userExists) throw new CustomException('Usuário não encontrado')

        const deletedUser = await this.userRepository.delete(where)

        return deletedUser
    }
}

export { UserService }