import express, { Express } from 'express'
import morgan from  'morgan'
import cors from 'cors'
import path from 'path'

import routes from './app/routes'

class App {
    server: Express

    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.set('port', process.env.PORT || 5000)

        this.server.use(express.json())

        this.server.use(morgan('dev'))

        this.server.use(cors())

        // Rota para os arquivos estáticos(imagens) dos posts.
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
    }

    routes() {
        this.server.use('/',routes)
    }
}

export default new App().server