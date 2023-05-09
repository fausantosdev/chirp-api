class ChirpRepository {
    async create ({}) {  
        return {}
    }
 
    async read (where: object) {
        return where
    }

    async update (data: object, where: object) {
        return where
    }

    async delete (where: object) {
        return where
    }
}

export default new ChirpRepository()