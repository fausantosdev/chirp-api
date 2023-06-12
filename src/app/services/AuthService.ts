import UserRepository from '../repositories/UserRepository'
import TokenRepository from '../repositories/TokenRepository'

import CustomException from '../../utils/CustomException'

import { generateEmailToken } from '../../utils/functions'

type IAuth = {
    email: string,
}

class AuthService {
    // Criar usuário se não existir
    // Gerar o token e enviar para o email
    async login ({ email }: IAuth) {
        const emailExixts = await UserRepository.readOne({ email })

        //if (emailExixts) throw new CustomException('E-mail já está sendo utilizado')

        const emailToken = generateEmailToken()
        const expiration = new Date(new Date().getTime() + 10 * 60 * 1000)// Expira em 10 minutos

        const createdToken = await TokenRepository.create({ email, emailToken, expiration })

        if (!createdToken) throw new CustomException('Ocorreu um erro ao se autenticar, por favor tente mais tarde')

        return true
    }

    async authenticate (where = {}) {

        /*const result = await UserRepository.read(where)

        if ( !result ) throw new CustomException('Nenhum usuário encontrado')

        return result*/
    }

    async readOne (where = {}) {
        /*const result = await UserRepository.readOne(where)

        if ( !result ) throw new CustomException('Usuário não encontrado')

        return result*/
    }

    //async update (data: IUpdatedUser, id: number) {
        //const userExists = await UserRepository.readOne({ id })

        //if (!userExists) throw new CustomException('Usuário não encontrado')

        // OBS: findOne retorma um objeto, findMany retorna um array

        /*if ( data.email ) {
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

        return  updatedUser*/
    //}

    async delete (where: object) {
        /*const userExists = await UserRepository.readOne(where)

        if (!userExists) throw new CustomException('Usuário não encontrado')

        const deletedUser = await UserRepository.delete(where)

        return deletedUser*/
    }
}

export default new AuthService()