import { Request, Response } from 'express'
import * as Yup from 'yup'
import { UserService } from '../services/UserService'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    async index(req: Request, res: Response) {
        const { id } = req.params

        let result = null

        try {
            id ?
                result = await this.userService.readOne({ id: Number(id) }) :
                result = await this.userService.read()
            
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

    async store(req: Request, res: Response){
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email().required()
            })
    
            await schema.validate(req.body, { abortEarly: false })

            const newUser = await this.userService.create(req.body)
    
            return res.status(201).json({
                status: true,
                data: newUser,
                message: 'Usuário criado com sucesso'
            })

        } catch (error: any) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error instanceof Yup.ValidationError ? error.errors : error.message
            })
        }
    }

    async update(req: Request, res: Response){
        const id = Number(req.params.id)
        
        try {
            const result = await this.userService.update(req.body, id)

            return res.status(200).json({
                status: true,
                data: result,
                message: 'Usuário atualizado com sucesso'
            })

        } catch (error: any) {
            const errCode = error.code && typeof error.code === 'number' ? error.code : 500

            return res.status(errCode).json({
                status: false,
                data: null,
                message: error.message
            })
        }
    }

    async remove(req: Request, res: Response){
        const id = Number(req.params.id)

        try {
            const result = await this.userService.delete({ id })
            
            return res.status(200).json({
                status: true,
                data: result,
                message: ''
            })

        } catch (error: any) {
            const errCode = error.code && typeof error.code === 'number' ? error.code : 500

            return res.status(errCode).json({
                status: false,
                data: null,
                message: error.message
            })
        } 
    }
}

export { UserController }