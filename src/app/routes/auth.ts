import { Router } from 'express'

//import UserController from '../controllers/UserController'
import AuthController from '../controllers/AuthController'

import { verifyToken } from '../middlewares/auth'

const routes = Router()

routes.post('/login', AuthController.login)
/*routes.post('/login', AuthController.login)
routes.post('/forget-password', AuthController.login)

routes.post('/logout', verifyToken, AuthController.logout)
routes.post('/token-refresh', verifyToken, AuthController.tokenRefresh)
routes.post('/recover-password', verifyToken, AuthController.recoverPassword)*/

export default routes