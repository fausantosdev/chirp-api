import customException from '../../utils/CustomException'

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

export default new UserService()