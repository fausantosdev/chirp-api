import { Router } from 'express'

import { ChirpController } from '../controllers/ChirpController'

import { verifyToken, checkUserOrIsAdmin } from '../middlewares/auth'

class ChirpRoutes {
    private router: Router
    private chirpController: ChirpController

    constructor() {
        this.router = Router()
        this.chirpController = new ChirpController()
    }

    getRoutes() {
        
        this.router.post('/', verifyToken, this.chirpController.store.bind(this.chirpController))

        this.router.get('/:id?', verifyToken, this.chirpController.index.bind(this.chirpController))
        //routes.put('/:id', checkUserOrIsAdmin, UserController.update)
        this.router.delete('/:id', checkUserOrIsAdmin, this.chirpController.remove.bind(this.chirpController))
        
        return this.router
    }
}

export { ChirpRoutes }