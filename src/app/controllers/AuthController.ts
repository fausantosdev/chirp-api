import * as Yup from 'yup'
import { Request, Response } from 'express'

import AuthService from '../services/AuthService'

class AuthController {
    async login(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email().required()
            })
    
            await schema.validate(req.body, { abortEarly: false })

            const result = await AuthService.login({ email: req.body.email })
    
            return res.status(201).json({
                status: true,
                data: result,
                message: 'Um token foi enviado para seu e-mail, use-o para se autenticar'
            })

        } catch (error: any) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error instanceof Yup.ValidationError ? error.errors : error.message
            })
        }
    }

    /*async tokenRefresh (req: Request, res: Response) {
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
    }*/

    /*logout(req: Request, res: Response) {
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
    }*/

    /*async recoverPassword (req: Request, res: Response) {
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
    }*/
}

export default new AuthController()