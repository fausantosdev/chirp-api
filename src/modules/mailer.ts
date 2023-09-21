import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import { resolve } from 'path'

import mailConfigs from '../config/nodemailer'

const { host, port, auth } = mailConfigs

const transport = nodemailer.createTransport({
    host, port, auth
})

transport.use('compile', hbs({
    viewEngine: {
        extname: '.handlebars',
        partialsDir: resolve('src', 'app', 'resources', 'mail'),
        defaultLayout: false
    },
    viewPath: resolve('src', 'app', 'resources', 'mail'),
    extName: '.handlebars'
}))

export default transport