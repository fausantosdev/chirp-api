import { Router } from 'express'

import userController from '../controllers/UserController'

import { verifyToken } from '../middlewares/auth'

const routes = Router()

routes.post('/', userController.store)

routes.get('/:id?', userController.index)
//routes.put('/:id', checkUserOrIsAdmin, UserController.update)
//routes.delete('/:id', checkUserOrIsAdmin, UserController.remove)

export default routes