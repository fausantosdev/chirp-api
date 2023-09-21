import { Router } from 'express'

import { AuthController } from '../controllers/AuthController'

import { isAdmin } from '../middlewares/auth'

const routes = Router()

class AuthRoutes {
    private router: Router
    private authController: AuthController

    constructor() {
        this.router = Router()
        this.authController = new AuthController()
    }

    getRoutes() {
        
        this.router.post('/login', this.authController.login.bind(this.authController))
        this.router.post('/authenticate', this.authController.authenticate.bind(this.authController))
        this.router.get('/tokens', isAdmin, this.authController.getTokens.bind(this.authController))
        this.router.delete('/tokens/:id?', isAdmin, this.authController.deleteToken.bind(this.authController))
        
        return this.router
    }
}

export { AuthRoutes }