import { Router } from 'express'

import { UserController }from '../controllers/UserController'

import { verifyToken, checkUserOrIsAdmin } from '../middlewares/auth'

class UserRoutes {
    private router: Router
    private userController: UserController

    constructor() {
        this.router = Router()
        this.userController = new UserController()
    }

    getRoutes() {
        
        this.router.post('/', this.userController.store.bind(this.userController))

        this.router.get('/:id?', verifyToken, this.userController.index.bind(this.userController))
        this.router.put('/:id', checkUserOrIsAdmin, this.userController.update.bind(this.userController))
        this.router.delete('/:id', checkUserOrIsAdmin, this.userController.remove.bind(this.userController))
        
        return this.router
    }
}

export { UserRoutes }