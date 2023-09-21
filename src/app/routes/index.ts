import { Router } from 'express'

import { AuthRoutes } from './auth'
import { UserRoutes } from './user'
import { ChirpRoutes } from './chirp'


const userRoutes = new UserRoutes().getRoutes()
const chirpRoutes = new ChirpRoutes().getRoutes()
const authRoutes = new AuthRoutes().getRoutes()

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/user', userRoutes)
routes.use('/chirp', chirpRoutes)

export default routes