import { Request, Response } from 'express'
import * as Yup from 'yup'

import { ChirpService } from '../services/ChirpService'

import { convertErrorCode } from '../../utils/functions'

class ChirpController {
    private chirpService: ChirpService

    constructor() {
        this.chirpService = new ChirpService()
    }

    async index(req: Request, res: Response) {
        const { id } = req.params

        let result = null

        try {
            id ?
                result = await this.chirpService.readOne({ id: Number(id) }) :
                result = await this.chirpService.read()
            
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
                content: Yup.string().required()
            })
    
            await schema.validate(req.body, { abortEarly: false })
            
            const { content } = req.body

            const { id: userId } = req.user

            const newUser = await this.chirpService.create({ 
                userId, 
                content,
                image: 'aqui-e-uma-imagem.jpeg'
            })
    
            return res.status(201).json({
                status: true,
                data: newUser,
                message: 'Chirp publicado sucesso'
            })

        } catch (error: any) {
            const err = {
                code: error instanceof Yup.ValidationError ? 400 : convertErrorCode(error.code),
                message: error instanceof Yup.ValidationError ? error.errors : error.message
            }

            return res.status(err.code).json({
                status: false,
                data: null,
                message: err.message
            })
        }
    }

    /*async update(req, res){
        const id = req.params.id
        
        try {
            const result = await UserService.update(req.body, { id })

            return res.status(200).json({
                status: true,
                data: result,
                message: 'Usuário atualizado com sucesso'
            })

        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message
            })
        }
    }*/

    async remove(req: Request, res: Response){
        const id = req.params.id

        try {
            const result = await this.chirpService.delete({ id: Number(id) })
            
            return res.status(200).json({
                status: true,
                data: result,
                message: 'Chirp removido'
            })

        } catch (error: any) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message
            })
        } 
    }
}

export { ChirpController }