const Yup = require('yup')
import { Request, Response } from 'express'

const AuthService = require('../services/auth/AuthService')
const RecoverPasswordService = require('../services/auth/RecoverPasswordService')

class AuthController {
    async login(req: Request, res: Response) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                status: false,
                data: null,
                message: 'Validation fails'
            })
        }

        try {
            const result = await AuthService.login(req.body)

            return res.json({
                status: true,
                data: result,
                message: ''
            })
        } catch (error: any) {
            return res.status(error.code || 500).json({
                status: true,
                data: null,
                message: error.message
            })
        }
        
    }

    async tokenRefresh (req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1]

        try {
            const result = await AuthService.refreshToken(token)

            return res.status(200).json({
                status: true,
                data: result,
                message: ''
            })
        } catch (error: any) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message
            })
        }
    }

    logout(req: Request, res: Response) {
        try {
            //delete req.user

            return res.status(200).json({
                status: true,
            })
        } catch (error: any) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message,
            })
        }
    }

    async recoverPassword (req: Request, res: Response) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                status: false,
                data: null,
                message: 'Validation fails'
            })
        }

        const { email } = req.body

        try {
            const result = await RecoverPasswordService.execute(email)

            return res.status(200).json({
                status: true,
                data: result,
                message: '',
            })
        } catch (error: any) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message,
            })
        }
    }
}

module.exports = new AuthController()