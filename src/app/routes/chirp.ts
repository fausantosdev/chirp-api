import { Router } from 'express'

import chirpController from '../controllers/ChirpController'

import { verifyToken } from '../middlewares/auth'

const routes = Router()

routes.post('/', chirpController.store)

routes.get('/:id?', chirpController.index)
//routes.put('/:id', checkUserOrIsAdmin, UserController.update)
//routes.delete('/:id', checkUserOrIsAdmin, UserController.remove)

export default routes