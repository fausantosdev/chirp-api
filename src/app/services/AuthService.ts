import { sign } from 'jsonwebtoken'

import { UserRepository } from '../repositories/UserRepository'
import { TokenRepository } from '../repositories/TokenRepository'

import CustomException from '../../utils/CustomException'

import { generateEmailToken } from '../../utils/functions'

import { AuthConfig, TypeAuthConfig } from '../../config/auth'

import mailer from '../../modules/mailer'

type TypeLogin = {
    email: string,
}

type TypeAuth = {
    email: string,
    emailToken: string,
}

type UserType = {
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

type TokenType = {
    id: number
    type: string
    emailToken: string
    valid: boolean
    expiration: Date
    createdAt: Date
    updatedAt: Date
    userId: number
    user: UserType
}

class AuthService {
    private userRepository: UserRepository
    private tokenRepository: TokenRepository
    
    private configs: TypeAuthConfig

    constructor() {
        this.userRepository = new UserRepository()
        this.tokenRepository = new TokenRepository()

        this.configs = AuthConfig
    }
    // Criar usuário se não existir
    // Gerar o token e enviar para o email
    async login ({ email }: TypeLogin) {
        //if (emailExixts) throw new CustomException('E-mail já está sendo utilizado')

        const emailToken = generateEmailToken()

        const expiration = new Date(new Date().getTime() + 10 * 60 * 1000)// Expira em 10 minutos

        const createdToken = await this.tokenRepository.create({ 
            type: 'EMAIL', 
            email, 
            emailToken,
            expiration,
            user: {
                connectOrCreate: {
                    where: {// Pesquisa um usuário com base no email, caso exista, conecta a este token
                        email
                    },
                    create: {
                        email// Se não existe, cria com os valores fornecidos aqui, e coneta a este token
                    }
                }
            }
        })

        if (!createdToken) {
            throw new CustomException('Ocorreu um erro ao se autenticar, por favor tente mais tarde')
        } else {
            const mailSended = await mailer.sendMail({
                from: 'flavio-_santos@hotmail.com',
                to: email,
                subject: 'Chirp - Senha de acesso único',
                text: 'Senha de usu único',
                template: 'uniqueAccessPassword',
                context: {
                    password: createdToken.emailToken
                }
            })
        }

        return true
    }

    async authenticate ({ email, emailToken }: TypeAuth) {

        const emailTokenExists = await this.tokenRepository.readOne({ emailToken }) as TokenType

        if(emailTokenExists && (emailTokenExists.user.email !== email)) throw new CustomException('E-mail inválido')

        if (!emailTokenExists || !emailTokenExists.valid) throw new CustomException('Token inválido')

        if(emailTokenExists.expiration < new Date()) throw new CustomException('Token expired')
        
        const expiration = new Date(new Date().getTime() + 10 * 60 * 60 * 1000)// Expira em 1 dia

        const apiToken = await this.tokenRepository.create(
            {
                type: 'API',
                email,
                expiration,
                user: {
                    connect: {
                        email
                    }
                }
            },
        )
        
        let jwtToken
        
        const { id, isAdmin } = emailTokenExists.user

        if(apiToken) {
            // Invalidar o token de EMAIL para garantir que seja usado apenas uma vez
            await this.tokenRepository.update(
                { 
                    valid: false
                }, 
                { 
                    id: emailTokenExists.id
                }
            )

            jwtToken = this.generateToken({ id, email, isAdmin, tokenId: apiToken.id })
        }

        return jwtToken
    }

    async readTokens (where = {}) {
        const tokens = await this.tokenRepository.read(where)

        if (!tokens) throw new CustomException('Nenhum token ativo')

        return tokens
    }

    async deleteToken (where = {}) {
        const deletedToken = await this.tokenRepository.delete(where)

        if (!deletedToken) throw new CustomException('Nenhum token encontrado')

        return deletedToken
    }
    
    private generateToken (payload: object): string {
        //const payload = { tokenId }

        return sign(payload, this.configs.secret, { expiresIn: this.configs.expiresIn, algorithm: 'HS256', noTimestamp: true })
    }
}

export { AuthService }