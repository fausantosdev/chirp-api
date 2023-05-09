import { Router } from 'express'

import authRoutes from './auth'
import userRoutes from './user'
import chirpRoutes from './chirp'
//1const testesRout require(es = require('./testes')

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/user', userRoutes)
routes.use('/chirp', chirpRoutes)

export default routes